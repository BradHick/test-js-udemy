import validators from '../../../validators';
import { User } from '../../../database/models';

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

  describe('The validatePassword function', () =>{

    test('adds a require error to the errors array if password was not provided', ()=> {
      
      //ARRANGE
      const validator = new RegisterUserValidator({
        email: 'bahdcoder@gmail.com'
      });

      //ACTION
      validator.validatePassword();

      //ASSERTION
      const { errors } = validator;

      expect(errors).toEqual([
        'The password is required.'
      ]);

    });

    test('adds an error if password is less than 6 characters', () =>{

      //ARRANGE
      const validator = new RegisterUserValidator({
        password: 'bahd'
      });

      //ACTION
      validator.validatePassword();

      //ASSERTION
      const { errors } = validator;

      expect(errors).toEqual([
        'The password must be longer than 5 characters.'
      ]);

    })
  });

  describe('The validateEmail function', ()=>{

    test('adds a required error if email is not provided', async ()=>{

      const validator = new RegisterUserValidator({
        name: 'bahdcoder'
      });

      await validator.validateEmail();

      const { errors } = validator;

      expect(errors).toEqual([
        'The email is required.'
      ]);

    });

    test('adds an error if email is not valid', async () => {

      const validator = new RegisterUserValidator({
        email: 'bahdcoder@mas'
      });

      await validator.validateEmail();

      const { errors } = validator;

      expect(errors).toEqual([
        'The email must be a valid email address.'
      ]);


    });

    test('adds an email token error if user already exists with that email', async ()=> {
      
      //Delete all users from DB
      await User.destroy({ where: {} });

      //Create a new user with this email
      await User.create({
        name: 'bahdcoder',
        email: 'bahdcoder@gmail.com',
        password: 'password'
      });

      //Initialize validator
      const validator = new RegisterUserValidator({
        email: 'bahdcoder@gmail.com'
      });

      //execut evalidator
      await validator.validateEmail();

      const { errors } = validator;

      expect(errors).toEqual([
        'A user with this email already exists.'
      ]);
    });


  });

  describe('The isValid function', () => {

    test('Returns true if validation passes', async () => {

      //Delete all users from DB
      await User.destroy({ where: {} });

      //Arrange
      const validator = new RegisterUserValidator({
        name: 'bahdcoder',
        email: 'bahdcoder@gmail.com',
        password: 'password'
      });

      //Action
      const result = await validator.isValid();


      //Assert
      expect(result).toBe(true);


    });

    test('Returns false for invalid data', async () => {
      
      //Delete all users from DB
      await User.destroy({ where: {} });

      //Arrange
      const validator = new RegisterUserValidator({
        name: 'bahd',
        email: '',
        password: 'ab'
      });

      //Action
      const result = await validator.isValid();

      //Assertion
      expect(result).toBe(false);


    });

    test('The validateName, validateEmail, validatePassword functions are called in the isValid function', async () => {

      const validator = new RegisterUserValidator({
        name: 'bahd',
        password: 'pass',
        email: 'bahdcoder@gmail.com'
      });

      //spying functions to make sure that they will be called
      jest.spyOn(validator, 'validateName');
      jest.spyOn(validator, 'validateEmail');
      jest.spyOn(validator, 'validatePassword');
      
      await validator.isValid();

      expect(validator.validateName).toHaveBeenCalled();
      expect(validator.validateEmail).toHaveBeenCalled();
      expect(validator.validatePassword).toHaveBeenCalled();

    });

  });





});