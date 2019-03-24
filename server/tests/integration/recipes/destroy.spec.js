import supertest from 'supertest';
import faker from 'faker';

import app from '../../../index';
import { Recipe } from '../../../database/models';
import { generateUser, generateRecipe } from '../../utils/generate';


describe('The delete recipe endpoint', () =>{

  test('delete recipe from database and returns message', async () => {

    //ARRANGE
  
    //create a fake user and create a recipe for this user
    const { user, token } = await generateUser();
    const fakeRecipe = await generateRecipe();

    const recipe = await Recipe.create({
      ...fakeRecipe,
      userId: user.id
    });
  
    //ACTION
  
    //make a delete request to delete this recipe
    const response = await supertest(app).delete(`/api/v1/recipes/${recipe.id}`).send({
      access_token: token
    });
  
    

    //ASSERTION
  
    //make sure response from server is recipe deleted
    expect(response.status).toBe(200);
    expect(response.body.data.message).toBe('Recipe deleted.');
  
    //mkae sure the recipe is no longer in the database
    const recipeFromDatabase = await Recipe.findAll({ where: { id: recipe.id } });

    expect(recipeFromDatabase.length).toBe(0);


  });

});