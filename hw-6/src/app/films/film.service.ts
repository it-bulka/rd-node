import { Injectable } from '@core'
import { FilmDto } from './dto/film.dto';

@Injectable()
export class FilmService{
  getAll(){
    return { data: 'films'}
  }

  getById(id: number){
    return { data: 'film', id: id }
  }

  create(film: FilmDto){
    return { data: film }
  }
}