import { store } from 'store';
import * as AuthSlice from 'store/auth.slice';
import TokenService from './token.service';
import ToastService from './toast.service';

class AuthService {
  static async init() {
    const accessToken = TokenService.getAccessToken();
    const refreshToken = TokenService.getRefreshToken();
    if (accessToken && refreshToken) {
      await store.dispatch(AuthSlice.getProfile({ accessToken }));
      return;
    }
    TokenService.clearTokens();
  }

  static login({ email, password }) {
    return store
      .dispatch(AuthSlice.login({ email, password }))
      .then((action) => {
        // update the token
        const accessToken = action?.payload?.tokens?.access?.token;
        const refreshToken = action?.payload?.tokens?.refresh?.token;
        TokenService.updateTokens({ accessToken, refreshToken });
        ToastService.success('Logged in successfully');
        return Promise.resolve(action);
      })
      .catch((err) => Promise.reject(err));
  }

  static logout(options = { tokenExpired: false }) {
    const refreshToken = TokenService.getRefreshToken();
    const { tokenExpired } = options;
    return store
      .dispatch(AuthSlice.logout({ refreshToken }))
      .then((action) => Promise.resolve(action))
      .catch((err) => Promise.reject(err))
      .finally(() => {
        TokenService.clearTokens();
        if (tokenExpired) {
          ToastService.success('Token expired');
        }
        return ToastService.success('Logged out');
      });
  }
}

export default AuthService;
