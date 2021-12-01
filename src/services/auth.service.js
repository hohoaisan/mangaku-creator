/* eslint-disable consistent-return */
import { store } from 'store';
import * as AuthSlice from 'store/auth.slice';
import TokenService from './token.service';
import ToastService from './toast.service';
import * as authAPI from 'apis/auth';
import * as profileAPI from 'apis/profile';
import httpStatus from 'http-status';

class AuthService {
  static init() {
    const accessToken = TokenService.getAccessToken();
    const refreshToken = TokenService.getRefreshToken();
    store.dispatch(AuthSlice.loginPending());
    if (!(accessToken && refreshToken)) {
      store.dispatch(AuthSlice.loginFailed());
      return;
    }
    profileAPI
      .getProfile()
      .then((user) => {
        store.dispatch(AuthSlice.loginSuccess(user));
      })
      .catch((err) => {
        if (err.response?.status === httpStatus.INTERNAL_SERVER_ERROR) {
          ToastService.error('Server error');
          return;
        }
        if (err.response) {
          return;
        }
        ToastService.error(err.message);
        store.dispatch(AuthSlice.loginFailed());
      });
  }

  static async login({ email, password }) {
    try {
      store.dispatch(AuthSlice.loginPending());
      const result = await authAPI.login({ email, password });
      const { user, tokens } = result;
      const accessToken = tokens.access.token;
      const refreshToken = tokens.refresh.token;
      store.dispatch(AuthSlice.loginSuccess(user));
      ToastService.success('Logged in');
      TokenService.updateTokens({ accessToken, refreshToken });
    } catch (err) {
      store.dispatch(AuthSlice.loginFailed());
      if (err.response?.data) return Promise.reject(err.response.data);
      return Promise.reject(err);
    }
    return Promise.resolve();
  }

  static async logout(options = { tokenExpired: false }) {
    const refreshToken = TokenService.getRefreshToken();
    const { tokenExpired } = options;
    try {
      const result = await authAPI.logout({ refreshToken });
      Promise.resolve(result);
    } catch (err) {
      if (err.response?.data) return Promise.reject(err.response.data);
      return Promise.reject(err);
    } finally {
      store.dispatch(AuthSlice.logout());
      ToastService.destroyAll();
      TokenService.clearTokens();
      if (tokenExpired) {
        ToastService.success('Token expired, Logged out');
      } else ToastService.success('Logged out');
    }
    return Promise.resolve();
  }
}

export default AuthService;
