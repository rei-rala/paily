export const API_BASEURL = process.env.NODE_ENV === 'production' ? ""+process.env.API_BASEURL : 'http://192.168.0.130:8080'
export const URL_USERS = API_BASEURL + '/api/user'
export const URL_CRIPTO = API_BASEURL + '/api/cripto'
