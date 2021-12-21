import axios, { AxiosResponse } from 'axios'
import { URL_USERS, axDefaultConfig } from './'

export interface IBalance {
  token: string,
  balance: number
}

export interface IUser {
  id: string,
  email: string;
  image: string,
  balances: IBalance[]
}


type AuthFunction = (credentials?: { email?: string, password?: string }, action?: string, signal?: any, payload?: any) => Promise<AxiosResponse<any>>
type LogOut = (signal?: any, payload?: any) => Promise<AxiosResponse<any>>
type EditFunction = LogOut



export const authenticate: AuthFunction = async (credentials, action, signal) => {

  return axios.post(`${URL_USERS}/${action ?? 'login'}`, credentials, {
    signal: signal,
    ...axDefaultConfig
  })
}

export const APIlogOut: LogOut = (signal) => {

  return axios.post(`${URL_USERS}/logout`, {}, {
    signal,
    ...axDefaultConfig
  })
}

export const editUserInfo: EditFunction = async (signal, payload) => {

  return axios.post(URL_USERS, payload, {
    signal,
    ...axDefaultConfig
  })
}