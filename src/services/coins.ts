import axios, { AxiosRequestConfig } from 'axios'
import { API_BASEURL, URL_CRIPTO } from './urls'

export interface ICoin {
  name: string,
  token: string,
  image: string,
  buy: number,
  sell: number,
}

export const getCriptoList: (signal?: any) => any = async (signal) => {

  const axConfig: AxiosRequestConfig = {
    signal, headers: {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": API_BASEURL,
      "Access-Control-Allow-Credentials": "true",
    }
  }

  return await axios.get(`${URL_CRIPTO}/latestprices`, axConfig)
}

export const getCriptoByToken: (token: string, signal?: any) => any = async (token, signal) => {

  const axConfig: AxiosRequestConfig = {
    signal, headers: {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": API_BASEURL,
      "Access-Control-Allow-Credentials": "true",
    }
  }

  return await axios.get(`${URL_CRIPTO}/latestprices?token=${token}`, axConfig)
}
