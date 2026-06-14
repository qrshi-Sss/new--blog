import { IsNotEmpty, Length, IsOptional } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CreateUserDto {
  @ApiPropertyOptional({ description: '用户名' })
  @IsOptional()
  username?: string

  @ApiProperty({ description: '密码，6-20位' })
  @Length(6, 20, { message: '密码长度为6-20位' })
  @IsNotEmpty({ message: '密码不能为空' })
  password: string

  @ApiProperty({ description: '手机号' })
  @IsNotEmpty({ message: '手机号不能为空' })
  phone: string
}

export class CreateGithubUserDto {
  @ApiProperty({ description: 'GitHub ID' })
  @IsNotEmpty({ message: 'githubId不能为空' })
  githubId: string

  @ApiPropertyOptional({ description: '用户名' })
  @IsOptional()
  username?: string
}

export class UpdateUserDto {}

export class UpdatePwdDto {}

export class ResetPwdDto {}
