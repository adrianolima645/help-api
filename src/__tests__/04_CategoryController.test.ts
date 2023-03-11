import { describe, expect, test } from '@jest/globals';
import  request  from 'supertest';
require('dotenv').config();

const authHeader = `Bearer ${process.env.AUTH_TOKEN}`;
const ApiUrl = process.env.API_URL;

describe('POST /category', () => {
  it('should return 200 and category data', async () => {
    jest.setTimeout(30000);
    const res = await request(ApiUrl)
    .post('/category')
    .send({
      title: "Category test",
    })
    .set('Authorization', authHeader)
    .then(response => {
      expect(response.body).toHaveProperty('description')
      expect(response.body.schema.title).toEqual("Category test");
      expect(response.statusCode).toEqual(200)
    });
  });

  it("should return 400 because title is required", async () => {
    jest.setTimeout(30000);
    const res = await request(ApiUrl)
    .post('/category')
    .send({})
    .set('Authorization', authHeader)
    .then(response => {
      expect(response.body).toHaveProperty('description')
      expect(response.statusCode).toEqual(400)
    });
  }); 
});

describe('GET /category', () => {
  it('should return 200 and categories list data', async () => {
    jest.setTimeout(30000);
    const res = await request(ApiUrl)
    .get('/category')
    .set('Authorization', authHeader)
    .then(response => {
      expect(response.body).toHaveProperty('description')
      expect(response.statusCode).toEqual(200)
    });
  })
});