import { IsNotEmpty, IsString } from 'class-validator'

export class FindByIdDto {
  @IsString()
  @IsNotEmpty({
    message: '参数 id 不能为空'
  })
  id: string
}
