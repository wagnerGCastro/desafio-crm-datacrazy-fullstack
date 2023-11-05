export default {
  meEndpoint: '/auth/me',
  loginEndpoint: '/auth/login',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
