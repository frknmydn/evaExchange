"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'EvaExchange API',
            version: '1.0.0',
            description: 'RESTful API documentation for the EvaExchange project.',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development Server'
            },
        ],
        components: {
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            description: 'The unique ID of the user.'
                        },
                        name: {
                            type: 'string',
                            description: 'The name of the user.'
                        },
                        email: {
                            type: 'string',
                            description: 'The email address of the user.'
                        },
                        balance: {
                            type: 'number',
                            description: 'The balance of the user.'
                        },
                    }
                },
                Stock: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            description: 'The ID of the stock.'
                        },
                        name: {
                            type: 'string',
                            description: 'The name of the stock.'
                        },
                        symbol: {
                            type: 'string',
                            description: 'The symbol of the stock.'
                        },
                        currentPrice: {
                            type: 'number',
                            description: 'The current price of the stock.'
                        },
                    }
                },
                Transaction: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            description: 'The unique ID of the transaction.'
                        },
                        userId: {
                            type: 'integer',
                            description: 'The ID of the user.'
                        },
                        stockId: {
                            type: 'integer',
                            description: 'The ID of the stock.'
                        },
                        type: {
                            type: 'string',
                            enum: ['buy', 'sell'],
                            description: 'The type of transaction (buy or sell).'
                        },
                        quantity: {
                            type: 'integer',
                            description: 'The quantity of the transaction.'
                        },
                        date: {
                            type: 'string',
                            format: 'date-time',
                            description: 'The date of the transaction.'
                        },
                    }
                },
                Portfolio: {
                    type: 'object',
                    properties: {
                        userId: {
                            type: 'integer',
                            description: 'The ID of the user.'
                        },
                        stockId: {
                            type: 'integer',
                            description: 'The ID of the stock.'
                        },
                        quantity: {
                            type: 'integer',
                            description: 'The quantity of the stock owned.'
                        }
                    }
                }
            },
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./Routes/*.ts'], // Path and file extension for your Swagger documentation in TypeScript files
};
exports.default = swaggerOptions;
