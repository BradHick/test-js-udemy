import supertest from 'supertest';
import bcrypt from 'bcrypt';
import { User } from '../../../database/models';

import app from '../../../index';

describe('The user login', () =>{

  beforeEach(async () => {
    await User.destroy({ where: {} });
  })

  test('The user can login and get jwt', async () => {
    
    //Arrange
    //setup fake user data
    const fakeUser = {
      name: 'bahdcoder',
      email: 'bahdcoder@gmail.com',
      password: 'password'
    };
    
    //create a new user
    await User.create({
      name: fakeUser.name,
      email: fakeUser.email,
      password: bcrypt.hashSync(fakeUser.password, 1)
    }); //come back here

    //Action
    //make POST REQUEST to login
    const response  = await supertest(app).post('/api/v1/users/signin').send({
      email: fakeUser.email,
      password: fakeUser.password
    });


    //Assertion
    expect(response.status).toBe(200)
    //assert the response contains jwt and user data
    expect(response.body.data.access_token).toBeTruthy();

    expect(response.body.data.user.email).toBe(fakeUser.email);

  })

});