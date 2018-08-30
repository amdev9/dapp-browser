


const IPFS = require('ipfs');
 
const localConf = { 
 
  config: {
    Addresses: {
      Swarm: [
        "/ip4/127.0.0.1/tcp/4003/ws/ipfs/Qmd2giDVoeBE8bjaaeUDxqDjmw7BeZYpiRyb792SJjreYA",
        "/ip4/127.0.0.1/tcp/4002/ipfs/Qmd2giDVoeBE8bjaaeUDxqDjmw7BeZYpiRyb792SJjreYA",
        "/ip4/192.168.0.88/tcp/4002/ipfs/Qmd2giDVoeBE8bjaaeUDxqDjmw7BeZYpiRyb792SJjreYA"
      ]
    }
  }
};

const ipfs = new IPFS(localConf)




ipfs.on('ready', async () => { 
  if (ipfs.isOnline()) {
    console.log('online');
  } 
  
  let homeCid = "Qmd2giDVoeBE8bjaaeUDxqDjmw7BeZYpiRyb792SJjreYA";
  ipfs.ls(homeCid, function (err, files) {
    files.forEach((file) => {
      console.log(file.path)
    })
  });

});
 

 