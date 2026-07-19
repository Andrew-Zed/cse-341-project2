const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'CSE 341 Project 2 API',
    description: 'Movies and reviews API documentation for CSE 341 Project 2',
    version: '1.0.0',
  },
  host: process.env.SWAGGER_HOST || 'localhost:3000',
  basePath: '/',
  schemes: process.env.SWAGGER_HOST ? ['https'] : ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: 'Movies',
      description: 'Movie management endpoints',
    },
    {
      name: 'Reviews',
      description: 'Review management endpoints',
    },
  ],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
