import { axiosInstance } from 'libs/api'

export default class AuthService {
  static async signin (payload: any) {
    const resp = await axiosInstance.post('http://localhost:5000/auth/signin', payload)
    return resp.data
  }

  static async signup (payload: any) {
    const resp = await axiosInstance.post('http://localhost:5000/auth/signup', payload)
    return resp.data
  }

  static persistToken (token?: string | null, refreshToken?: string | null) {
    if (token) {
      localStorage.setItem('token', token)
    } else if (token === null) {
      localStorage.removeItem('token')
    }
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken)
    } else if (refreshToken === null) {
      localStorage.removeItem('refreshToken')
    }
  }
}
