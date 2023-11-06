import { Request, Response } from 'express';
import { API, Client, DAO, Model } from 'opennms';
import { buildClient } from '../services/clientBuilder';
import { createIpInterfaceFilter, createNodeQueryFilter } from '../services/queryBuilder';

/**
 * Get a single node by id.
 * Path: '/nodes/:id'
 */
export const getNodeById = async (req: Request, res: Response) => {
  const client: Client = await buildClient();

  const nodeDao: DAO.NodeDAO = client.nodes();

  const node = await nodeDao.get(req.params.id);

  res.json(node);
}

/**
 * Get nodes using a filter.
 * Query string:
 *
 * - empty: get all nodes
 * - 'nodes?label=localhost': nodes with node label 'localhost'
 * - 'nodes?id=1,2,3,4': nodes with node ids 1, 2, 3 or 4
 * - 'nodes?location=Loc0': nodes with monitoring location 'Loc0'
 */
export const getNodes = async (req: Request, res: Response) => {
  const client: Client = await buildClient();

  const nodeDao: DAO.NodeDAO = client.nodes();

  const filter: API.Filter = createNodeQueryFilter(req.query);

  const nodes: Model.OnmsNode[] = await nodeDao.find(filter);

  // If 'enhanced' query specified, add ipInterfaces to each node
  if (nodes && req.query.enhanced && req.query.enhanced === 'true') {
    const nodeIds = nodes.map(n => n.id).join(',');

    const intfDao: DAO.IpInterfaceDAO = client.ipInterfaces();

    // get all IpInterfaces with the given nodeIds
    const ipFilter: API.Filter = createIpInterfaceFilter({ nodeId: nodeIds });

    const interfaces: Model.OnmsIpInterface[] = await intfDao.find(ipFilter);

    const nodeMap = new Map()
    nodes.forEach(n => nodeMap.set(n.id, n));

    // add IpInterface data to each node
    interfaces.forEach(intf => {
      if (intf.node?.id && nodeMap.has(intf.node.id)) {
        const node = nodeMap.get(intf.node.id)

        if (!node.ipInterfaces) {
          node.ipInterfaces = []
        }

        node.ipInterfaces.push(intf);
      }
    });
  }

  res.json(nodes);
}
