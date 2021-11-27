/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import TokenService from 'services/token.service';
import ToastService from 'services/toast.service';

import { LOGIN, TOKEN_REFRESH } from 'apis/_endpoints';
import httpStatus from 'http-status';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const config = {
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    withCredentials: true
  }
};

const AxiosClient = axios.create({
  ...config
});

export default AxiosClient;

export const setupAxiosInterceptors = () => {
  AxiosClient.interceptors.request.use(
    (config) => {
      const token = TokenService.getAccessToken();
      config.headers.Authorization = token ? `Bearer ${token}` : '';
      return config;
    },
    (error) => Promise.reject(error)
  );

  AxiosClient.interceptors.response.use(
    (response) => response,
    async (err) => {
      const originalConfig = err.config;

      if (originalConfig.url !== LOGIN && err?.response?.status === httpStatus.UNAUTHORIZED && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const refreshToken = TokenService.getRefreshToken();
          const result = await AxiosClient({
            ...originalConfig,
            method: 'post',
            url: TOKEN_REFRESH,
            data: {
              refreshToken
            }
          });
          const accessToken = result?.data?.access?.token;
          TokenService.updateTokens({ accessToken });
          // Retry the request
          originalConfig.headers.Authorization = accessToken ? `Bearer ${accessToken}` : '';
          return AxiosClient(originalConfig);
        } catch (_err) {
          return Promise.reject(_err);
        }
      }

      if (originalConfig.url !== LOGIN && err?.response?.status === httpStatus.UNAUTHORIZED && originalConfig._retry) {
        TokenService.clearTokens();
        ToastService.error('TOKEN EXPIRED');
      }

      return Promise.reject(err);
    }
  );
};
