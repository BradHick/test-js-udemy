import middleware from '../../../middleware';
import { User } from '../../../database/models';

const { registerUserValidator } = middleware;

test('The registerUserValidator calls the next function if the validation is sucessful', async () => {

  await User.destroy({ where: {} });
  const req = {
    body: {
      name: 'bahdcoder',
      email: 'bahdcoder@gmail.com',
      password: 'password'
    }
  };

  const res = {
    sendFailureResponse() {}
  };

  // const next = () => {};
  const next = jest.fn();


  await registerUserValidator(req, res, next);

  expect(next).toHaveBeenCalled();


});

test('The registerUserValidator calls the sendFailureResponse function if validation fails', async () =>{

  const req = {
    body: {
      name: 'bahd',
      password: 'bahd'
    }
  };


  const res = {
    sendFailureResponse: jest.fn()
  };

  const next = jest.fn();

  await registerUserValidator(req, res, next);

  expect(res.sendFailureResponse).toHaveBeenCalledWith({
    errors: [
      'The name must be longer than 5 characters.',
      'The password must be longer than 5 characters.',
      'The email is required.'
    ]
  }, 422)

  expect(next).toHaveBeenCalledTimes(0);

});