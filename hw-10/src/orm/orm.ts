import { Pool } from 'pg'

interface EntityWithId {
  id: number | string;
}

export class Orm<T extends EntityWithId> {
  constructor(private table: string, private pool: Pool) {}

  async find(filters?: Partial<T>): Promise<T[]> {
    let query = `SELECT * FROM ${this.table}`;
    const values: string[] = []

    if(filters && Object.keys(filters).length > 0) {
      const conditions = Object.entries(filters).map(([key, value]) => {
        values.push(value);

        return `${key} = $${values.length}`;
      });

      query += ` WHERE ${conditions.join(' AND ')}`;
    }

    const { rows } = await this.pool.query(query, values);
    return rows
  }

  async findOne(id: T['id']): Promise<T | null> {
    const query = `SELECT * FROM ${this.table} WHERE id = $1`;
    const { rows } = await this.pool.query<T>(query, [id])
    return rows[0] ?? null;
  }

  async save(entity: Omit<T, 'id'>): Promise<T> {
    const keys = Object.keys(entity);
    const values = Object.values(entity);

    const columns = keys.map((key) => `"${key}"`).join(', ');
    const params = values.map((value, index) => `$${index + 1}`).join(', ');

    const query = `INSERT INTO ${this.table} (${columns}) VALUES (${params}) RETURNING *`;
    const { rows } = await this.pool.query(query, [...values]);
    return rows[0]
  }

  async update(id: T['id'], patch: Partial<T>): Promise<T> {
    const keys = Object.keys(patch);
    if (keys.length === 0) throw new Error('Nothing to update');

    const values = Object.values(patch);
    const setStr = keys.map((k, i) => `"${k}" = $${i + 2}`).join(', '); // cause $1 = id

    const query = `UPDATE ${this.table} SET ${setStr} WHERE id = $1 RETURNING *`;
    const { rows } = await this.pool.query(query, [id, ...values]);
    return rows[0] ?? null;
  }

  async delete(id: T['id']): Promise<void> {
    const query = `DELETE FROM ${this.table} WHERE id = $1`;
    await this.pool.query(query, [id]);
  }
}

