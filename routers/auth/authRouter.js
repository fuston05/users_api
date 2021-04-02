// ///////////// auth router ///////////////
// ////////////////////////////////////////
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mailer = require("../../nodeMailer");

// ************** MIDDLEWARE ************** //
// express-validator
const { validationResult } = require("express-validator");
// express validator rules
const {
  registerValidation,
  loginValidation,
  passwordHash,
} = require("../../middleware");

const users = require("../../models/users-model");

// ************ EMAIL CONFIRMATION ************
// ********************************************
router.get("/confirmEmail", async (req, res, next) => {
  const { t, u } = req.query;
  users
    .findByUserName(u)
    .then(async (userRes) => {
      // check if account has already been verified
      if (userRes.isVerified === true) {
        return res
          .status(401)
          .json({
            Error: "You have already verified your email, please log in.",
          });
      }

      // check if tokens match
      if (t === userRes.emailToken) {
        // update 'isVerified' to true and -
        // set emailToken to null in DB
        await users.updateUser({
          id: userRes.id,
          isVerified: true,
          emailToken: null,
        });

        return res
          .status(201)
          .send(
            "<p>Email verification was Successful! <a href= '#'>Please log in</a>.</p>"
          );
      } else {
        // tokens did not match, send error
        return res.status(400).json({
          Error:
            "Could not verify your email, your link may have expired. Please visit our website and try again.",
        });
      }
    })
    .catch((err) => {
      next(err);
    });
});

// ***************** REGISTER *****************
// ********************************************
// registerValidation checks to see if username or email already taken
// return 'id, userName, and welcome message' on success, error message if validation fails
router.post("/register", registerValidation, passwordHash, (req, res) => {
  // check validation errors from the registerValidation middleware
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  // make sure pass and cPass match

  // add emailToken to req.body
  req.body.emailToken = bcrypt.hashSync(
    `${Math.random() * Date.now()}`,
    parseInt(process.env.HASHING_ROUNDS)
  );

  users
    .register(req.body)
    .then(async (userRes) => {
      // attach welcome message to the userRes
      userRes[0].message = `Welcome, ${userRes[0].userName}`;

      const host = `${req.protocol}://${req.headers.host}`;
      // send verification email.
      mailer(
        req.body.email,
        req.body.userName,
        req.body.emailToken,
        host
      ).catch((err) => {
        return res
          .status(400)
          .json({ error: "There was a problem sending the email" });
      });

      res.status(201).json(userRes[0]);
    })
    .catch((err) => {
      res.status(500).json({ Error: err });
    });
});

// ***************** LOG-IN *****************
// ******************************************
// Returns a token, and a welcome message containging the userName
router.post("/login", loginValidation, async (req, res, next) => {
  // check validation errors from the registerValidation middleware
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  // check if account NOT verified
  const user = await users.findByUserName(req.body.userName);

  if (user.isVerified === false) {
    return res.status(401).json({
      Error:
        "Please verify your email to gain log-in access. Check your email for the verification link.",
    });
  }

  // if account has been verified, continue with login
  users
    .login(req.body)
    .then((loginRes) => {
      if (loginRes !== null) {
        // database user results
        const hashedPass = loginRes.password;
        const id = loginRes.id;
        const userName = loginRes.userName;
        const userPrivilege = loginRes.privilege_id;

        // user input password
        const password = req.body.password;

        // check password hash and username against database
        if (
          bcrypt.compareSync(password, hashedPass) &&
          req.body.userName === userName
        ) {
          // json web token
          const payload = {
            sub: id,
            privilege: userPrivilege,
          };
          const sec = process.env.JWT_SECRET;
          const options = {
            expiresIn: "8h",
          };
          const token = jwt.sign(payload, sec, options);

          // return the welcome <userName> message and token
          res.status(200).json({
            message: `Welcome ${userName}`,
            token: token,
          });
        } else {
          //  if username and pass do not match
          res.status(401).json({ Error: "Invalid credentials" });
        }
      } else {
        // if no results were found
        res.status(404).json({ Error: "User does not exist" });
      }
    })
    .catch(next);
});

module.exports = router;
