const BACKEND_KEYS = {
  REGISTER_USER: 'user/register',
  LOGIN_USER: 'user/login',
  USER_PROJECTS: 'user/projects',
  USER_RESUME_CREATE: 'user/create_resume',
  USER_RESUME_GET: 'user/get_resume',
  PROJECT_CREATE: 'project',
  PROJECT_VIEW: 'project/:id',
  PROJECT_DELETE: 'project/:id',
  PROJECT_ALL: 'project/get_projects',
};

const ROUTER_KEYS = {
  LANDING: '/',
  USER_LOGIN: '/user/login',
  USER_REGISTER: '/user/register',
  USER_RESUME: '/user/resume',
  USER_PROJECTS: '/user/projects',
  USER_PROFILE: '/user/:id',
  PROJECT_CREATE: '/project/create',
  PROJECT_VIEW: '/project/:id',
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
  { value: 'algorithms', label: 'Algorithms' },
  { value: 'design', label: 'Design' },
];

const POSITION_OPTIONS = [
  { value: 'web-dev', label: 'Web Dev' },
  { value: 'typescript-dev', label: 'TypeScript Developer' },
  { value: 'se', label: 'Softfare Engineer' },
  { value: 'ml-dev', label: 'ML Developer' },
  { value: 'ai-research', label: 'AI Researcher' },
  { value: 'qa-eng', label: 'QA Engineer' },
  { value: 'java-dev', label: 'Java Developer' },
  { value: 'javascript-dev', label: 'Java Script Developer' },
  { value: 'c_plus_plus-intern', label: 'C++ Intern' },
  { value: 'python-back', label: 'Python Backend' },
  { value: 'c-emb', label: 'C-Embedded Systems' },
  { value: 'go-dev', label: 'Golang Developer' },
  { value: 'deep-learning-middle', label: 'Deep Learning Middle Engineer' },
  { value: 'cv-researcher', label: 'Computer Vision Researcher' },
  { value: 'design', label: 'UI/UX Designer' },
];

const LANDING = [
  {
    title: 'Our Goal',
    href: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    description:
      'Our website is a wonderful opportunity for people to communicate, cooperate and engage.',
  },
  {
    title: 'What to do?',
    href: 'https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    description:
      'Register your account and add some personal details. Then immediately start exploring.',
  },
  {
    title: 'Is it free?',
    href: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80',
    description:
      'Our platform is free of charge. The only requirement is to be polite and do your best.',
  },
];

const EMPLOYEES = [
  {
    id: 1,
    name: 'John Smith',
    role: 'Lead Developer',
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: 2,
    name: 'Mary Johnson',
    role: 'Designer',
    image: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    id: 3,
    name: 'Bob Wilson',
    role: 'Frontend Developer',
    image: 'https://randomuser.me/api/portraits/men/3.jpg',
  },
];

export {
  BACKEND_KEYS,
  ROUTER_KEYS,
  TEAM,
  NAV_LINKS,
  REQUIREMENTS_OPTIONS,
  LANDING,
  POSITION_OPTIONS,
  EMPLOYEES,
};
