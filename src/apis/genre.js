import axios from './_axios/axios';
import pick from 'utils/pick';
import * as genreEP from './_endpoints/genre';

export const getAllGenres = async (props, AxiosOptions) => {
  const data = pick(props, ['search']);
  const result = await axios
    .request({
      ...AxiosOptions,
      method: 'get',
      url: genreEP.GENRES,
      params: data
    })
    .then((res) => res.data);
  return result;
};

export const getGenre = async (id, AxiosOptions) => {
  const result = await axios
    .request({
      ...AxiosOptions,
      method: 'get',
      url: `${genreEP.GENRES}/${id}`
    })
    .then((res) => res.data);
  return result;
};

export const deleteGenre = async (id, AxiosOptions) => {
  const result = await axios
    .request({
      ...AxiosOptions,
      method: 'delete',
      url: `${genreEP.GENRES}/${id}`
    })
    .then((res) => res.data);
  return result;
};

export const createGenre = async (props, AxiosOptions) => {
  const data = pick(props, ['key', 'name', 'description']);
  const result = await axios
    .request({
      ...AxiosOptions,
      method: 'post',
      url: genreEP.GENRES,
      data
    })
    .then((res) => res.data);
  return result;
};

export const updateGenre = async (props, AxiosOptions) => {
  const id = props.id;
  const data = pick(props, ['key', 'name', 'description']);
  const result = await axios
    .request({
      ...AxiosOptions,
      method: 'patch',
      url: `${genreEP.GENRES}/${id}`,
      data
    })
    .then((res) => res.data);
  return result;
};
