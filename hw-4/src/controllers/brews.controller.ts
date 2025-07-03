import type { BrewsService } from '@/services/brews.service'
import type { Controller, ResponseBody } from '@/types/types'
import { BrewDto, BrewFilters, BrewFull } from '@/dto/brew.dto'

export class BrewsController {
  static scope = 'scoped' as const
  brewsService: BrewsService

  constructor(brewsService: BrewsService) {
    this.brewsService = brewsService
  }

  all: Controller<any, ResponseBody<BrewFull[]>, any, BrewFilters> = (req, res) => {
    const brews = this.brewsService.getAll(req.validatedQuery)
    return res.status(200).json({ success: true, data: brews })
  }

  findOne: Controller<{ id: string }, ResponseBody<BrewFull>> = (req, res) => {
    const brew = this.brewsService.getById(req.params.id)
    return res.status(200).json({ success: true, data: brew })
  }

  deleteOne: Controller<{ id: string }> = (req, res) => {
    this.brewsService.deleteOne(req.params.id)
    return res.status(200).end()
  }

  create: Controller<any,ResponseBody<BrewFull>, BrewDto> = (req, res) => {
    const brew = this.brewsService.createOne(req.body)
    return res.status(201).json({ success: true, data: brew })
  }

  update: Controller<{ id: string }, ResponseBody<BrewFull | null>, BrewDto> = (req, res) => {
    const brew = this.brewsService.updateOne(req.params.id, req.body)
    return res.status(200).json({ success: true, data: brew })
  }
}