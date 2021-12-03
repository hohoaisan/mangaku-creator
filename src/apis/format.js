import axios from './_axios/axios';
import pick from 'utils/pick';
import * as formatEP from './_endpoints/format';

export const getAllFormats = async (props, AxiosOptions) => {
  const data = pick(props, ['search']);
  const result = await axios
    .request({
      ...AxiosOptions,
      method: 'get',
      url: formatEP.FORMATS,
      params: data
    })
    .then((res) => res.data);
  return result;
};

export const getFormat = async (id, AxiosOptions) => {
  const result = await axios
    .request({
      ...AxiosOptions,
      method: 'get',
      url: `${formatEP.FORMATS}/${id}`
    })
    .then((res) => res.data);
  return result;
};

export const deleteFormat = async (id, AxiosOptions) => {
  const result = await axios
    .request({
      ...AxiosOptions,
      method: 'delete',
      url: `${formatEP.FORMATS}/${id}`
    })
    .then((res) => res.data);
  return result;
};

export const createFormat = async (props, AxiosOptions) => {
  const data = pick(props, ['key', 'name', 'description']);
  const result = await axios
    .request({
      ...AxiosOptions,
      method: 'post',
      url: formatEP.FORMATS,
      data
    })
    .then((res) => res.data);
  return result;
};

export const updateFormat = async (props, AxiosOptions) => {
  const id = props.id;
  const data = pick(props, ['key', 'name', 'description']);
  const result = await axios
    .request({
      ...AxiosOptions,
      method: 'patch',
      url: `${formatEP.FORMATS}/${id}`,
      data
    })
    .then((res) => res.data);
  return result;
};
