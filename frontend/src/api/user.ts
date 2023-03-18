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

export {
  registerUser,
  loginUser,
  getUserProjects,
  createUserResume,
  getUserResume,
};
