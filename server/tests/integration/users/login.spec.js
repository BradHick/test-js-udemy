import supertest from 'supertest';

import app from '../../../index';
import { generateUser } from '../../utils/generate';

describe('The user login', () =>{

  // beforeEach(async () => {
  //   await User.destroy({ where: {} });
  // });

  test('The user can login and get jwt', async () => {
    
    //Arrange
    const { user, token, fakeUser } = await generateUser();

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