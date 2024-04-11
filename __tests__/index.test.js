const request = require('supertest');
const app = require('../index');

describe('GET /', () => {
  it('routes to the index page', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toMatch(/The Awesome Pet Directory/);
  });
});