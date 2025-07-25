import { Controller, Get, Post, Param, Body, UseGuards, UseFilters } from '@core/decorators'
import { FilmService } from './film.service'
import { FilmSchema } from './dto/film.dto';

import { ZodValidationPipe } from '../shared/pipes';
import { AuthGuard } from '../shared/guards';
import { MyExceptionFilter } from '../shared/filters';

@UseFilters(MyExceptionFilter)
@Controller('/films')
export class FilmController {
  constructor(private filmService: FilmService) {}
  @Get()
  getAll() {
    return this.filmService.getAll()
  }

  @Get(':filmId')
  getById(@Param('filmId') filmId: string) {
    return this.filmService.getById(Number(filmId))
  }

  @Post()
  @ZodValidationPipe(FilmSchema)
  create(@Body() film: any) {
    return this.filmService.create(film)
  }

  @Get('/favorites')
  @UseGuards(AuthGuard)
  getFavorites() {
    return { favourites: ['film 1', 'film 2'] }
  }
}