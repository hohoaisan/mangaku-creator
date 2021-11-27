/* eslint-disable import/prefer-default-export */
import axios from './_axios';
import pick from 'utils/pick';
import * as ProfileAPI from './_endpoints/profile';

export const getProfile = (props) => {
  const data = pick(props, ['accessToken']);
  return axios({
    method: 'get',
    url: ProfileAPI.PROFILE,
    data
  }).then((res) => res.data);
};
