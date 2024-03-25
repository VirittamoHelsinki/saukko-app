import swaggerUi, { SwaggerOptions } from 'swagger-ui-express';

const swaggerDefinition = {
  version: '1.0.0',
  info: {
    title: 'Saukko app',
  },
  servers: [
    {
      url: 'http://localhost:5000',
      description: 'Development server',
    }
  ]
}

const swaggerOptions: SwaggerOptions = {
  swaggerDefinition,
  apis: ['./routes/*.ts'],
}

export default swaggerOptions;
