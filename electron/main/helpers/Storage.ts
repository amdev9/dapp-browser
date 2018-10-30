import { DappStore } from './store/model/Store';
import { getConnection } from 'typeorm';

export class Storage {

  async save(key: string, value: string) {
    const connection = await getConnection();
    const storeRepository = connection.getRepository(DappStore.name);
    const stories = await storeRepository.find();
    console.log('stories: ', stories);

    const storeDb = new DappStore();
    storeDb.key = key;
    storeDb.value = value;
    await storeRepository.save(storeDb);

    const stories2 = await storeRepository.find();
    console.log('stories2: ', stories2);
  }
}

export default new Storage();
