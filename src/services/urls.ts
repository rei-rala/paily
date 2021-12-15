export const API_BASEURL = process.env.NODE_ENV === 'production' ? 'https://pai-ly.herokuapp.com' : 'http://localhost:8080'
export const URL_USERS = API_BASEURL + '/api/user'