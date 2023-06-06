import axios from 'axios'
import { AuthResponse } from '../types/AuthResponse'
import { User } from '../types/User'
import $api from '../common/api'

export class AuthService {
  async registration(email: string, password: string): Promise<AuthResponse> {
    const res = await axios.post('/api/auth/registration', { email, password })
    return res.data
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    const res = await axios.post('/api/auth/login', { email, password })
    return res.data
  }

  async logout() {
    const res = await axios.get('/api/auth/logout')
    return res.data
  }

  async refreshAuth(): Promise<AuthResponse> {
    const res = await axios.get('/api/auth/refresh')
    return res.data
  }

  async getUsers(): Promise<User[]> {
    const res = await $api.get('/api/auth/users')
    return res.data
  }
}

export const authService = new AuthService()
