# basic-express-opennms

Basic node.js / Express / opennms-js application

# Building

```
npm install
```

Then, you need to edit `node_modules/opennms/dist/opennms.js`. On line 10, replace `self` with `globalThis`:

```
})(globalThis, () => {
```

Then build and start application.

```
npm run build

npm run start
```

Express app will be running on port 5002, or whatever you set `PORT` to in `.env`.

Make sure to set `baseUrl` and `username/password`.


