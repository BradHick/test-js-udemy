import supertest from 'supertest';
import { User } from '../../../database/models';

import app from '../../../index';


describe('The user signup test', () => {

  beforeEach( async () => {
    await User.destroy({ where: {} });
  })

  test('Should register a new user', async () => {

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

  test('Should return validation error for duplicate email', async () =>{

    //Arrange
    //Prepare free data
    const fakeUser = {
      name: 'bahdcoder',
      email: 'bahdcoder@gmail.com',
      password: 'password'
    };

    //Put a user into the database. (register a user before hand)
    await supertest(app).post('/api/v1/users/signup').send(fakeUser);




    //Action
    //POST REQUEST to register user with duplicate email
    const response = await supertest(app).post('/api/v1/users/signup').send(fakeUser);



    //Assertion
    //1. making sure that the response from the server has a 422 status
    expect(response.status).toBe(422);

    //2. making sure that the error from our server matvh the scenario
    expect(response.body.status).toBe('fail');

    expect(response.body).toMatchSnapshot();




  });

});