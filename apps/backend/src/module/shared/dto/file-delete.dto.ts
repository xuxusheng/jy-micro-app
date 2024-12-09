import { IsNotEmpty, IsString } from 'class-validator'

export class FileDeleteDto {
  @IsString()
  @IsNotEmpty()
  fileName: string
}
