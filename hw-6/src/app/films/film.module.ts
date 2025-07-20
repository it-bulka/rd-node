import { Module } from '@core'
import { ActorModule } from '../actors/actor.module'
import { FilmController } from './film.controller'
import { FilmService } from './film.service'

@Module({
  controllers: [FilmController],
  providers: [FilmService],
  imports: [ActorModule],
})
export class FilmModule {}