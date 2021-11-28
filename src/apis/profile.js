/* eslint-disable import/prefer-default-export */
import axios from './_axios/axios';
import * as ProfileAPI from './_endpoints/profile';

export const getProfile = () =>
  axios({
    method: 'get',
    url: ProfileAPI.PROFILE
  }).then((res) => res.data);
