export const zodValidationError = {
  description: 'Zod validation error',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 400 },
      message: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            path: { type: 'array', items: { type: 'string' } },
            message: { type: 'string' }
          }
        }
      },
      error: { type: 'string', example: 'Bad Request' },
      where: {
        type: 'string',
        enum: ['body', 'query'],
        example: 'body',
      },
    },
  },
};
