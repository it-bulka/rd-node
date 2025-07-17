import { promises as fs } from 'fs';
import  * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

export abstract class BaseDBModule<T extends { id: string }> {
  private readonly filePath: string;

  protected constructor(fileName: string) {
    this.filePath = path.resolve('./', fileName);
  }

  private async read(): Promise<T[]> {
    try {
      const file = await fs.readFile(this.filePath, 'utf8');
      const content = file.trim() !== '' ? JSON.parse(file) : [];
      return Array.isArray(content) ? content : [];
    } catch (e) {
      if ((e as NodeJS.ErrnoException).code === 'ENOENT') return [];
      throw e;
    }
  }

  private async save(data: T[]): Promise<void> {
    await fs.writeFile(this.filePath, JSON.stringify(data, null, 2), 'utf8');
  }

  async getAll(): Promise<T[]> {
    return this.read();
  }

  async getOne(id: string): Promise<T | undefined> {
    const db = await this.read();
    return db.find(item => item.id === id);
  }

  async createOne(data: Omit<T, 'id'>): Promise<T> {
    const item = { ...data, id: uuidv4() } as T;
    const db = await this.read();
    db.push(item);
    await this.save(db);
    return item;
  }

  async updateOne(id: string, dataToUpdate: Partial<T>): Promise<T | undefined> {
    const db = await this.read();
    let updatedItem: T | undefined;

    const updatedDb = db.map(item => {
      if (item.id === id) {
        updatedItem = { ...item, ...dataToUpdate };
        return updatedItem;
      }
      return item;
    });

    await this.save(updatedDb);
    return updatedItem;
  }

  async deleteOne(id: string): Promise<T | undefined> {
    const db = await this.read();
    const deletedItem = db.find(item => item.id === id);
    const newDb = db.filter(item => item.id !== id);
    await this.save(newDb);
    return deletedItem;
  }

  async deleteAll(): Promise<void> {
    await this.save([]);
  }
}