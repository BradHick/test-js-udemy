import supertest from 'supertest';
import { User } from '../../../../database/models';

import app from '../../../../index';


describe('The user signup test', () => {


  test('Should register a new user', async () => {

    await User.destroy({ where: {} });
    //Arrange
    //get some fake user data
    const fakeUser = {
      name: 'bahdcoder',
      email: 'bahdcoder3@gmail.com',
      password: 'password'
    }


    //Action
    //make post request to sign up
    const response = await supertest(app).post('/api/v1/users/signup').send(fakeUser);


    //Assertion
    //1. The response has the user data

    console.log('------------------------------------');
    console.log('response.body ->', response.body);
    console.log('response.status ->', response.status);
    console.log('------------------------------------');

    expect(response.status).toBe(200);
    expect(response.body.data.user.email).toBe(fakeUser.email);

    //2. The database has a user with the credentials we signed up with

    const userFromDatabase = await User.find({ where: { email: fakeUser.email } });
    console.log('------------------------------------');
    console.log('userFromDatabase ->', userFromDatabase);
    console.log('------------------------------------');
    expect(userFromDatabase).toBeTruthy();



  });

});