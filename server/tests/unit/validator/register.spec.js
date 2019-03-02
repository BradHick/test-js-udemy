import validators from '../../../validators';

const { RegisterUserValidator } = validators;

describe('The RegisterUserValidator class', () => {

  describe('The validateName function', () =>{

    test('The validateName function adds a require error to the errors array if name is not provided', () => {

      const validator = new RegisterUserValidator({
        email: 'bahdcoder@gmail.com'
      });

      validator.validateName();

      const errors = validator.errors;

      expect(errors).toEqual([
        'The name is required.'
      ]);

    });

    test('Adds an error if name is less than 5 characters', () => {
      
      const validator = new RegisterUserValidator({
        name: 'bahd'
      });

      validator.validateName();

      const { errors } = validator;
      
      expect(errors).toEqual([
        'The name must be longer than 5 characters.'
      ]);

    });

  });
});