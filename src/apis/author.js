import axios from './_axios/axios';
import pick from 'utils/pick';
import * as authorEP from './_endpoints/author';

export const getAllAuthors = async (props, AxiosOptions) => {
  const data = pick(props, ['search', 'scope', 'page', 'limit', 'sortBy']);
  const result = await axios
    .request({
      ...AxiosOptions,
      method: 'get',
      url: authorEP.AUTHORS,
      params: data
    })
    .then((res) => res.data);
  return result;
};

export const getAuthor = async (id, AxiosOptions) => {
  const result = await axios
    .request({
      ...AxiosOptions,
      method: 'get',
      url: `${authorEP.AUTHORS}/${id}`
    })
    .then((res) => res.data);
  return result;
};

export const deleteAuthor = async (id, AxiosOptions) => {
  const result = await axios
    .request({
      ...AxiosOptions,
      method: 'delete',
      url: `${authorEP.AUTHORS}/${id}`
    })
    .then((res) => res.data);
  return result;
};

export const createAuthor = async (props, AxiosOptions) => {
  const data = pick(props, ['name', 'description']);
  const result = await axios
    .request({
      ...AxiosOptions,
      method: 'post',
      url: authorEP.AUTHORS,
      data
    })
    .then((res) => res.data);
  return result;
};

export const updateAuthor = async (props, AxiosOptions) => {
  const id = props.id;
  const data = pick(props, ['name', 'description', 'restricted', 'approval_status']);
  console.log({ data, props });
  const result = await axios
    .request({
      ...AxiosOptions,
      method: 'patch',
      url: `${authorEP.AUTHORS}/${id}`,
      data
    })
    .then((res) => res.data);
  return result;
};

export const restoreAuthor = async (id, AxiosOptions) => {
  const result = await axios
    .request({
      ...AxiosOptions,
      method: 'patch',
      url: `${authorEP.AUTHORS}/${id}`,
      data: {
        restore: true
      }
    })
    .then((res) => res.data);
  return result;
};
