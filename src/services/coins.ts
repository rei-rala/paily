import axios, { AxiosRequestConfig } from 'axios'
import { URL_CRIPTO, axDefaultConfig } from './'

export interface ICoin {
  name: string,
  token: string,
  image: string,
  buy: number,
  sell: number,
  change24h: number,
  lastUpdated: number;
  timestamp?: number
}

export interface ICoinData {
  _id: string,
  timestamp: number,
  details: ICoin[],
}

export const getCriptoList: (signal?: any) => any = async (signal) => {

  const axConfig: AxiosRequestConfig = {
    signal,
    ...axDefaultConfig
  }

  return await axios.get(`${URL_CRIPTO}/latestprices`, axConfig)
}

export const getCriptoByToken: (token: string, signal?: any) => any = async (token, signal) => {

  const axConfig: AxiosRequestConfig = {
    signal,
    ...axDefaultConfig
  }

  return await axios.get(`${URL_CRIPTO}/latestprices?token=${token}`, axConfig)
}
