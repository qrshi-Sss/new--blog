import request from '@/api/request'
import type { LoginDataType, LoginResult, RegisterDataType, CaptchaResult } from './type'

export function login(data: LoginDataType): Promise<LoginResult> {
  return request.post('/auth/login', data)
}

export function register(data: RegisterDataType): Promise<void> {
  return request.post('/auth/registry', data)
}

export function getCaptcha(): Promise<CaptchaResult> {
  return request.get('/auth/captcha')
}
