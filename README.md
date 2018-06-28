 
## Deploy instruction (start with yarn is required!)

for linux enable sandbox (change value from `0` to `1`):
```
/proc/sys/kernel/unprivileged_userns_clone
```

```
git clone https://github.com/cypherpunk99/sandboxed-electron

npm i -g yarn
npm i -g browserify    
cd sandboxed-electron && yarn install
cd electron/client && yarn run build && cd ../..
cd electron/dapps && yarn run build && cd ../..

yarn run start
```
