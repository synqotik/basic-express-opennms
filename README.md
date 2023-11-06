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

Make sure to set `baseUrl` and `username/password` in `services/clientBuilder.ts`.


# Operation

| URL                                   | Description                                                      |
|---------------------------------------|------------------------------------------------------------------|
| /                                     | Welcome                                                          |
| /nodes                                | Get all nodes                                                    |
| /nodes?id=1,2,3,4                     | Get nodes with node ids 1, 2, 3 or 4                             |
| /nodes?label=localhost                | Get nodes with node label 'localhost'                            |
| /nodes?label=localhost,router-5       | Get nodes with node label 'localhost' or 'router-5'              |
| /nodes?location=Default,Location0     | Get nodes with node monitoring location 'Default' or 'Location0' |
| /nodes?enhanced=true                  | Get all nodes, include 'enhanced' IP Interface data              |
| /nodes?id=1,2,3,4&enhanced=true       | Get nodes with node ids, include 'enhanced' IP Interface data    |
| /interfaces                           | Get all IP interfaces                                            |
| /interfaces?id=1,2,3                  | Get IP interfaces with id 1, 2 or 3                              |
| /interfaces?nodeId=1,2,3              | Get IP interfaces with node id 1, 2 or 3                         |
| /interfaces?nodeId=1,2,3&down=true    | Get IP interfaces with node id 1, 2 or 3, which are down         |
| /interfaces?nodeId=1,2,3&down=false   | Get IP interfaces with node id 1, 2 or 3, which are not down     |
