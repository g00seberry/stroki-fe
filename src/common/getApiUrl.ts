export const apiUrls = {
  // auth
  signUp: '/auth/sign-up',
  login: '/auth/login',
  logout: '/auth/logout',
  refresh: '/auth/refresh',
  // users
  searchUsers: '/users/search',
}

export const getApiUrl = (url: keyof typeof apiUrls) => `/api${apiUrls[url]}`
