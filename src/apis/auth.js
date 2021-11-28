import axios from './_axios/axios';
import pick from 'utils/pick';
import * as AuthAPI from './_endpoints/auth';

export const refreshAccessToken = (props, AxiosOptions) => {
  const data = pick(props, ['refreshToken']);
  return axios({
    ...AxiosOptions,
    method: 'post',
    url: AuthAPI.TOKEN_REFRESH,
    data
  }).then((res) => res.data);
};

export const login = (props, AxiosOptions) => {
  const data = pick(props, ['email', 'password']);
  return axios({
    ...AxiosOptions,
    method: 'post',
    url: AuthAPI.LOGIN,
    data
  }).then((res) => res.data);
};

export const logout = (props, AxiosOptions) => {
  const data = pick(props, ['refreshToken']);
  return axios({
    ...AxiosOptions,
    method: 'post',
    url: AuthAPI.LOGOUT,
    data
  }).then((res) => res.data);
};
