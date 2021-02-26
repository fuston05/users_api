// ///////////// auth router ///////////////
// ////////////////////////////////////////
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mailer = require("../../nodeMailer");
// middleware
// express-validator
const { validationResult } = require("express-validator");
// express validator rules
const { registerValidation, loginValidation, passwordHash , isVerified} = require("../../middleware");

const users = require("../../models/users-model");

// verify email for new registered user
router.get("/confirmEmail", isVerified, (req, res, next) => {
  // check if account has already been verified
  if (req.body.isVerified) {
    return res.status(401).json({Error: "You have already verified your email, please log in."})
  }
  // if NOT already verified
  // grab user's emailToken and email from query string
  const { emailToken, u } = req.query;
  
  users
    .findByEmail(u)
    .then(async (resp) => {
      // check if tokens match
      if (emailToken === resp.emailToken) {
        // update 'isVerified' to true in the DB
        // set emailToken to null in DB
        await users.updateUser({ id: resp.id, isVerified: true, emailToken: null });
        
        return res.status(201).send("<p>Email verification was Successful! Please log in.</p>");
      } else {
        // tokens did not match, send error
        return res.status(400).json({
          Error: "Could not verify your email, your link may have expired",
        });
      }
    })
    .catch((err) => {
      next(err);
    });
});

// register a new user
// registerValidation checks to see if username or email already taken
// return 'id' on success, error message if validation fails
router.post("/register", registerValidation, passwordHash, (req, res) => {
  // check validation errors from the registerValidation middleware
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  // add emailToken to req.body
  req.body.emailToken = bcrypt.hashSync(
    `${Math.random() * Date.now()}`,
    parseInt(process.env.HASHING_ROUNDS)
  );
  users
    .register(req.body)
    .then(async (userRes) => {
      userRes[0].message = `Welcome, ${userRes[0].userName}`;
      const host = `${req.protocol}://${req.headers.host}`;

      // send verification email.
      mailer(req.body.email, req.body.emailToken, host).catch((err) => {
        return res
          .status(400)
          .json({ error: "There was a problem sending the email" });
      });

      res.status(201).json(userRes[0]);
    })
    .catch((err) => {
      console.log("err: ", err);
      res.status(500).json({ Error: "Server error" });
    });
});

// login
router.post("/login", loginValidation, isVerified, (req, res, next) => {
  // check if account NOT verified
  if (!req.body.isVerified) {
    return res.status(401).json({Error: "Please verify your email to gain log-in access. Check your email for the verification link."})
  }
  
  users
  .login(req.body)
  .then((loginRes) => {
    if (loginRes !== null) {
      // database results info
      const hashedPass = loginRes.password;
      const id = loginRes.id;
      const userName = loginRes.userName;
      const userPrivilege = loginRes.privilege_id;
      
      // user passed password
      const password = req.body.password;
      
        // check password hash and username
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
