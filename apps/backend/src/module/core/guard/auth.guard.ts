import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Logger
} from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { Reflector } from '@nestjs/core'
// import { UserService } from '../../user/service/user.service'
import { jwtConfig } from '../config/jwt.config'

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name)

  constructor(
    private reflector: Reflector,
    @Inject(jwtConfig.KEY)
    private jwtConf: ConfigType<typeof jwtConfig>
    // private userSvc: UserService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [
    //   context.getHandler(),
    //   context.getClass()
    // ])

    // if (isPublic) {
    //   // 标记为 public 的接口，不进行校验
    //   return true
    // }
    //
    // const isInternalPublic = this.reflector.getAllAndOverride(
    //   IS_INTERNAL_PUBLIC_KEY,
    //   [context.getHandler(), context.getClass()]
    // )
    //
    // const req = context.switchToHttp().getRequest<Request>()
    //
    // if (
    //   isInternalPublic &&
    //   ['localhost', '127.0.0.1', '0.0.0.0'].includes(req.hostname)
    // ) {
    //   // 内部服务接口，使用本机地址调用时不校验
    //   return true
    // }
    //
    // const token = req.header('Authorization')?.replace(/^Bearer /i, '')
    //
    // if (!token) {
    //   throw new TokenEmptyException()
    // }
    //
    // let payload: TokenPayload
    //
    // try {
    //   payload = verify(token, this.jwtConf.secret) as TokenPayload
    // } catch (e) {
    //   if (e instanceof TokenExpiredError) {
    //     throw new TokenExpiredException().setErrDebug(e.message)
    //   }
    //
    //   // 其他 token 错误
    //   throw new TokenInvalidException().setErrDebug(e.message)
    // }
    //
    // if (!payload.id) {
    //   throw new TokenInvalidException('您的账号不存在或已被删除，请重新登录')
    // }
    //
    // // 校验通过
    // const user = await this.userSvc.findByIdWithPassword(payload.id)
    // if (!user) {
    //   throw new TokenInvalidException('您的账号不存在或已被删除，请重新登录')
    // }
    //
    // req.user = user

    return true
  }
}
