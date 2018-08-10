## Deploy instruction

For **Linux** enable sandbox (change value from `0` to `1`): `/proc/sys/kernel/unprivileged_userns_clone`
```
git clone https://github.com/arrayio/array-io-client && cd array-io-client
cd electron/client && npm install && cd ../..
cd electron/dapps && npm install && cd ../..
cd electron/main && npm install && cd ../..
npm start
```

