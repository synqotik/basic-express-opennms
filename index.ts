import axios, { AxiosRequestConfig, getAdapter } from 'axios';
import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import { API, Client, DAO, Model } from 'opennms';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/', async (req: Request, res: Response) => {
  console.log('In get /');

  const baseUrl = 'http://localhost:8980/opennms/';
  const username = 'admin';
  const password = 'admin';
  const authConfig = new API.OnmsAuthConfig(username, password);

  const authHeader = 'Basic ' + btoa(username + ':' + password)
  
  const axiosOpts = {
    adapter: getAdapter('http'),
    baseURL: baseUrl,
    timeout: 1000,
    withCredentials: true,
    headers: {
      "Authorization": authHeader
    }
  } as AxiosRequestConfig;

  const instance = axios.create(axiosOpts);

  const client =  await new Client(instance).connect('Demo', baseUrl, username, password);

  //console.log('DEBUG client:');
  //console.dir(client);

  const nodeDao: DAO.NodeDAO = client.nodes();

  const nodes: Model.OnmsNode[] = await nodeDao.find('');

  console.log('Got nodes:')
  console.dir(nodes)

  res.json(nodes);

  //res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});


