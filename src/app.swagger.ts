import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { appPort, nodeEnv } from './env/envoriment';

export const initSwagger = (app: INestApplication) => {
  const HOST =
    nodeEnv === 'development' ? `http://localhost:${appPort}/v2` : `http://127.0.0.1:${appPort}/v2`


  const swaggerConfig = new DocumentBuilder()
    .setTitle('Api de Localização de Endereços Florestais')
    .addBearerAuth()
    .setVersion('3.1.5')
    .setLicense('MIT', 'https://opensource.org/license/mit/')
    .setDescription('API REST de localização de endereços florestais')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/v2/docs', app, document, {
    swaggerOptions: {
      defaultModelsExpandDepth: -1,
      filter: true,
      docExpansion: 'none',
      tagsSorter: 'alpha',
      operationsSorter: 'method',
      urls: [{ url: `${HOST}/docs-json` }],
    },
  });
};
