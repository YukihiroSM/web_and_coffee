import register from './register.route';
import login from './login.route';
import createProject from './project-create.route';
import allProjects from './project-all.route';
import landing from './landing.route';

const routes = [register, login, createProject, allProjects, landing];

export default routes;
