import axios, { AxiosRequestConfig, AxiosInstance, getAdapter } from 'axios';
import { Client } from 'opennms';
import { AxiosWrapper } from './AxiosWrapper';

const baseUrl = 'http://localhost:8980/opennms/';
const username = 'admin';
const password = 'admin';

let staticClient: Client;

export const buildAxiosInstance = (): AxiosInstance => {
  const authHeader = 'Basic ' + btoa(`${username}:${password}`)

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

  return instance;
}

export const buildClient = async () => {
  if (staticClient) {
    return staticClient;
  }

  const instance = buildAxiosInstance();

  // const metadata = new API.ServerMetadata('33.0.0', API.ServerTypes.HORIZON);
  // const server = API.OnmsServer.newBuilder(baseUrl).setName('Demo').setAuth(authConfig).setMetadata(metadata).build()
  // const http = new Rest.AxiosHTTP(server, instance);

  const wrapper = new AxiosWrapper(instance);

  staticClient = await new Client(wrapper).connect('Demo', baseUrl, username, password);

  return staticClient;
}
