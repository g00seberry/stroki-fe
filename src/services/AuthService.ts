import axios from 'axios'
import { AuthResponse } from '../types/AuthResponse'

export class AuthService {
  static async signUp(email: string, password: string): Promise<AuthResponse> {
    const res = await axios.post('/api/auth/sign-up', { email, password })
    return res.data
  }

  static async login(email: string, password: string): Promise<AuthResponse> {
    const res = await axios.post('/api/auth/login', { email, password })
    return res.data
  }

  static async logout() {
    const res = await axios.get('/api/auth/logout')
    return res.data
  }

  static async refreshAuth(): Promise<AuthResponse> {
    const res = await axios.get('/api/auth/refresh')
    return res.data
  }
}
