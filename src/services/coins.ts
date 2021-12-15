import { current as coinList } from '../db/tempCoin.json'
import axios, { AxiosRequestConfig } from 'axios'

//const API_BASEURL = 'http://localhost:8080/api'
const API_BASEURL = 'https://pai-ly.herokuapp.com/api'

export interface ICoin {
  name: string,
  token: string,
  image: string,
  buy: number,
  sell: number,
}

export const getTokenList: (signal?: any) => any = async (signal) => {

  const axConfig: AxiosRequestConfig = {
    signal,
  }

  return await axios.post(`${API_BASEURL}/cripto`, axConfig)
}

export const getByToken: (tokenName: string, signal?: any) => any = async (tokenName, signal) => {
  return fetch('../db/temp.json', { signal })
    //.then(res=> res.json())
    .then(x => {
      const found = coinList.filter(coin => coin.token === tokenName)
      return found.length === 0
        ? undefined
        : found.pop()

    })

}
