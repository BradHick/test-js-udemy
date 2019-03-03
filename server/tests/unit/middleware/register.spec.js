import middleware from '../../../middleware';

const { registerUserValidator } = middleware;

test('The registerUserValidator call the next function if the validation is sucessful', async () => {

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