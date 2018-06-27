 
## Deploy instruction (start with yarn is required!)

```
git clone https://github.com/cypherpunk99/sandboxed-electron

npm i -g yarn
npm i -g browserify    
cd sandboxed-electron && yarn install
cd electron/client && yarn run build && cd ...
cd electron/dapps && yarn run build && cd ...

yarn run start
```