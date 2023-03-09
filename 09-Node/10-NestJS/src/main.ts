import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder()
    .setTitle('Swagger example')
    .setDescription('The example API description')
    .setVersion('1.0')
    .addTag('example')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('doc', app, document)

  await app.listen(3000, () => {
    console.log('服务器运行成功，点击打开 http://localhost:3000')
  })
}
bootstrap()
