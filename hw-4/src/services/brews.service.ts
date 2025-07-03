import { BrewsModel } from '@/models/brews.model'
import type { BrewDto, BrewFull, BrewFilters } from '@/dto/brew.dto'

export class BrewsService {
  static scope = 'scoped' as const
  private brewsModel: BrewsModel

  constructor(brewsModel: BrewsModel) {
    this.brewsModel = brewsModel
  }

  getAll(filters: BrewFilters) {
    return this.brewsModel.all(filters)
  }

  getById(id: string) {
    const brew = this.brewsModel.find(id)
    if (!brew) throw Object.assign(new Error('Brew not found'), { status: 404 })
    return brew
  }

  deleteOne(id: string) {
    if(!this.brewsModel.delete(id)) {
      throw Object.assign(new Error('Brew not found'), { status: 404 })
    }

  }

  createOne(dto: BrewDto) {
    return this.brewsModel.create(dto)
  }

  updateOne(id: string, dto: BrewDto | BrewFull) {
    const brew = this.brewsModel.update(id, dto)
    if (!brew) throw Object.assign(new Error('Brew not found'), { status: 404 })
    return brew
  }
}