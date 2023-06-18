import axios from 'axios'
import { AuthResponse } from '../types/AuthResponse'
import { getApiUrl } from '../common/getApiUrl'

export class AuthService {
  static async signUp(email: string, password: string): Promise<AuthResponse> {
    const res = await axios.post(getApiUrl('signUp'), { email, password })
    return res.data
  }

  static async login(email: string, password: string): Promise<AuthResponse> {
    const res = await axios.post(getApiUrl('login'), { email, password })
    return res.data
  }

  static async logout() {
    const res = await axios.get(getApiUrl('logout'))
    return res.data
  }

  static async refreshAuth(): Promise<AuthResponse> {
    const res = await axios.get(getApiUrl('refresh'))
    return res.data
  }
}
