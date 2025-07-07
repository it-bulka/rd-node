import {
  BadRequestException,
  Injectable,
  OnApplicationShutdown,
} from '@nestjs/common';
import { CreateTeaDto } from './dto/create-tea.dto';
import { UpdateTeaDTO } from './dto/update-tea.dto';
import { TeaEntity } from './entities/tea.entity';
import { Tea } from './schemas/tea.schema';
import { QueryGetAllDto } from './dto/query-get-all.dto';
import { ConsoleLogger } from '@nestjs/common';

type PaginateArg = { list: Tea[]; pageSize?: number; page?: number };
type PaginatedTea = {
  data: Tea[];
  pageSize?: number;
  page?: number;
  total: number;
};

@Injectable()
export class TeaService implements OnApplicationShutdown {
  constructor(
    private readonly teaEntity: TeaEntity,
    private readonly logger: ConsoleLogger,
  ) {}

  onApplicationShutdown() {
    this.logger.log('Bye tea‑lovers 👋');
  }

  async getAll({
    minRating,
    page,
    pageSize,
  }: QueryGetAllDto = {}): Promise<PaginatedTea> {
    let list = this.teaEntity.getAll();

    if (minRating) {
      list = this._filterByRating(list, minRating);
    }

    return this._paginate({ list, page, pageSize });
  }

  async getById(id: string) {
    return this.teaEntity.getById(id);
  }

  async create(teaDto: CreateTeaDto) {
    return this.teaEntity.create(teaDto);
  }

  async update(id: string, teaDto: UpdateTeaDTO) {
    return this.teaEntity.updateById(id, teaDto);
  }

  async deleteById(id: string) {
    return this.teaEntity.delete(id);
  }

  _filterByRating(list: Tea[], minRating: number) {
    return list.filter((item) => item.rating && item.rating >= minRating);
  }

  _paginate({ list, pageSize = 5, page = 1 }: PaginateArg): PaginatedTea {
    const total = list.length;
    const totalPages = Math.ceil(total / pageSize) || 1;
    if (totalPages < page) {
      throw new BadRequestException(
        `Page ${page} is out of range. Only ${totalPages} pages are available`,
      );
    }

    const skip = (page - 1) * pageSize;
    const startIndex = skip + 1;
    const endIndex = skip + pageSize;

    const data = list.slice(startIndex, endIndex);

    return {
      data,
      total,
      page,
      pageSize,
    };
  }
}
