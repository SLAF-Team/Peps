import {ApiCore} from './core'

// Task API

const url = 'dish';
const plural = 'dishes';
const single = 'dish';

const urlRecipe = 'recipe';
const pluralRecipe = 'recipes';
const singleRecipe = 'recipe';

// plural and single may be used for message logic if needed in the ApiCore class.

export const apiDishes = new ApiCore({
  getAll: true,
  getSingle: true,
  post: true,
  put: false,
  patch: true,
  delete: false,
  url: url,
  plural: plural,
  single: single
});

export const apiRecipes = new ApiCore({
  getAll: true,
  getSingle: true,
  post: true,
  put: true,
  patch: true,
  delete: false,
  url: urlRecipe,
  plural: pluralRecipe,
  single: singleRecipe
});

apiDishes.example = () => {
  // Add custom api call logic here
};

apiRecipes.example = () => {
  // Add custom api call logic here
};