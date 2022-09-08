# mrogolino-2022

## Dependencies
Project used node v16.13.2.

Run `npm install` to install project dependencies.

## Structure
Folder `server` contains Node.js/express server files, `client` contains client JS files.

## How to run
Run `npm run server` to start server.

Run `npm run client` to start client. It will prompt options, choose and proceed.

```shell
[1] create a user
[2] authenticate
[3] save public key
[4] verify signature
[0] CANCEL

which one? [1...4 / 0]:
```

## Test
Run `npm test` or `npm run test` to run tests. There are a few unit tests for main logic.
