import { Module } from '@core'
import { FilmModule } from './films/film.module'
import { ActorModule } from './actors/actor.module'

@Module({
  controllers: [],
  providers: [],
  imports: [FilmModule, ActorModule]
})
export default class AppModule {}