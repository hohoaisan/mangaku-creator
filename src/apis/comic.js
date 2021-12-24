import axios from './_axios/axios';
import pick from 'utils/pick';
import * as comicEP from './_endpoints/comic';

export const getAllComics = async (props, AxiosOptions) => {
  const data = pick(props, ['search', 'scope', 'page', 'limit', 'sortBy']);
  const result = await axios
    .request({
      ...AxiosOptions,
      method: 'get',
      url: comicEP.COMICS,
      params: data
    })
    .then((res) => res.data);
  return result;
};

export const getComic = async (id, AxiosOptions) => {
  const result = await axios
    .request({
      ...AxiosOptions,
      method: 'get',
      url: `${comicEP.COMICS}/${id}`
    })
    .then((res) => res.data);
  return result;
};

export const deleteComic = async (id, AxiosOptions) => {
  const result = await axios
    .request({
      ...AxiosOptions,
      method: 'delete',
      url: `${comicEP.COMICS}/${id}`
    })
    .then((res) => res.data);
  return result;
};

export const createComic = async (props, AxiosOptions) => {
  const data = pick(props, ['title', 'description', 'comic_authors', 'comic_genres', 'comic_formats', 'comic_covers']);
  const result = await axios
    .request({
      ...AxiosOptions,
      method: 'post',
      url: comicEP.COMICS,
      data
    })
    .then((res) => res.data);
  return result;
};

export const updateComic = async (id, props, AxiosOptions) => {
  const data = pick(props, ['title', 'description', 'comic_authors', 'comic_genres', 'comic_formats', 'comic_covers']);
  const result = await axios
    .request({
      ...AxiosOptions,
      method: 'patch',
      url: `${comicEP.COMICS}/${id}`,
      data
    })
    .then((res) => res.data);
  return result;
};

export const restoreComic = async (id, AxiosOptions) => {
  const result = await axios
    .request({
      ...AxiosOptions,
      method: 'patch',
      url: `${comicEP.COMICS}/${id}`,
      data: {
        restore: true
      }
    })
    .then((res) => res.data);
  return result;
};
