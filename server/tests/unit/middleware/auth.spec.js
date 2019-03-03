import faker from 'faker';
import middleware from '../../../middleware';
import jwt from 'jsonwebtoken';
import { User } from '../../../database/models';
import config from '../../../config';

const { auth } = middleware;

describe('The auth middleware', () => {

  test('Should call next if user is authenticated', async () => {

    const user = await User.create({
      name: 'bahdcoder',
      email: faker.internet.email(),
      password: 'password'
    });

    const req = {
      body: {
        access_token: jwt.sign({ email: user.email }, config.JWT_SECRET)
      }
    };

    const res = {};

    const next = jest.fn();

    await auth(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(req.authUser).toBeDefined();
    expect(req.authUserObj).toBeDefined();

  });

  test('Should call sendFailureresponse if user is not authenticated', async () => {
    
    const req = {
      body: {},
      query: {},
      headers: {}
    };

    const res = {
      sendFailureResponse: jest.fn()
    };

    const next = jest.fn();

    await auth(req, res, next);

    expect(res.sendFailureResponse).toHaveBeenCalledWith({
      message: 'Unauthenticated.'
    }, 401);

    expect(next).toHaveBeenCalledTimes(0);


  });

  test('Should htrow an error if user is not found', async () => {

    const req = {
      body: {
        access_token: jwt.sign({ email: 'bahdcodernotfound@email.com' }, config.JWT_SECRET)
      }
    };

    const res = {
      sendFailureResponse: jest.fn()
    };

    const next = jest.fn();

    await auth(req, res, next);

    expect(res.sendFailureResponse).toBeCalledWith({
      message: 'Unauthenticated.'
    }, 401);




  });

});