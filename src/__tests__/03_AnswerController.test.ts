import { describe, expect, test } from '@jest/globals';
import  request  from 'supertest';
require('dotenv').config();

const authHeader = `Bearer ${process.env.AUTH_TOKEN}`;
const ApiUrl = process.env.API_URL;

describe('POST /answer', () => {
  it('should return 200 and answer data', async () => {
    jest.setTimeout(30000);

    const today = new Date();

    const res = await request(ApiUrl)
    .post('/answer')
    .send({
      answer: true,
      dateOfAnswer: today,
      userId: "63d5564e91ccd6a7cc254ff1",
      questionId: "63e814997280701defa278db",
    })
    .set('Authorization', authHeader)
    .then(response => {
      expect(response.body).toHaveProperty('description')
      expect(response.body.schema.answer).toEqual(true);
      expect(response.statusCode).toEqual(200)
    });
  });

  it("should return 400 because dateOfAnswer is required", async () => {
    jest.setTimeout(30000);
    const res = await request(ApiUrl)
    .post('/answer')
    .send({
      answer: true,
      userId: "63d5564e91ccd6a7cc254ff1",
      questionId: "63e814997280701defa278db",
    })
    .set('Authorization', authHeader)
    .then(response => {
      expect(response.body).toHaveProperty('description')
      expect(response.statusCode).toEqual(400)
    });
  }); 
});

describe('GET /answer/findByUserId/:userId', () => {
  it('should return 200 and answer list data', async () => {
    jest.setTimeout(30000);
    const res = await request(ApiUrl)
    .get('/answer/findByUserId/63d5564e91ccd6a7cc254ff1')
    .set('Authorization', authHeader)
    .then(response => {
      expect(response.body).toHaveProperty('description')
      expect(response.statusCode).toEqual(200)
    });
  })

  it('should return 400 because ID is incorrect format', async () => {
    jest.setTimeout(30000);
    const res = await request(ApiUrl)
    .get('/answer/findByUserId/63d5564e91ccd6a7cc254ff')
    .set('Authorization', authHeader)
    .then(response => {
      expect(response.body).toHaveProperty('description')
      expect(response.statusCode).toEqual(400)
    });
  })

  it("should return 404 because ID isn't exists", async () => {
    jest.setTimeout(30000);
    const res = await request(ApiUrl)
    .get('/answer/findByUserId/63d5564e91ccd6a7cc254aa6')
    .set('Authorization', authHeader)
    .then(response => {
      expect(response.body).toHaveProperty('description')
      expect(response.statusCode).toEqual(404)
    });
  })
});