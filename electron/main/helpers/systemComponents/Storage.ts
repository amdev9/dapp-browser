import { createConnection, getConnection } from 'typeorm';
import { Store } from '../store/model/Store';

export class Storage {
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  async getRepository() {
    let connection;
    try {
      connection = await getConnection(this.name);
    } catch (e) {
      connection = await createConnection({
        name: this.name,
        database: `temp/${this.name}`,
        type: 'sqlite',
        synchronize: true,
        entities: [Store],
      });
    }
    return connection.getRepository(Store.name);
  }

  async save(key: string, value: string) {
    const repository = await this.getRepository();
    return await repository.save({ key, value });
  }

  async findAll() {
    const repository = await this.getRepository();
    return await repository.find();
  }

  async remove(key: string) {
    const repository = await this.getRepository();
    const storeToRemove = await repository.findOne(key);
    return repository.remove(storeToRemove);
  }
}
