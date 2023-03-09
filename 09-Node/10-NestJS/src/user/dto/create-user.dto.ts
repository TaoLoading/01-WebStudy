import { ApiProperty } from "@nestjs/swagger"

// 传参类型及默认值
export class CreateUserDto {
  @ApiProperty({ description: '用户名' })
  username: string
  @ApiProperty({ description: '密码', default: '123456' })
  password: string
}
