import { store } from 'store';
import * as AuthAction from 'store/auth.slice';
import TokenService from './token.service';

class AuthService {
  static async init() {
    const accessToken = TokenService.getAccessToken();
    const refreshToken = TokenService.getRefreshToken();
    if (accessToken && refreshToken) {
      await store.dispatch(AuthAction.getProfile({ accessToken }));
      return;
    }
    TokenService.clearTokens();
  }

  static login({ email, password }) {
    return store
      .dispatch(AuthAction.login({ email, password }))
      .then((action) => {
        // update the token
        const accessToken = action?.payload?.tokens?.access?.token;
        const refreshToken = action?.payload?.tokens?.refresh?.token;
        TokenService.updateTokens({ accessToken, refreshToken });
        return Promise.resolve(action);
      })
      .catch((err) => Promise.reject(err));
  }

  static logout() {
    const refreshToken = TokenService.getRefreshToken();
    return store
      .dispatch(AuthAction.logout({ refreshToken }))
      .then((action) => {
        TokenService.clearTokens();
        return Promise.resolve(action);
      })
      .catch((err) => {
        TokenService.clearTokens();
        return Promise.reject(err);
      });
  }
}

export default AuthService;
