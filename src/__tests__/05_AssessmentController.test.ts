import { describe, expect, test } from '@jest/globals';
import  request  from 'supertest';
require('dotenv').config();

const authHeader = `Bearer ${process.env.AUTH_TOKEN}`;
const ApiUrl = process.env.API_URL;

describe('POST /assessment', () => {
  it('should return 200 and assessment data', async () => {

    const today = new Date();
    jest.setTimeout(30000);
    const res = await request(ApiUrl)
    .post('/assessment')
    .send({
      description: "Assessment test",
      author: "Adriano Lima Test",
      rating: "5",
      assessmentDate: today,
      userId: "63d5564e91ccd6a7cc254ff1",
      touristicPointId: "63c80946a6d4503882a6f992",
    })
    .set('Authorization', authHeader)
    .then(response => {
      expect(response.body).toHaveProperty('description')
      expect(response.body.schema.description).toEqual("Assessment test");
      expect(response.statusCode).toEqual(200)
    });
  });

  it("should return 400 because assessmentDate is required", async () => {
    jest.setTimeout(30000);
    const res = await request(ApiUrl)
    .post('/assessment')
    .send({
      description: "Assessment test",
      author: "Adriano Lima Test",
      rating: "5",
      userId: "63d5564e91ccd6a7cc254ff1",
      touristicPointId: "63c80946a6d4503882a6f992",
    })
    .set('Authorization', authHeader)
    .then(response => {
      expect(response.body).toHaveProperty('description')
      expect(response.statusCode).toEqual(400)
    });
  }); 
});

describe('GET /assessment/findByTouristicPoint/:touristicPointId', () => {
  it('should return 200 and assessment list data', async () => {
    jest.setTimeout(30000);
    const res = await request(ApiUrl)
    .get('/assessment/findByTouristicPoint/63c80946a6d4503882a6f992')
    .set('Authorization', authHeader)
    .then(response => {
      expect(response.body).toHaveProperty('description')
      expect(response.statusCode).toEqual(200)
    });
  })

  it('should return 400 because ID is incorrect format', async () => {
    jest.setTimeout(30000);
    const res = await request(ApiUrl)
    .get('/assessment/findByTouristicPoint/63c80946a6d4503882a6f99')
    .set('Authorization', authHeader)
    .then(response => {
      expect(response.body).toHaveProperty('description')
      expect(response.statusCode).toEqual(400)
    });
  })

  it("should return 404 because ID isn't exists", async () => {
    jest.setTimeout(30000);
    const res = await request(ApiUrl)
    .get('/assessment/findByTouristicPoint/63c80946a6d4503882a6f000')
    .set('Authorization', authHeader)
    .then(response => {
      expect(response.body).toHaveProperty('description')
      expect(response.statusCode).toEqual(404)
    });
  })
});