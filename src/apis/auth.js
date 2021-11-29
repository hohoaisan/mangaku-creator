import axios from './_axios/axios';
import pick from 'utils/pick';
import * as AuthAPI from './_endpoints/auth';

export const refreshAccessToken = async (props, AxiosOptions) => {
  const data = pick(props, ['refreshToken']);
  const result = axios({
    ...AxiosOptions,
    method: 'post',
    url: AuthAPI.TOKEN_REFRESH,
    data
  }).then((res) => res.data);
  return result;
};

export const login = async (props, AxiosOptions) => {
  const data = pick(props, ['email', 'password']);
  const result = await axios({
    ...AxiosOptions,
    method: 'post',
    url: AuthAPI.LOGIN,
    data
  }).then((res) => res.data);
  return result;
};

export const logout = async (props, AxiosOptions) => {
  const data = pick(props, ['refreshToken']);
  const result = await axios({
    ...AxiosOptions,
    method: 'post',
    url: AuthAPI.LOGOUT,
    data
  }).then((res) => res.data);
  return result;
};
