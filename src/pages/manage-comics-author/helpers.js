import strings from 'constants/strings';
import pick from 'utils/pick';
import * as Yup from 'yup';

const {
  forms: { validations }
} = strings;

export const createSchema = Yup.object().shape({
  title: Yup.string().max(255).required(validations.titleRequired),
  description: Yup.string().max(5000).required(validations.descriptionRequired),
  genres: Yup.array()
    .of(
      Yup.object().shape({
        id: Yup.string(),
        name: Yup.string()
      })
    )
    .min(1, validations.genreRequired),
  formats: Yup.array()
    .of(
      Yup.object().shape({
        id: Yup.string(),
        name: Yup.string()
      })
    )
    .min(1, validations.formatRequired),
  covers: Yup.array()
    .of(
      Yup.object().shape({
        id: Yup.string(),
        url: Yup.string(),
        default: Yup.boolean()
      })
    )
    .min(1, validations.coverImageRequired)
    .test({
      name: 'one-true',
      message: validations.defaultCoverRequired,
      test: (arr) => !arr.every((value) => value.default === false)
    })
});

export const createChapterSchema = Yup.object().shape({
  number: Yup.number().min(0).required(validations.chapNumberRequired),
  name: Yup.string().max(255).required(validations.nameRequired),
  volume: Yup.number().min(0),
  pages: Yup.array()
    .of(
      Yup.object().shape({
        id: Yup.string(),
        url: Yup.string()
      })
    )
    .min(1, validations.chapPagesRequired)
});

export const formatComicFormData = (values) => {
  const formValues = pick(values, ['title', 'description']);
  formValues.comic_genres = values.genres.map((genre) => ({ genreId: genre.id }));
  formValues.comic_formats = values.formats.map((format) => ({ formatId: format.id }));
  formValues.comic_covers = values.covers.map((cover) => ({ imageId: cover.id, default: cover.default }));
  return formValues;
};

export const formatChapterFormData = (values) => {
  const formValues = pick(values, ['number', 'name', 'volume']);
  formValues.pages = values.pages.map((page, index) => ({ imageId: page.imageId, order: index + 1 }));
  return formValues;
};
