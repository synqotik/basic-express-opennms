import { Request, Response } from 'express';

/** Welcome */
export const getWelcome = async (req: Request, res: Response) => {
  const text =
    '<html>' +
    '<body>' +
    '<style>' +
    'body {' +
    '  font-family: Helvetica;' +
    '}' +
    'td {' +
    '  padding: 4px;' +
    '} ' +
    '</style>' +
    '<h1>Welcome to basic-express-opennms server</h1><br />' +
    '<table>' +
    '<tr><th>URL path</th><th>Description</th><th>Link</th></tr>' +
    '<tr><td>/</td><td>this message</td><td><a href="/">/</a></td></tr>' +
    '<tr><td>/node/1</td><td>get a single node by node id (id 1 in this case)</td><td><a href="/node/1">/node/1</a></td></tr>' +
    '<tr><td>/nodes</td><td>get all nodes</td><td><a href="/nodes">/nodes</a></td></tr>' +
    '<tr><td>/nodes?id=1,2,3,4</td><td>get nodes by node ids 1, 2, 3 or 4</td><td><a href="/nodes?id=1,2,3,4">/nodes?id=1,2,3,4</a></td></tr>' +
    '<tr><td>/nodes?id=1,2,3,4&enhanced=true</td><td>get nodes by node ids AND add "enhanced" data, i.e. IP Interface data</td><td><a href="/nodes?id=1,2,3,4&enhanced=true">/nodes?id=1,2,3,4&enhanced=true</a></td></tr>' +
    '<tr><td>/nodes?label=localhost</td><td>get nodes by node label "localhost"</td><td><a href="/nodes?label=localhost">/nodes?label=localhost</a></td></tr>' +
    '<tr><td>/nodes?label=localhost,0.0.0.0</td><td>get nodes by node label "localhost" or "0.0.0.0"</td><td><a href="/nodes?label=localhost,0.0.0.0">/nodes?label=localhost,0.0.0.0</a></td></tr>' +
    '<tr><td>/nodes?location=California,Florida</td><td>get nodes by monitoring locations "California" or "Florida"</td><td><a href="/nodes?location=California,Florida">/nodes?location=California,Florida</a></td></tr>' +
    '<tr><td>/interfaces?id=1,2,3,4</td><td>get interfaces for the given ipInterface ids</td><td><a href="/interfaces?id=1,2,3,4">/interfaces?id=1,2,3,4</a></td></tr>' +
    '<tr><td>/interfaces?nodeId=1,2,3,4</td><td>get interfaces for the given nodeIds</td><td><a href="/interfaces?nodeId=1,2,3,4">/interfaces?nodeId=1,2,3,4</a></td></tr>' +
    '<tr><td>/interfaces?down=true</td><td>get interfaces that are down</td><td><a href="/interfaces?down=true">/interfaces?down=true</a></td></tr>' +
    '<tr><td>/interfaces?down=false</td><td>get interfaces that are not down</td><td><a href="/interfaces?down=false">/interfaces?down=false</a></td></tr>' +
    '</table>' +
    '</body></html>';

  res.send(text);
};
