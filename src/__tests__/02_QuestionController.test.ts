import { describe, expect, test } from '@jest/globals';
import  request  from 'supertest';
require('dotenv').config()

const authHeader = `Bearer ${process.env.AUTH_TOKEN}`;
const ApiUrl = process.env.API_URL;

describe('POST /question', () => {
  it('should return 200 and question data', async () => {
    jest.setTimeout(30000);
    const description = "Question test";

    const res = await request(ApiUrl)
    .post('/question')
    .set('Authorization', authHeader)
    .send({
      description: "Question test",
      questionStatus: true,
    })
    .then(response => {
      expect(response.body).toHaveProperty('description')
      expect(response.body.schema.description).toEqual(description);
      expect(response.statusCode).toEqual(200)
    });
  })

  it("should return 400 because description is required", async () => {
    jest.setTimeout(30000);
    const res = await request(ApiUrl)
    .post('/question')
    .send({
      questionStatus: true,
    })
    .set('Authorization', authHeader)
    .then(response => {
      expect(response.body).toHaveProperty('description')
      expect(response.statusCode).toEqual(400)
    });
  }); 
});

describe('GET /question/findByStatus', () => {
  it('should return 200 and question list data', async () => {
    jest.setTimeout(30000);
    const res = await request(ApiUrl)
    .get('/question/findByStatus')
    .set('Authorization', authHeader)
    .then(response => {
      expect(response.body).toHaveProperty('description')
      expect(response.statusCode).toEqual(200)
    });
  })
});

describe("PUT /question/:questionId", () => {
  const timestamp = new Date().getTime();
  const description = `description${timestamp}`;
  it(`should return 200 and check description was update to ${description}`, async () => {
    jest.setTimeout(30000);
    return request(ApiUrl)
      .put("/question/640376202d8a2d7161bb64db")
      .send({
        description: description,
        questionStatus: true,
      })
      .set('Authorization', authHeader)
      .then(response => {
        expect(response.body).toHaveProperty('description')
        expect(response.body.schema.description).toEqual(description);
        expect(response.statusCode).toEqual(200)
      });
  });

  it('should return 400 because ID is incorrect format', async () => {
    jest.setTimeout(30000);
    return request(ApiUrl)
      .put("/question/63e814997280701defa278d")
      .send({
        description: description,
        questionStatus: true,
      })
      .set('Authorization', authHeader)
      .then(response => {
        expect(response.body).toHaveProperty('description')
        expect(response.statusCode).toEqual(400)
      });
  })

  it("should return 404 because ID isn't exists", async () => {
    jest.setTimeout(30000);
    return request(ApiUrl)
      .put("/question/63e814997280701defa278df")
      .send({
        description: description,
        questionStatus: true,
      })
      .set('Authorization', authHeader)
      .then(response => {
        expect(response.body).toHaveProperty('description')
        expect(response.statusCode).toEqual(404)
      });
  })
});