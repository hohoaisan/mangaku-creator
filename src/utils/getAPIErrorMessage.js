import axios from 'axios';
import httpStatus from 'http-status';

const getAPIErrorMessage = (error) => {
  if (axios.isAxiosError(error)) {
    if (error.response?.data?.message) {
      return error.response?.data?.message;
    }
    if (error.response?.status === httpStatus.INTERNAL_SERVER_ERROR) {
      return 'Server error';
    }
    if (error.response) {
      return 'Unknow error';
    }
    return 'Network error';
  }
  if (error instanceof Error) {
    return error.message;
  }
  return null;
};
export default getAPIErrorMessage;
