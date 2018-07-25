 
## Deploy instruction (start with yarn is required!)

For **Linux** enable sandbox (change value from `0` to `1`): `/proc/sys/kernel/unprivileged_userns_clone`
```
git clone https://github.com/arrayio/array-io-client
npm i -g yarn
cd array-io-client && yarn install
cd electron/client && npm install && cd ../..
cd electron/dapps && npm install && cd ../..
cd electron/main && npm install && cd ../..
yarn run start
```
