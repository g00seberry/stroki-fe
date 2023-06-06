import { User } from './User'

export type AuthResponse = {
  refreshToken: string
  accessToken: string
  user: User
}
