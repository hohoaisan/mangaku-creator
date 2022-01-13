import axios from './_axios/axios';
import pick from 'utils/pick';
import * as authorEP from './_endpoints/author';

// eslint-disable-next-line import/prefer-default-export
export const getAuthorComics = async (props, AxiosOptions) => {
  const data = pick(props, ['search', 'scope', 'page', 'limit', 'sortBy']);
  const result = await axios
    .request({
      ...AxiosOptions,
      method: 'get',
      url: authorEP.AUTHOR_COMICS,
      params: data
    })
    .then((res) => res.data);
  return result;
};

export const getAuthorComic = async (comicId, AxiosOptions) => {
  const result = await axios
    .request({
      ...AxiosOptions,
      method: 'get',
      url: authorEP.AUTHOR_COMIC.replace(':comicId', comicId)
    })
    .then((res) => res.data);
  return result;
};

export const deleteAuthorComic = async (id, AxiosOptions) => {
  const result = await axios
    .request({
      ...AxiosOptions,
      method: 'delete',
      url: authorEP.AUTHOR_COMIC.replace(':comicId', id)
    })
    .then((res) => res.data);
  return result;
};

export const createAuthorComic = async (props, AxiosOptions) => {
  const data = pick(props, ['title', 'description', 'comic_genres', 'comic_formats', 'comic_covers']);
  const result = await axios
    .request({
      ...AxiosOptions,
      method: 'post',
      url: authorEP.AUTHOR_COMICS,
      data
    })
    .then((res) => res.data);
  return result;
};

export const updateAuthorComic = async (id, props, AxiosOptions) => {
  const data = pick(props, ['title', 'description', 'comic_genres', 'comic_formats', 'comic_covers']);
  const result = await axios
    .request({
      ...AxiosOptions,
      method: 'patch',
      url: authorEP.AUTHOR_COMIC.replace(':comicId', id),
      data
    })
    .then((res) => res.data);
  return result;
};

// export const restoreComic = async (id, AxiosOptions) => {
//   const result = await axios
//     .request({
//       ...AxiosOptions,
//       method: 'patch',
//       url: `${comicEP.COMICS}/${id}`,
//       data: {
//         restore: true
//       }
//     })
//     .then((res) => res.data);
//   return result;
// };
