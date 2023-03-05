import { userService } from '../services/user.service';
import { User } from '../types';

const registerUser = async (user: User) => {
  const { data } = await userService.registerUser(user);
  return data;
};

const loginUser = async (user: User) => {
  const { data } = await userService.loginUser(user);
  return data;
};

const getUserProjects = async (params: URLSearchParams) => {
  const { data } = await userService.getUserProjects(params);
  return data;
};

const createUserResume = async (resume: FormData) => {
  const { data } = await userService.createUserResume(resume);
  return data;
};

const getUserResume = async () => {
  const { data } = await userService.getUserResume();
  return data;
};

// const getUserIngredients = async (id: string) => {
//   const { data } = await userService.getUserIngredients(id);
//   return data;
// };

// const getUserPossibleMeals = async (id: string, params: URLSearchParams) => {
//   const { data } = await userService.getUserPossibleMeals(id, params);
//   return data;
// };

// const createUserIngredient = async (
//   id: string,
//   ingredient: CreateIngredient
// ) => {
//   const { data } = await userService.createUserIngredient(id, ingredient);
//   return data;
// };

// const deleteUserIngredient = async (userID: string, ingredientID: string) => {
//   const { data } = await userService.deleteUserIngredient(userID, ingredientID);
//   return data;
// };

export {
  registerUser,
  loginUser,
  getUserProjects,
  createUserResume,
  getUserResume,
};
