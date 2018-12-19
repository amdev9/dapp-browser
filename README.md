## Deploy instruction

For **Linux** enable sandbox (change value from `0` to `1`): `/proc/sys/kernel/unprivileged_userns_clone`

**Development setup:**
```
git clone https://github.com/arrayio/array-io-client && cd array-io-client
npm install
npm run setup
```
Spawn new shell & wait for build process finish:
```
npm run dev
```

**Build application for Linux/macOS**

```
npm install
npm run build
```
and get executable file from `./electron/main/release` folder.


**Build for Windows:**

***Requirements:***
1. Python 2.7
2. Visual Studio 2015
3. ```npm install --global windows-build-tools```

Run build process and get '.exe' file from ```./electron/main/release``` folder.
```
npm install
npm run build-win
```

**How to upload dapp into IPFS**
- Download <a href="https://github.com/ipfs/go-ipfs">go-ipfs client</a>
- Upload Dapp folder.
Every Dapp is web application, which should contain manifest.json file with project settings (app title, entry point html file, icons and etc...)
```
{
  "title": "IPFS Chat application",
  "main": "index.html",
  "appName": "Chat",
  "assets/": ["app/images/**"],
  "icon": "app/images/contact.svg",
  "preview": "app/images/thumb.png",
  "categories": [
    "tools"
  ],
  "permissions": [
    "ipfs"
  ]
}

```
You can upload Dapp folder with native ipfs client by commands:

```ipfs add -r <dapp-folder>```

To keep the files online and avoid them to be garbage collected, just use thepin command and they will remain online as long as your ipfs daemon is running.

```ipfs pin add -r <dapp-folder-ipfs-hash>```

- Copy IPFS hash (Dapp list located in ```main/modules/AppsManager/component->AppsProvider```)
- If you create new Dapp in development mode, please change path to yours Dapps folder in ```main/modules/AppsManager/component:112``` parseDapps method (ex. ```constants.DAPPS_PATH```)

