import { BadRequestException } from '@nestjs/common';
import { createZodValidationPipe } from 'nestjs-zod';
import { ZodError } from 'zod';

export const CustomZodValidationPipe = createZodValidationPipe({
  // provide custom validation exception factory
  createValidationException: (error: ZodError) => {
    console.log('Error zod pipe', error.errors);
    error.errors.map((err) => {
      console.log(err.path);
    });
    return new BadRequestException(
      error.errors.map((err) => {
        return {
          message: err.message,
          code: err.code,
          path: err.path[0],
        };
      }),
    );
  },
});
