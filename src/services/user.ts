import axios, { AxiosRequestConfig } from 'axios'
import { URL_USERS, API_BASEURL } from './urls'

export interface IBalance {
  token: string,
  balance: number
}

export interface IUser {
  id: string,
  image: string,
  name: string
  balances: IBalance[]
}

export const logIn = async (credentials: { email: string, password: string }, signal?: any) => {

  const axConfig: AxiosRequestConfig = {
    data: {
      email: credentials.email,
      password: credentials.password
    }
  }

  return await axios.post(`${URL_USERS}/login`, axConfig, {
    signal, headers: {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": API_BASEURL,
      "Access-Control-Allow-Credentials": "true",
    }
  })
}


export const register = async (credentials: { email: string, password: string }, signal?: any) => {

  const axConfig: AxiosRequestConfig = {
    data: {
      email: credentials.email,
      password: credentials.password
    }
  }
  return await axios.post(`${URL_USERS}/register`, axConfig, {
    signal, headers: {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": API_BASEURL,
      "Access-Control-Allow-Credentials": "true",
    }
  })
}

export const APIlogOut = (signal?: any) => axios.post(`${URL_USERS}/logout`, {}, {
  signal,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": API_BASEURL,
    "Access-Control-Allow-Credentials": "true",
  }
}).catch()