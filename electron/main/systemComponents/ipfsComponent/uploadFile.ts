import * as IPFS from 'ipfs';
import * as fs from 'fs';
import { Buffer } from 'buffer';
import * as streamBuffers from 'stream-buffers';
 
 
declare const Promise: any;



class IpfsComponent {
  node: IPFS;

  constructor() {
    
    const localConf = { 
      repo: '/Users/pidgin/dev/boilerplate/ipfsTest',
      config: {
        Addresses: {
          API: "/ip4/127.0.0.1/tcp/5001",
        }
      }
    };
    this.node = new IPFS(localConf);
  }

  uploadIPFS = (fileArrayBuffer: ArrayBuffer): Promise<Buffer> => {
  return new Promise((resolve: any, reject: any) => {

    // this.setState({ progress: 0 });

    const myReadableStreamBuffer = new streamBuffers.ReadableStreamBuffer({
      chunkSize: 25000, 
    });

    myReadableStreamBuffer.on('data', (chunk: Buffer) => {
      // this.setState({ progress: this.state.progress + chunk.byteLength });
      myReadableStreamBuffer.resume();
    });

    this.stream = this.ipfs.files.addReadableStream();

    this.stream.on('data', (file: Buffer) => resolve(file));
  
    this.stream.write(myReadableStreamBuffer);
    myReadableStreamBuffer.put(Buffer.from(fileArrayBuffer));

    myReadableStreamBuffer.on('end', () => this.stream.end());
    myReadableStreamBuffer.stop();
  });
};


    
  const main = async () => {
    var file = "./package.json";
    const files: string[] = [file]; 
    try {
      const response = await Promise.all([...files.map(aFile  => readFile(aFile))]);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }

}

async function readFileAsync(path: string, opts = 'utf8') {
  return new Promise((res: any, rej: any) => {
    fs.readFile(path, opts, (err: Error, data: any) => {
      if (err) rej(err)
      else res(data)
    })
  })
}


const readFile = async (file: any) => { //@todo fix to pipe object
  let data = await readFileAsync('package.json');
  uploadIPFS(data);  
}

main();