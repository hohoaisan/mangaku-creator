/* eslint-disable import/prefer-default-export */
import axios from './_axios/axios';
import * as ProfileAPI from './_endpoints/profile';

export const getProfile = async () => {
  const result = await axios({
    method: 'get',
    url: ProfileAPI.PROFILE
  }).then((res) => res.data);
  return result;
};
