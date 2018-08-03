import axios from 'axios';
import auth0 from 'auth0-js';

export const auth = new auth0.WebAuth({
  domain: 'mbhelper.eu.auth0.com',
  clientID: 'A8fsu8Vr4pvp0uTpxBaPzKgvXzJkk3gQ',
  redirectUri: 'https://mb-helper.herokuapp.com/callback',
  // redirectUri: 'http://localhost:3000/callback',
  audience: 'https://mbhelper.eu.auth0.com/userinfo',
  responseType: 'token id_token',
  scope: 'openid profile'
});

export const getUserInfo = () => {
  let token = localStorage.getItem('access_token');
  return new Promise((resolve, reject) => {
    auth.client.userInfo(token, (err, user) => {
      if (err) reject(err);
      else resolve(user)
    })
  });
};

export const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const isAuthenticated = () => {
  let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
  return new Date().getTime() < expiresAt;
};

export const setSession = (authResult) => {
  let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
  localStorage.setItem('access_token', authResult.accessToken);
  localStorage.setItem('id_token', authResult.idToken);
  localStorage.setItem('expires_at', expiresAt);
  setAuthToken(authResult.idToken);
};

export const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('id_token');
  localStorage.removeItem('expires_at');
  setAuthToken(false);
};
