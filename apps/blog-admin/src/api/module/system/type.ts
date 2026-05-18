export interface LoginDataType {
  phone: string
  password: string
}

export interface LoginResult {
  token: string
  userInfo: {
    id: number
    phone: string
    username: string
  }
}

export interface RegisterDataType {
  phone: string
  password: string
  code: string
  uuid: string
}

export interface CaptchaResult {
  img: string
  uuid: string
}
