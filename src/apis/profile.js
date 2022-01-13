/* eslint-disable import/prefer-default-export */
import pick from 'utils/pick';
import axios from './_axios/axios';
import * as ProfileAPI from './_endpoints/profile';

export const getProfile = async () => {
  const result = await axios({
    method: 'get',
    url: ProfileAPI.PROFILE
  }).then((res) => res.data);
  return result;
};

export const getAuthorProfile = async () => {
  const result = await axios({
    method: 'get',
    url: ProfileAPI.PROFILE_AUTHOR
  }).then((res) => res.data);
  return result;
};

export const becomeAuthorRegister = async (props) => {
  const data = pick(props, ['name', 'description']);
  const result = await axios({
    method: 'post',
    url: ProfileAPI.PROFILE_AUTHOR,
    data
  }).then((res) => res.data);
  return result;
};
