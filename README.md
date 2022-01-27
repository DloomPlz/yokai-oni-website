# AngularJS + socket.io + web3js

https://codepen.io/zheleznov/pen/POXMdO

This is an example app with angularjs, socket.io, sweetalert2, metamask interaction and web3js.

## Getting started

To try this example app, please first run the server (API HTTP + socket.io) in `server` with :

```bash
npm install
npm start
```

Please note that if you don't need web3.js, remove it (and its service), as it weighs 2 MB.



Then serve the front-end with a http server like [live-server](https://www.npmjs.com/package/live-server) or `npx static-server` or `python http.server` :

```bash
npx live-server
```

### Update components

- download latest angularjs (select zip) : https://angularjs.org/
- download latest angular ui-router (min.js + min.js.map) : https://github.com/angular-ui/ui-router

- download socket.io client : https://github.com/socketio/socket.io-client/tree/master/dist
- download angular-js-socket-io : https://github.com/btford/angular-socket-io/archive/master.zip

- download web3js : https://github.com/ChainSafe/web3.js/tree/1.x/dist

- download sweetalert2 : https://github.com/sweetalert2/sweetalert2/releases
- download ngsweetalert : https://github.com/recepuncu/ngSweetAlert2