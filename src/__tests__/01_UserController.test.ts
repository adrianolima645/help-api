import { describe, expect, test } from '@jest/globals';
import  request  from 'supertest';
import app from '../app';

const authHeader = `Bearer ${process.env.AUTH_TOKEN}`;
const ApiUrl = process.env.API_URL;


describe('GET /', () => {
  it('should return 200 and one message', async () => {
    const res = await request(app).get('/')

    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('message')
  })
});

describe('GET /user/login/:email/:password', () => {
  it('should return 200 and user data', async () => {
    jest.setTimeout(30000);
    const res = await request(ApiUrl)
    .get('/user/login/adrianolima2801@email.com/Test.123')
    .then(response => {
      expect(response.body).toHaveProperty('message')
      expect(response.body.schema).toHaveProperty('id');
      expect(response.body.schema.email).toEqual("adrianolima2801@email.com");
      expect(response.statusCode).toEqual(200)
    });
  })

  it("should return 400 because password is incorrect", async () => {
    jest.setTimeout(30000);
    const res = await request(ApiUrl)
    .get('/user/login/adrianolima2801@email.com/Test.124')
    .then(response => {
      expect(response.body).toHaveProperty('message')
      expect(response.body.message).toEqual("Senha inválida!");
      expect(response.statusCode).toEqual(400)
    });
  }); 

  it("should return 404 because email isn't exists", async () => {
    jest.setTimeout(30000);
    const res = await request(ApiUrl)
    .get('/user/login/adrianolima154215@email.com/Test.124')
    .then(response => {
      expect(response.body).toHaveProperty('message')
      expect(response.body.message).toEqual("User not found");
      expect(response.statusCode).toEqual(404)
    });
  }); 
});

describe('GET /user/:id ', () => {
  it('should return 200 and user data', async () => {
    jest.setTimeout(30000);
    const res = await request(ApiUrl)
    .get('/user/63d5564e91ccd6a7cc254ff1')
    .set('Authorization', authHeader)
    .then(response => {
      expect(response.body).toHaveProperty('description')
      expect(response.body.schema.email).toEqual("adrianolima2801@email.com");
      expect(response.statusCode).toEqual(200)
    });
  })

  it('should return 400 because ID is incorrect format', async () => {
    jest.setTimeout(30000);
    const res = await request(ApiUrl)
    .get('/user/63d5564e91ccd6a7cc254ff')
    .set('Authorization', authHeader)
    .then(response => {
      expect(response.body).toHaveProperty('type')
      expect(response.body.type).toEqual("ValidationError");
      expect(response.statusCode).toEqual(400)
    });
  })

  it("should return 404 because ID isn't exists", async () => {
    jest.setTimeout(30000);
    const res = await request(ApiUrl)
    .get('/user/63d5564e91ccd6a7cc254ff4')
    .set('Authorization', authHeader)
    .then(response => {
      expect(response.body).toHaveProperty('message')
      expect(response.body.message).toEqual("User not found");
      expect(response.statusCode).toEqual(404)
    });
  })
});

describe('POST /user ', () => {
  const timestamp = new Date().getTime();
  const email = `adrianolima${timestamp}@email.com`;

  it(`should return 200 and check user with email ${email} exist`, async () => {
    jest.setTimeout(30000);

    const res = await request(ApiUrl)
    .post('/user')
    .send({
      city: "Socorro",
      dateOfBirth: "1984-07-12T00:00:00.000Z",
      email: email,
      firstName: "Adriano da Rocha",
      lastName: "Lima",
      phone: "11944688450",
      state: "SP",
      password: "Test.123",
      termsOfUse: true,
      userStatus: true,
      userType: "admin",
    })
    .then(response => {
      expect(response.body).toHaveProperty('description')
      expect(response.body.schema.email).toEqual(email);
      expect(response.statusCode).toEqual(200)
    });
  })

  it("should return 401 because user email already exists", async () => {
    const res = await request(ApiUrl)
    .post('/user')
    .send({
      city: "Socorro",
      dateOfBirth: "1984-07-12T00:00:00.000Z",
      email: email,
      firstName: "Adriano da Rocha",
      lastName: "Lima",
      phone: "11944688450",
      state: "SP",
      termsOfUse: true,
      userStatus: true,
      userType: "admin",
      password:"Test.123"
    })
    .then(response => {
      expect(response.body).toHaveProperty('message')
      expect(response.body.message).toEqual("User already exists!");
      expect(response.statusCode).toEqual(401)
    });
  }); 
});

describe("PUT /users/:id", () => {
  const timestamp = new Date().getTime();
  const firstName = `adrianolima${timestamp}`;
  it(`should return 200 and check user was update to ${firstName}`, async () => {
    return request(ApiUrl)
      .put("/user/63d5564e91ccd6a7cc254ff1")
      .set('Authorization', authHeader)
      .send({
        city: "Socorro",
        dateOfBirth: "1984-07-12T00:00:00.000Z",
        email: "adrianolima2801@email.com",
        firstName: firstName,
        lastName: "Lima",
        phone: "11944688450",
        state: "SP",
        termsOfUse: true,
        userStatus: true,
        userType: "admin",
        password:"Test.123"
      })
      .then(response => {
        expect(response.body).toHaveProperty('description')
        expect(response.body.schema.firstName).toEqual(firstName);
        expect(response.statusCode).toEqual(200)
      });
  });
});