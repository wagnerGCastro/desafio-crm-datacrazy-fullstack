import authConfig from 'src/configs/auth'

export const storageGetToken = () => localStorage.getItem(authConfig.storageTokenKeyName)
export const storageSetToken = (token: string) => localStorage.setItem(authConfig.storageTokenKeyName, token)
export const storageRemoveToken = () => localStorage.removeItem(authConfig.storageTokenKeyName)
export const storageRemoveRefreshToken = () => localStorage.removeItem(authConfig.onTokenExpiration)
export const stroageRemoveUserData = () => localStorage.removeItem(authConfig.userData)
export const stroageSetUserData = (userData: any) => localStorage.setItem(authConfig.userData, userData)
