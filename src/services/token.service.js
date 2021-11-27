class TokenService {
  static getRefreshToken() {
    const token = localStorage.getItem('refreshToken');
    return token;
  }

  static getAccessToken() {
    const token = localStorage.getItem('accessToken');
    return token;
  }

  static updateTokens({ refreshToken, accessToken }) {
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    }
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
    }
  }

  static clearTokens() {
    localStorage.clear('refreshToken');
    localStorage.clear('accessToken');
  }
}

export default TokenService;
