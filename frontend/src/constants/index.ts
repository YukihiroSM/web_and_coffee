const BACKEND_KEYS = {
  REGISTER_USER: 'user/register',
  LOGIN_USER: 'user/login',
};

const ROUTER_KEYS = {
  USER_LOGIN: '/user/login',
  USER_REGISTER: '/user/register',
  USER_PROJECT_CREATE: 'user/:id/project/create',
  PROJECTS: '/projects',
};

const NAV_LINKS = [
  {
    label: 'All Projects',
  },
  {
    label: 'Create Project',
  },
];

const TEAM = [
  {
    name: 'Andrii Smidonov',
    linkedIn: 'https://www.linkedin.com/in/andrii-smidonov',
    gitHub: 'https://github.com/yukihirosm',
  },
  {
    name: 'Ruslan Kotliarenko',
    linkedIn: 'https://www.linkedin.com/in/ruslan-kotliarenko',
    gitHub: 'https://github.com/ruslankotliar',
  },
  {
    name: 'Dmytro Omelian',
    linkedIn: 'https://www.linkedin.com/in/dichik',
    gitHub: 'https://github.com/Dichik',
  },
  {
    name: 'Sofiia Shaposhnikova',
    linkedIn: 'https://www.linkedin.com/in/sofiia-shaposhnikova-9854931b7',
    gitHub: 'https://github.com/Teasotea',
  },
];

export { BACKEND_KEYS, ROUTER_KEYS, TEAM, NAV_LINKS };
