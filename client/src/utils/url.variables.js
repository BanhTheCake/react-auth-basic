const BASE_URL = 'http://localhost:8080';
const BASE_URL_V1 = `${BASE_URL}/api/v1`;

// Auth
const URL_AUTH = `${BASE_URL_V1}/auth`;
const URL_AUTH_REGISTER = `${URL_AUTH}/register`;
const URL_AUTH_LOGIN = `${URL_AUTH}/login`;

export { URL_AUTH_REGISTER, URL_AUTH_LOGIN };
