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
and get executable file from `./release` folder.


**Build for Windows:**

***Requirements:***
1. Python 2.7
2. Visual Studio 2015
3. ```npm install --global windows-build-tools```
```
npm install
npm run build-win
```
