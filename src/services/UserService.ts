import { User } from '../types/User'
import $api from '../common/api'

export class UserService {
  static async getUsers(): Promise<User[]> {
    const res = await $api.get('/api/users')
    return res.data
  }
}
