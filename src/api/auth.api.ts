import axios from 'axios';

import { BASE_URL } from '../constants/app.constants';
import { RegisterDataI } from '../interfaces/register-data-interface';
import { LoginDataI, LoginResponseI } from '../interfaces/login-data-interface';

const AuthApi = {
  async signUp(registerData: RegisterDataI): Promise<void> {
    await axios.post(`${BASE_URL}auth/signup`, registerData);
  },
  async signIn(loginData: LoginDataI): Promise<LoginResponseI> {
    const response = await axios.post(`${BASE_URL}auth/signin`, loginData);
    return response.data;
  },
};

export default AuthApi;
