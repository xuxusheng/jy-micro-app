import {
  IsBooleanString,
  IsNumber,
  IsOptional,
  IsString
} from 'class-validator'

export class PageMiddleScreenDataDto {
  @IsNumber()
  pn: number

  @IsNumber()
  ps: number

  // 阀组
  @IsOptional()
  @IsString()
  area?: string

  // 数据名（模糊匹配）
  @IsOptional()
  @IsString()
  dataName?: string

  // 设备名
  @IsOptional()
  @IsString()
  deviceName?: string

  // 是否置顶
  @IsOptional()
  @IsBooleanString()
  isTop?: string
}
