import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import {
  GetParamsProvincesSchema,
  QueryProvincesSchema,
} from './provinces.schema';
import { PaginationQueryDTO } from 'src/common/dtos/request.dto';

export class GetParamsProvincesDTO extends createZodDto(
  GetParamsProvincesSchema,
) {}

export class QueryProvincesDTO extends createZodDto(QueryProvincesSchema) {}
