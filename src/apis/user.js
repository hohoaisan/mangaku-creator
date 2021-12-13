import axios from './_axios/axios';
import pick from 'utils/pick';
import * as userEP from './_endpoints/user';

export const getAllUsers = async (props, AxiosOptions) => {
  const data = pick(props, ['search', 'scope', 'page', 'limit', 'sortBy']);
  const result = await axios
    .request({
      ...AxiosOptions,
      method: 'get',
      url: userEP.USERS,
      params: data
    })
    .then((res) => res.data);
  return result;
};

export const getUser = async (id, AxiosOptions) => {
  const result = await axios
    .request({
      ...AxiosOptions,
      method: 'get',
      url: `${userEP.USERS}/${id}`
    })
    .then((res) => res.data);
  return result;
};

export const deleteUser = async (id, AxiosOptions) => {
  const result = await axios
    .request({
      ...AxiosOptions,
      method: 'delete',
      url: `${userEP.USERS}/${id}`
    })
    .then((res) => res.data);
  return result;
};

export const createUser = async (props, AxiosOptions) => {
  const data = pick(props, ['name', 'email', 'role', 'password']);
  const result = await axios
    .request({
      ...AxiosOptions,
      method: 'post',
      url: userEP.USERS,
      data
    })
    .then((res) => res.data);
  return result;
};

export const updateUser = async (props, AxiosOptions) => {
  const id = props.id;
  const data = pick(props, ['name', 'email', 'emailVerified', 'banned']);
  console.log({ data, props });
  const result = await axios
    .request({
      ...AxiosOptions,
      method: 'patch',
      url: `${userEP.USERS}/${id}`,
      data
    })
    .then((res) => res.data);
  return result;
};

export const restoreUser = async (id, AxiosOptions) => {
  const result = await axios
    .request({
      ...AxiosOptions,
      method: 'patch',
      url: `${userEP.USERS}/${id}`,
      data: {
        restore: true
      }
    })
    .then((res) => res.data);
  return result;
};
