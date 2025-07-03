import { nanoid } from 'nanoid'
import { BrewFull, BrewDto, BrewFilters } from '../dto/brew.dto'

type BrewFiltersEntry = [keyof BrewFilters, BrewFilters[keyof BrewFilters]];

export class BrewsModel {
  static scope = 'singleton' as const
  #store = new Map()

  constructor() {
    console.log('BrewsModel initialized')
  }

  all(filters: BrewFilters): BrewFull[] {
    console.log('filters', filters)
    const fullList = [...this.#store.values()]
    return this._filter(fullList, filters)
  }

  find(id:string){
    return this.#store.get(id) ?? null
  }

  delete(id:string){
    this.#store.delete(id)
    return true
  }

  create(dto: BrewDto): BrewFull {
    const id = nanoid(8)
    const brew = { id, ...dto }
    this.#store.set(id, brew)

    return brew
  }

  update(id: string, dto: BrewDto | BrewFull): BrewFull | null {
    if(!this.#store.get(id)) return null

    this.#store.set(id, dto)

    return this.#store.get(id)
  }

  private _filter(list: BrewFull[], filters: BrewFilters): BrewFull[] {
    const filtersList = Object.entries(filters) as BrewFiltersEntry[]

    const filterFn = (brew: BrewFull) => {
      let match = true
      for (const [fKey, fValue] of filtersList) {
        match = brew[fKey] === fValue

        if (!match) break
      }

      return match
    }

    return list.filter(filterFn)
  }
}