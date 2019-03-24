import supertest from 'supertest';
import faker from 'faker';

import app from '../../../index';
import { Recipe } from '../../../database/models';
import { generateUser, generateRecipe } from '../../utils/generate';

describe('The create recipe process', () =>{
  
  test('should create recipe and return recipe details', async () => {

    //ARRANGE
    
    //create fake recipe
    const fakeRecipe = await generateRecipe();

    //create fake user
    const { token } = await generateUser();


    //ACTION

    //make an athenticated requet to cretae a recipe
    const response = await supertest(app).post('/api/v1/recipes').send({
      ...fakeRecipe,
      access_token: token
    });


    //ASSERTION

    //make sure recipe is returned
    const { recipe } = response.body.data;
    expect(response.status).toBe(201);

    expect(recipe.title).toBe(fakeRecipe.title);
    expect(recipe.description).toBe(fakeRecipe.description);

    //make sure recipe in in database
    const recipeFromDatabase = await Recipe.findById(recipe.id);

    //make sure the recipe creator is fakeUser
    expect(recipeFromDatabase).toBeTruthy();

  });

});