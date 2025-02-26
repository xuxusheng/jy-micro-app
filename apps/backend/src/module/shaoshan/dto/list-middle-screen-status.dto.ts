import { IsString } from 'class-validator'

export class ListMiddleScreenStatusDto {
  // 阀组
  @IsString()
  area: string
}
