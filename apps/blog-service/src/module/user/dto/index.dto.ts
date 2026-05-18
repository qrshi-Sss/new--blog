import { IsNotEmpty, Length, IsOptional } from 'class-validator'

export class CreateUserDto {
  @IsOptional()
  username?: string

  @Length(6, 20, { message: '密码长度为6-20位' })
  @IsNotEmpty({ message: '密码不能为空' })
  password: string

  @IsNotEmpty({ message: '手机号不能为空' })
  phone: string
}

export class CreateGithubUserDto {
  @IsNotEmpty({ message: 'githubId不能为空' })
  githubId: string

  @IsOptional()
  username?: string
}

export class UpdateUserDto {}

export class UpdatePwdDto {}

export class ResetPwdDto {}
