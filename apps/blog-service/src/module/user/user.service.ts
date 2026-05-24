import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { ResultData } from 'src/common/utils/result'
import { UserEntity } from './entities/user.entity'
import { CreateUserDto, CreateGithubUserDto, UpdateUserDto } from './dto/index.dto'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const user = await this.userRepo.findOne({ where: { phone: createUserDto.phone } })
    if (user) {
      return ResultData.fail(500, '该账号已存在')
    }

    const salt = bcrypt.genSaltSync(10)
    if (createUserDto.password) {
      createUserDto.password = bcrypt.hashSync(createUserDto.password, salt)
    }

    // 自动生成昵称：用户_手机号后4位
    const username = createUserDto.username || `用户_${createUserDto.phone.slice(-4)}`

    const res = await this.userRepo.save({
      phone: createUserDto.phone,
      password: createUserDto.password,
      username
    })
    if (res) {
      return ResultData.success(200, '创建成功')
    } else {
      return ResultData.fail(500, '创建失败')
    }
  }

  async createUserByGithub(createGithubUserDto: CreateGithubUserDto) {
    const user = await this.userRepo.findOne({ where: { githubId: createGithubUserDto.githubId } })
    if (user) {
      return ResultData.success(200, '登录成功', { ...user })
    } else {
      const res = await this.userRepo.save({
        githubId: createGithubUserDto.githubId,
        username: createGithubUserDto.username || `github_${createGithubUserDto.githubId.slice(-6)}`
      })
      if (res) {
        return ResultData.success(200, '登录成功', { ...res })
      } else {
        return ResultData.fail(500, '登录失败')
      }
    }
  }

  async findUserByPhone(phone: string) {
    const user = await this.userRepo.findOne({ where: { phone } })
    return user || null
  }

  async findAll() {
    const users = await this.userRepo.find({
      order: { createdAt: 'DESC' }
    })
    return ResultData.success(200, '获取成功', users)
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOne({ where: { id: id as any } })
    if (!user) {
      return ResultData.fail(404, '用户不存在')
    }
    return ResultData.success(200, '获取成功', user)
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepo.findOne({ where: { id: id as any } })
    if (!user) {
      return ResultData.fail(404, '用户不存在')
    }
    await this.userRepo.update(id as any, updateUserDto as any)
    return ResultData.success(200, '更新成功')
  }

  async remove(id: number) {
    const user = await this.userRepo.findOne({ where: { id: id as any } })
    if (!user) {
      return ResultData.fail(404, '用户不存在')
    }
    await this.userRepo.remove(user)
    return ResultData.success(200, '删除成功')
  }
}
