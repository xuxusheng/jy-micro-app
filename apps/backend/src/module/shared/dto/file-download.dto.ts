import { IsNotEmpty, IsString } from 'class-validator'

export class FileDownloadDto {
  @IsString()
  @IsNotEmpty()
  fileName: string // 文件名
}
