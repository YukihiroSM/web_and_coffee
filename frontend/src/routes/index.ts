import register from './register.route';
import login from './login.route';
import createProject from './project-create.route';
import allProjects from './project-all.route';
import landing from './landing.route';
import userProjects from './user-projects.route';
import userResume from './user-resume.route';
import viewProject from './project-view.route';

const routes = [
  register,
  login,
  createProject,
  allProjects,
  landing,
  userProjects,
  userResume,
  viewProject,
];

export default routes;
