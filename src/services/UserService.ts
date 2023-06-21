import axios from 'axios'
import { AuthResponse } from '../types/AuthResponse'
import { getApiUrl } from '../common/getApiUrl'

export class UserService {
  static async signUp(email: string, password: string): Promise<AuthResponse> {
    const res = await axios.post(getApiUrl('signUp'), { email, password })
    return res.data
  }
}
