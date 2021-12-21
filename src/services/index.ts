import { API_BASEURL, URL_USERS, URL_CRIPTO } from "./urls";

const axDefaultConfig = {
  withCredentials: true,
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": API_BASEURL,
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
  }
}

export { API_BASEURL, URL_USERS, URL_CRIPTO, axDefaultConfig };