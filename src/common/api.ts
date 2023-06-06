// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import axios, { AxiosError } from 'axios'
import { onError } from './getErrorMessage'
import { logout } from '../components/App/appStore'
import { authService } from '../services/AuthService'

const tokenKey = 'accessToken'

export const setAuthToken = (value?: string) => {
  try {
    if (value) {
      localStorage.setItem(tokenKey, value)
    } else {
      localStorage.removeItem(tokenKey)
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e)
  }
}

export const getAuthToken = (): string => localStorage.getItem(tokenKey) || ''
const $api = axios.create()

/**
 * Интерцепторы работают как middleware, тут перед каждым запросом
 * в заголовки добавляется токен для авторизаии
 */
$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${getAuthToken()}`
  return config
})

$api.interceptors.response.use(
  (config) => config,
  async (error: AxiosError) => {
    const originalRequest = error.response
    if (
      originalRequest &&
      originalRequest.status == 401 &&
      !originalRequest.config._isRetry
    ) {
      try {
        originalRequest.config._isRetry = true
        const resp = await authService.refreshAuth()
        setAuthToken(resp.accessToken)
        return $api.request(originalRequest.config)
      } catch (error) {
        onError(error)
        logout()
      }
    }
    throw error
  }
)

export default $api
