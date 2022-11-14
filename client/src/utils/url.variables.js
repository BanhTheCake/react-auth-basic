const BASE_URL = 'http://localhost:8080';
const BASE_URL_V1 = `${BASE_URL}/api/v1`;

// Auth
const URL_AUTH = `${BASE_URL_V1}/auth`;
const URL_AUTH_REGISTER = `${URL_AUTH}/register`;
const URL_AUTH_LOGIN = `${URL_AUTH}/login`;
const URL_REFRESH = `${URL_AUTH}/refreshToken`;
const URL_AUTH_LOGOUT = `${URL_AUTH}/logout`;
const URL_AUTH_USER = `${URL_AUTH}/currentUser`;

// Users
const URL_USERS = `${BASE_URL_V1}/employees`;

export { URL_AUTH_REGISTER, URL_AUTH_LOGIN, URL_REFRESH, URL_USERS, URL_AUTH_LOGOUT, URL_AUTH_USER };
