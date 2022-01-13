/* eslint-disable import/prefer-default-export */
import axios from './_axios/axios';
import pick from 'utils/pick';
import * as authorEP from './_endpoints/author';

export const getAllChapters = async (comicId, props, AxiosOptions) => {
  const data = pick(props, ['scope', 'page', 'limit', 'sortBy']);
  const result = await axios
    .request({
      ...AxiosOptions,
      method: 'get',
      url: authorEP.AUTHOR_COMIC_CHAPTERS.replace(':comicId', comicId),
      params: data
    })
    .then((res) => res.data);
  return result;
};

export const getChapter = async (comicId, chapterId, AxiosOptions) => {
  const result = await axios
    .request({
      ...AxiosOptions,
      method: 'get',
      url: authorEP.AUTHOR_COMIC_CHAPTER.replace(':comicId', comicId).replace(':chapterId', chapterId)
    })
    .then((res) => res.data);
  return result;
};

export const deleteComicChapter = async (comicId, chapterId, AxiosOptions) => {
  const result = await axios
    .request({
      ...AxiosOptions,
      method: 'delete',
      url: authorEP.AUTHOR_COMIC_CHAPTER.replace(':comicId', comicId).replace(':chapterId', chapterId)
    })
    .then((res) => res.data);
  return result;
};

export const createComicChapter = async (comicId, props, AxiosOptions) => {
  const data = pick(props, ['number', 'name', 'volume', 'pages']);
  const result = await axios
    .request({
      ...AxiosOptions,
      method: 'post',
      url: authorEP.AUTHOR_COMIC_CHAPTERS.replace(':comicId', comicId),
      data
    })
    .then((res) => res.data);
  return result;
};

export const updateComicChapter = async (comicId, chapterId, props, AxiosOptions) => {
  const data = pick(props, ['number', 'name', 'volume', 'pages']);
  const result = await axios
    .request({
      ...AxiosOptions,
      method: 'patch',
      url: authorEP.AUTHOR_COMIC_CHAPTER.replace(':comicId', comicId).replace(':chapterId', chapterId),
      data
    })
    .then((res) => res.data);
  return result;
};
