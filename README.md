## Deploy instruction

For **Linux** enable sandbox (change value from `0` to `1`): `/proc/sys/kernel/unprivileged_userns_clone`

Development setup:
```
git clone https://github.com/arrayio/array-io-client && cd array-io-client
cd electron/client && npm i && npm run hot-server
cd electron/dapps && npm i && npm run webpack
cd electron/main && npm i && npm run webpack
npm run dev
```

