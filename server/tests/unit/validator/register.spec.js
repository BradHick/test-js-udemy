import validators from '../../../validators';

const { RegisterUserValidator } = validators;

describe('The RegisterUserValidator calss', () => {

  describe('The validateName function', () =>{

    test('The validateName function adds a require error to the errors array if name is not provided', () => {

      const validator = new RegisterUserValidator({
        email: 'bahdcoder@gmail.com'
      });

      validator.validateName();

      const errors = validator.errors;

      console.log('====================================');
      console.log(errors);
      console.log('====================================');


    });
  });
});