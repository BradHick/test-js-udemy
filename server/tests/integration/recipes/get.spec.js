import supertest from 'supertest';

import app from '../../../index';
import { Recipe } from '../../../database/models';
import { generateRecipe } from '../../utils/generate';


describe('The getRecipe endpoint', () => {

  test('can get a single recipe by id', async () => {

    //ARRANGE

    //create a recipe
    const fakeRecipe = await generateRecipe();

    const recipe = await Recipe.create(fakeRecipe);

    //ACTION

    //get the recipe
    const response = await supertest(app).get(`/api/v1/recipes/${recipe.id}`);


    //ASSERTIONS

    //expect the response status to be 200
    expect(response.status).toBe(200);

    //expect response contains recipe data
    expect(response.body.data.recipe.title).toBe(fakeRecipe.title);

  });

  test('returns a 404 if recipe is not found', async () => {
    
    //ARRANGE

    //create a fake id
    const FAKE_ID = 'fake_id';

    //ACTION

    //make a get request with this id
    const response = await supertest(app).get(`/api/v1/recipes/${FAKE_ID}`);

    //ASSERTIONS

    //make sure 404 was returned from server
    expect(response.status).toBe(404);

  });

});