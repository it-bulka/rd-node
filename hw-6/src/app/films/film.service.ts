import { Injectable } from '@core'

@Injectable()
export class FilmService{
  getAll(){
    return { data: 'films'}
  }

  getById(id: number){
    return { data: 'film', id: id }
  }

  create(film: any){
    return { data: film }
  }
}