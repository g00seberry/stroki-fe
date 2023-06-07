import { User } from './User'

export type AuthResponse = {
  accessToken: string
  user: User
}
