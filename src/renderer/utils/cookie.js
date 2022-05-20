import Cookies from 'js-cookie'

export function setToken(token) {
    Cookies.set('token', token, { expires: 1 })
}
export function getToken() {
    return Cookies.get('token')
}


const AccessTokenKey = 'accessToken'
//拿到token
const RefreshTokenKey = 'refreshToken'
//刷新token
export function setAccessToken (token) {
  Cookies.set(AccessTokenKey, token)
}

export function setRefreshToken (token) {
  Cookies.set(RefreshTokenKey, token)
}

export function getAccessToken () {
  const cookie = Cookies.get(AccessTokenKey)
  return cookie
}

export function getRefreshToken () {
  return Cookies.get(RefreshTokenKey)
}

export function removeAccessToken () {
  Cookies.remove(AccessTokenKey)
}

export function removeRefreshToken () {
  Cookies.remove(RefreshTokenKey)
}