 
## Deploy instruction (use yarn!)

```
git clone https://github.com/cypherpunk99/sandboxed-electron

cd sandboxed-electron && yarn install
cd electron/client && yarn run build && cd ...
cd electron/dapps && yarn run build && cd ...

yarn run start
```