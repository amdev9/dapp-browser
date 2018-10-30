export class Storage {
//   constructor() {
//   }

  async save(key: string, value: string) {
    // const location = path.join(dir, file.name);
    // fs.writeFileSync(location, file.content);
    console.log('Storage save key / value: ', key, value);
  }
}

export default new Storage();
