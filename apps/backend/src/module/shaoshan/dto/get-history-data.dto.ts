import { IsISO8601, IsString } from 'class-validator'

export class GetHistoryDataDto {
  // 测点 Key
  @IsString()
  key: string

  // 开始时间
  @IsString()
  @IsISO8601()
  startTime: string

  // 结束时间
  @IsString()
  @IsISO8601()
  endTime: string
}
