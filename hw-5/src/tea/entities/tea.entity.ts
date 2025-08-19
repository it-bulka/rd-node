import { v4 } from 'uuid';

import { CreateTeaDto } from '../dto/create-tea.dto';
import { UpdateTeaDTO } from '../dto/update-tea.dto';
import { Tea } from '../schemas/tea.schema';

export class TeaEntity {
  #store: Map<string, Tea> = new Map();

  getAll() {
    return [...this.#store.values()];
  }

  getById(id: string): Tea | null {
    return this.#store.get(id) ?? null;
  }

  create(data: CreateTeaDto): Tea {
    const id = v4();
    const item = {
      ...data,
      id,
    };

    this.#store.set(id, item);
    return item;
  }

  updateById(id: string, data: UpdateTeaDTO): Tea | null {
    const existedItem = this.#store.get(id);
    if (!existedItem) return null;

    const updated = {
      ...existedItem,
      ...data,
    };
    this.#store.set(id, updated);

    return updated;
  }

  delete(id: string) {
    return this.#store.delete(id);
  }
}
