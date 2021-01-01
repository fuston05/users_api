// test root route

const request = require('supertest');
const server = require('../api/server');

describe('GET /', () => {
  it('returns a 200 status', async () => {
    const response = await request(server).get('/')
    expect(response.status).toBe(200)
    expect(response.body).toBe('**** Welcome, the Server is live! ****')
  });
  it('returns proper message', async () => {
    const response = await request(server).get('/')
    expect(response.body).toBe('**** Welcome, the Server is live! ****')
  });

});

