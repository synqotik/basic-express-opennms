import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import { API, Client, DAO, Model } from 'opennms';
import { buildClient } from './clientBuilder'
import { createIpInterfaceForNodesFilter, createQueryFilter } from './queryBuilder'

dotenv.config();

const app: Express = express();
// Only parse query parameters into strings, not objects
app.set('query parser', 'simple');

const port = process.env.PORT;

/** Welcome */
app.get('/', async (req: Request, res: Response) => {
  const text =
    '<html><body>' +
    'Welcome to basic-express-opennms server<br /><br />' +
    '<table>' +
    '<tr><td>/</td><td>this message</td></tr>' +
    '<tr><td>/nodes</td><td>get nodes using a filter</td></tr>' +
    '<tr><td>/nodes/:id</td><td>get a single node by id</td></tr>' +
    '<tr><td>/interfaces-for-nodes?nodeIds=1,2,3,4</td><td>get interfaces for the given nodeIds</td></tr>' +
    '</table>' +
    '</body></html>';

  res.send(text);
});

/** Get a single node by id. */
app.get('/nodes/:id', async (req: Request, res: Response) => {
  const client: Client = await buildClient();

  const nodeDao: DAO.NodeDAO = client.nodes();

  const node = await nodeDao.get(req.params.id);

  res.json(node);
})

/**
 * Get nodes using a filter.
 * Query string:
 *
 * - empty: get all nodes
 * - '?label=localhost': nodes with node label 'localhost'
 * - '?nodeIds=1,2,3,4': nodes with node ids 1, 2, 3 or 4
 * - '?location=Loc0': nodes with monitoring location 'Loc0'
 * 
 */
app.get('/nodes', async (req: Request, res: Response) => {
  console.log('In get /');

  const client: Client = await buildClient();


  const nodeDao: DAO.NodeDAO = client.nodes();

  const filter: API.Filter = createQueryFilter();

  const nodes: Model.OnmsNode[] = await nodeDao.find(filter);

  res.json(nodes);
});

/**
 * Get ip addresses for given comma-separated list of node ids in query param 'nodeIds'.
 * Example: http://localhost:5002/interfaces-for-nodes?nodeIds=1,2,3,4
 */
app.get('/interfaces-for-nodes', async (req: Request, res: Response) => {
  console.log('In get /');

  const client: Client = await buildClient();


  const intfDao: DAO.IpInterfaceDAO = client.ipInterfaces();

  const nodeIds = (req.query.nodeIds || '') as string || ''

  const ids = nodeIds.split(',').map(x => parseInt(x.trim()))

  const filter: API.Filter = createIpInterfaceForNodesFilter(ids);

  const interfaces: Model.OnmsIpInterface[] = await intfDao.find(filter);

  res.json(interfaces);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
