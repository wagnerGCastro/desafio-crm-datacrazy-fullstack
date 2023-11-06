type AuthConfig = {
  meEndpoint: string
  loginEndpoint: string
  registerEndpoint: string
  storageTokenKeyName: string
  onTokenExpiration: string
  userData: string
}

const authConfig: AuthConfig = {
  meEndpoint: '/auth/me',
  loginEndpoint: '/auth/login',
  registerEndpoint: '/auth/register',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken',
  userData: 'userData'
}

export default authConfig
