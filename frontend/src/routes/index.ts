import register from './register.route';
import login from './login.route';
import createProject from './project-create.route';
import allProjects from './project-all.route';
import landing from './landing.route';
import userProjects from './user-projects.route';
import userresume from './user-resume.route';

const routes = [
  register,
  login,
  createProject,
  allProjects,
  landing,
  userProjects,
  userresume,
];

export default routes;
