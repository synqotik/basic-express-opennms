import { Request, Response } from 'express';
import { API, Client, DAO, Model } from 'opennms';
import { buildClient } from '../services/clientBuilder';
import { createIpInterfaceFilter } from '../services/queryBuilder';

/**
 * Get ip addresses for given query.
 * Example, interfaces with interface IDs:
 *   http://localhost:5002/interface?id=1,2,3,4
 * Example, interfaces with node IDs:
 *   http://localhost:5002/interface?nodeId=1,2,3,4
 * Example, interfaces for nodes with node Ids that are down:
 *   http://localhost:5002/interface?nodeId=1,2,3,4&down=true
 */
export const getInterfaces = async (req: Request, res: Response) => {
  const client: Client = await buildClient();

  const intfDao: DAO.IpInterfaceDAO = client.ipInterfaces();

  const filter: API.Filter = createIpInterfaceFilter(req.query);

  let interfaces: Model.OnmsIpInterface[] = await intfDao.find(filter);

  // Rest API doesn't directly support querying on 'down', so we filter here
  const down = req.query.down === 'true' || req.query.down === 'false' ? req.query.down : ''

  if (down === 'true' || down === 'false') {
    interfaces = interfaces.filter(intf => {
      if (down === 'true') {
        return intf.isDown
      } else if (down === 'false') {
        return !intf.isDown
      }
    })
  }

  res.json(interfaces);
}
