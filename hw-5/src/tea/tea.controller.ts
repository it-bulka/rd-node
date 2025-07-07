import {
  Controller,
  Get, Post, Delete, Patch,
  HttpCode,
  Body, Param,
  UsePipes, UseGuards,
  NotFoundException, Query
} from '@nestjs/common';
import { TeaService } from './tea.service';
import { CreateTeaDto, CreateTeaSchema } from './dto/create-tea.dto';
import { UpdateTeaDTO, UpdateTeaSchema } from './dto/update-tea.dto';
import { ZodValidationPipe } from '@pipes/zod-validation.pipe';
import { AuthGuard } from '@guards/auth.guard';
import { Public } from '../shared/decorators/public.decorator';
import { QueryGetAllSchema, QueryGetAllDto } from './dto/query-get-all.dto';

@UseGuards(AuthGuard)
@Controller('tea')
export class TeaController {
  constructor(private readonly teaService: TeaService) {}

  @Get()
  @Public()
  @UsePipes(new ZodValidationPipe(QueryGetAllSchema))
  async getAll(@Query() query: QueryGetAllDto) {
    const data = await this.teaService.getAll({
      minRating: query.minRating,
      pageSize: query.pageSize,
      page: query.page
    });

    return { success: true, data }
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    const data = await this.teaService.getById(id)

    if(!data) {
      throw new NotFoundException(`Tea with ID ${id} not found`)
    }
    return { success: true, data }
  }

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(CreateTeaSchema))
  async create(@Body() tea: CreateTeaDto) {
    const data = await this.teaService.create(tea)

    return { success: true, data }
  }

  @Patch(':id')
  @UsePipes(new ZodValidationPipe(UpdateTeaSchema))
  async update(@Param('id') id: string, @Body() tea: UpdateTeaDTO) {
    const data = await this.teaService.update(id, tea)

    return { success: true, data }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.teaService.deleteById(id)
    return { success: true }
  }
}
