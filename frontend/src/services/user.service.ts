import HttpService from './http.service';
import { BACKEND_KEYS } from '../constants';
import { User } from '../types';

class UserService extends HttpService {
  registerUser(user: User) {
    return this.post(
      {
        url: BACKEND_KEYS.REGISTER_USER,
        data: user,
      },
      false
    );
  }

  loginUser(user: User) {
    return this.post({ url: BACKEND_KEYS.LOGIN_USER, data: user }, false);
  }

  getUserProjects(params: URLSearchParams) {
    return this.get({ url: `${BACKEND_KEYS.USER_PROJECTS}?${params}` }, true);
  }

  createUserResume(resume: FormData) {
    return this.post(
      { url: BACKEND_KEYS.USER_RESUME_CREATE, data: resume },
      true
    );
  }

  getUserResume() {
    return this.get({ url: BACKEND_KEYS.USER_RESUME_GET }, true);
  }
}

export const userService = new UserService();
