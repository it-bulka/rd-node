import { Controller, Get, Post, Param, Body } from '@core/decorators'
import { FilmService } from './film.service'

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
  create(@Body() film: any) {
    return this.filmService.create(film)
  }
}