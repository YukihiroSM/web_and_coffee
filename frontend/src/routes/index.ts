import register from './register.route';
import login from './login.route';
import createProject from './project-create.route';
import allProjects from './project-all.route';
import viewProject from './project-view.route';

const routes = [register, login, createProject, allProjects, viewProject];

export default routes;
