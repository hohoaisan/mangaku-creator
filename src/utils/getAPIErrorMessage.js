import axios from 'axios';
import strings from 'constants/strings';
import httpStatus from 'http-status';

const { errors } = strings;

const getAPIErrorMessage = (error) => {
  if (axios.isAxiosError(error)) {
    if (error.response?.data?.message) {
      return error.response?.data?.message;
    }
    if (error.response?.status === httpStatus.INTERNAL_SERVER_ERROR) {
      return errors.server;
    }
    if (error.response) {
      return errors.unknown;
    }
    return errors.network;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return null;
};
export default getAPIErrorMessage;
