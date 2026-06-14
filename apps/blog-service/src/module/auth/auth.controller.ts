import { Get, UseGuards, Request, Inject } from '@nestjs/common'
import { GithubAuthGuard } from '@/common/guards/github-auth.guard'

import { ResultData } from 'src/common/utils/result'
import { ConfigService } from '@nestjs/config'
import { Controller } from '@nestjs/common'
import { AuthService } from './auth.service'
import { Body, Post } from '@nestjs/common'
import { RegistryUserDto, LoginUserDto } from './dto/index'
import { ApiTags, ApiOperation } from '@nestjs/swagger'

@ApiTags('认证')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject(ConfigService) private readonly config: ConfigService
  ) {}
  @ApiOperation({ summary: '获取验证码' })
  @Get('/captcha')
  getCaptchaImage() {
    return this.authService.getCaptchaImage()
  }

  @ApiOperation({ summary: '用户注册' })
  @Post('/registry')
  registry(@Body() registryUserDto: RegistryUserDto) {
    return this.authService.registry(registryUserDto)
  }

  @ApiOperation({ summary: '用户登录' })
  @Post('/login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto)
  }

  @ApiOperation({ summary: 'GitHub 登录' })
  @UseGuards(GithubAuthGuard)
  @Get('/github')
  githubLogin() {}

  @ApiOperation({ summary: 'GitHub 授权回调' })
  @UseGuards(GithubAuthGuard)
  @Get('/github/callback')
  async githubAuthCallback(@Request() req) {
    const user = req.user
    return this.authService.githubLogin(user)
  }
}
