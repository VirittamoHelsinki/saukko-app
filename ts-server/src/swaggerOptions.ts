import { SwaggerOptions } from 'swagger-ui-express';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Saukko API with Swagger',
    version: '1.0.0',
    description: 'This is API Documentation fot the Saukko-app-API',
  },
  servers: [
    {
      url: 'http://localhost:5000',
      description: 'Development server',
    }
  ]
}

const swaggerOptions: SwaggerOptions = {
  failOnErrors: true,
  definition: swaggerDefinition,
  apis: ['./index.ts', './routers/*.ts'],
}

export default swaggerOptions;
