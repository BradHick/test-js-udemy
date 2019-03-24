import faker from 'faker';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { User } from '../../database/models';
import config from '../../config';

export const generateUser = async () => {
  const fakeUser = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  };

  //generate jwt for the user
  const user = await User.create({
    name: fakeUser.name,
    email: fakeUser.email,
    password: bcrypt.hashSync(fakeUser.password, 1)
  });

  const token = jwt.sign({ email: user.email }, config.JWT_SECRET);

  return { user, token, fakeUser };
};

export const generateRecipe = async () => ({
  title: faker.lorem.sentence(),
  description: faker.lorem.sentence(2),
  timeToCook: 40,
  imageUrl: faker.internet.url(),
  ingredients: JSON.stringify([faker.lorem.sentence(), faker.lorem.sentence(), faker.lorem.sentence()]),
  procedure: JSON.stringify([faker.lorem.sentence(), faker.lorem.sentence(), faker.lorem.sentence()])
});