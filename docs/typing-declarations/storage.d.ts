type Status = boolean;
type Key = string


export interface IWrite<T> {
  create(item: T): Promise<boolean>;
  update(id: string, item: T): Promise<boolean>;
  delete(id: string): Promise<boolean>;
}

export interface IRead<T> {
  find(item: T): Promise<T[]>;
  findOne(id: string): Promise<T>;
}

export interface IValidator<T> {
  // ... annotation later
}

export abstract class Collection<T> implements IWrite<T>, IRead<T> {
  name: string;

  update(id: string, item: T): Promise<boolean>;
  delete(id: string): Promise<boolean>;
  create(item: T): Promise<boolean>;
  findOne(id: string): Promise<T>;
  find(item: T): Promise<T[]>;
}

export abstract class Storage {
  addCollection<T>(name: string, scheme: IValidator<T>): Promise<Collection<T>>;
  getCollection<T>(name: string): Collection<T>;
}

export abstract class KeyValueStorage {
  put(id: string, value: any): Status;
  get(id: string): Promise<any>;
  remove(id: string): Status;
  keys(): Key[];
}