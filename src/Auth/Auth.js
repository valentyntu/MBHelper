import auth0 from 'auth0-js';
import history from '../history';
import axios from 'axios';

export default class Auth {
    auth0 = new auth0.WebAuth({
        domain: 'mbhelper.eu.auth0.com',
        clientID: 'A8fsu8Vr4pvp0uTpxBaPzKgvXzJkk3gQ',
        redirectUri: 'http://localhost:3000/callback',
        audience: 'https://mbhelper.eu.auth0.com/userinfo',
        responseType: 'token id_token',
        scope: 'openid profile'
    });

    login() {
        this.auth0.authorize();
    }

    constructor() {
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.handleAuthentication = this.handleAuthentication.bind(this);
        this.isAuthenticated = this.isAuthenticated.bind(this);
    }

    handleAuthentication() {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult);

            } else if (err) {
                console.log(err);
            }
            history.replace("/workspace");
        });
    }

    setSession(authResult) {
        let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
        axios.defaults.headers.common['Authorization'] = authResult.idToken;
    }

    logout() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        axios.defaults.headers.common['Authorization'] = "";
        history.replace("/workspace");
    }

    isAuthenticated() {
        let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
    }

    getUserInfo() {
        let token = localStorage.getItem('access_token');
        return new Promise((resolve, reject) => {
            this.auth0.client.userInfo(token, (err, user) => {
                if (err) reject(err);
                else resolve(user)
            })
        });
    }
}