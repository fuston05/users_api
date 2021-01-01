const request = require("supertest");
const server = require("../api/server");
const db = require("../data/db-config");

// reset DB seed data
beforeEach(async () => {
  await db.seed.run();
});

// close DB connection after all tests
afterAll(async () => {
  await db.destroy();
});

describe("POST /auth/register", () => {
  it("returns proper response", async () => {
    const userData = {
      firstName: "Harmoni",
      lastName: "Fuston",
      userName: "Harmoni",
      password: "1234",
      cPassword: "1234",
      email: "harmoni@mail.com",
      current_salary: 102000,
      hire_date: "2012-04-10",
      department_id: 1,
      job_title_id: 7,
      privilege_id: 2,
    };
    const response = await request(server)
      .post("/auth/register")
      .send(userData);

    expect(response.status).toBe(201);
    expect(response.type).toBe("application/json");
    expect(response.body).toBe(1);
  });
});
