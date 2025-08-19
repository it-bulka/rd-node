import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  HttpCode,
  Body,
  Param,
  UsePipes,
  UseGuards,
  NotFoundException,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiQuery,
  ApiParam,
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiSecurity
} from '@nestjs/swagger';
import { TeaService } from './tea.service';
import { CreateTeaDto, CreateTeaSchema } from './dto/create-tea.dto';
import { UpdateTeaDTO, UpdateTeaSchema } from './dto/update-tea.dto';
import { ZodValidationPipe } from '@pipes/zod-validation.pipe';
import { AuthGuard } from '@guards/auth.guard';
import { Public } from '../shared/decorators/public.decorator';
import { QueryGetAllSchema, QueryGetAllDto } from './dto/query-get-all.dto';
import {
  CreateTeaDtoSwagger,
  UpdateTeaDtoSwagger,
  QueryGetAllDtoSwagger,
  ApiParamIdSwagger,
  TeaDtoSwagger,
  zodValidationError,
} from '@docs/schemas';

@UseGuards(AuthGuard)
@ApiTags('tea')
@Controller('tea')
export class TeaController {
  constructor(private readonly teaService: TeaService) {}

  @Get()
  @Public()
  @UsePipes(new ZodValidationPipe(QueryGetAllSchema))
  @ApiQuery({ type: QueryGetAllDtoSwagger })
  @ApiOkResponse({
    type: [TeaDtoSwagger],
    description: 'Paginated and filtrated Tea list',
  })
  @ApiBadRequestResponse(zodValidationError)
  async getAll(@Query() query: QueryGetAllDto) {
    return this.teaService.getAll({
      minRating: query.minRating,
      pageSize: query.pageSize,
      page: query.page,
    });
  }

  @Get(':id')
  @ApiSecurity('x-api-key')
  @ApiParam(ApiParamIdSwagger)
  @ApiOkResponse({ type: TeaDtoSwagger, description: 'Founded Tea by ID' })
  @ApiNotFoundResponse({ description: 'Tea not found' })
  async getById(@Param('id') id: string) {
    const data = await this.teaService.getById(id);

    if (!data) {
      throw new NotFoundException(`Tea with ID ${id} not found`);
    }
    return data;
  }

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(CreateTeaSchema))
  @ApiSecurity('x-api-key')
  @ApiBody({ type: CreateTeaDtoSwagger })
  @ApiCreatedResponse({
    type: TeaDtoSwagger,
    description: 'Tea created successfully',
  })
  @ApiBadRequestResponse(zodValidationError)
  async create(@Body() tea: CreateTeaDto) {
    return this.teaService.create(tea);
  }

  @Patch(':id')
  @ApiSecurity('x-api-key')
  @ApiBody({ type: UpdateTeaDtoSwagger })
  @ApiParam(ApiParamIdSwagger)
  @ApiOkResponse({
    type: TeaDtoSwagger,
    description: 'Tea updated successfully',
  })
  @ApiNotFoundResponse({ description: 'Tea not found' })
  @ApiBadRequestResponse(zodValidationError)
  async update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(UpdateTeaSchema)) tea: UpdateTeaDTO
  ) {
    const data = await this.teaService.update(id, tea);

    if (!data) {
      throw new NotFoundException(`Tea with ID ${id} not found`);
    }
    return data;
  }

  @Delete(':id')
  @ApiSecurity('x-api-key')
  @ApiParam(ApiParamIdSwagger)
  @ApiOkResponse({ description: 'Tea deleted successfully' })
  @ApiNotFoundResponse({
    description: 'Tea not found',
    schema: {
      example: {
        message: 'Tea with id not found.',
        error: 'Not Found',
        statusCode: 404,
      },
    },
  })
  async delete(@Param('id') id: string) {
    await this.teaService.deleteById(id);
  }
}
