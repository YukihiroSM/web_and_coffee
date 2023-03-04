const BACKEND_KEYS = {
  REGISTER_USER: 'user/register',
  LOGIN_USER: 'user/login',
  USER_PROJECTS: 'user/projects',
  PROJECT_CREATE: 'project',
  PROJECT_ALL: 'project/get_projects',
};

const ROUTER_KEYS = {
  USER_LOGIN: '/user/login',
  USER_REGISTER: '/user/register',
  USER_RESUMEE: '/user/resumee',
  USER_PROJECTS: '/user/projects',
  PROJECT_CREATE: '/project/create',
  PROJECT_ALL: '/projects',
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

const REQUIREMENTS_OPTIONS = [
  { value: 'react', label: 'React' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'redux', label: 'Redux' },
  { value: 'formik', label: 'Formik' },
  { value: 'yup', label: 'Yup' },
  { value: 'ml', label: 'ML' },
  { value: 'ai', label: 'AI' },
  { value: 'qa', label: 'QA' },
  { value: 'java', label: 'Java' },
  { value: 'javascript', label: 'Java Script' },
  { value: 'c_plus_plus', label: 'c++' },
  { value: 'python', label: 'Python' },
  { value: 'c', label: 'C' },
  { value: 'web-dev', label: 'Web Development' },
  { value: 'flask', label: 'Flask' },
  { value: 'fast-api', label: 'FastAPI' },
  { value: 'go', label: 'Golang' },
  { value: 'deep-learning', label: 'Deep Learning' },
  { value: 'cv', label: 'Computer Vision' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'algorithms', label: 'Algorithms' },
  { value: 'design', label: 'Design' },
];

export { BACKEND_KEYS, ROUTER_KEYS, TEAM, NAV_LINKS, REQUIREMENTS_OPTIONS };
