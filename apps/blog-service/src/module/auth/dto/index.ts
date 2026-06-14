import { IsNotEmpty, Length, IsOptional } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class RegistryUserDto {
  @ApiPropertyOptional({ description: '用户名' })
  @IsOptional()
  username?: string

  @ApiProperty({ description: '手机号' })
  @IsNotEmpty({ message: '账号不能为空' })
  phone: string

  @ApiProperty({ description: '密码，6-20位' })
  @Length(6, 20, { message: '密码长度为6-20位' })
  @IsNotEmpty({ message: '密码不能为空' })
  password: string

  @ApiProperty({ description: '验证码' })
  @IsNotEmpty({ message: '验证码不能为空' })
  code: string

  @ApiProperty({ description: '验证码 uuid' })
  uuid: string
}

export class LoginUserDto {
  @ApiProperty({ description: '手机号' })
  @IsNotEmpty({ message: '账号不能为空' })
  phone: string

  @ApiProperty({ description: '密码，6-20位' })
  @Length(6, 20, { message: '密码长度为6-20位' })
  @IsNotEmpty({ message: '密码不能为空' })
  password: string
}
