import NotificationManager from '@component/atoms/NotificationManager'
import _axios, { AxiosRequestConfig } from 'axios'

class KloudApi {
  private static axios = _axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
      common: {
        'x-api-key': process.env.REACT_APP_X_API_KEY,
      },
    },
  })

  public static setHeader = (id_token: string) => {
    KloudApi.axios.defaults.headers = {
      common: {
        'x-api-key': process.env.REACT_APP_X_API_KEY,
        Authorization: `Bearer ${id_token}`,
      },
    }
  }

  private static handleError = (error: any) => {
    const message = error.response?.data?.error_message || error.response?.data?.message || 'Unknown error'
    NotificationManager.error(message)

    console.log(error)

    return null
  }

  public static get = async (url: string, config?: AxiosRequestConfig | undefined) => {
    try {
      const response = await KloudApi.axios.get(url, config)
      return response.data
    } catch (error) {
      return KloudApi.handleError(error)
    }
  }

  public static post = async (url: string, data: object, config?: AxiosRequestConfig | undefined) => {
    try {
      const response = await KloudApi.axios.post(url, data, config)
      return response.data
    } catch (error) {
      return KloudApi.handleError(error)
    }
  }

  public static delete = async (url: string, config?: AxiosRequestConfig | undefined) => {
    await KloudApi.axios.delete(url, config)
  }
}

export default KloudApi
