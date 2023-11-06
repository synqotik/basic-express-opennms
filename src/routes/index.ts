import express from 'express'

import { getInterfaces } from '../controllers/ipInterfaces';
import { getNodeById, getNodes } from '../controllers/nodes';
import { getWelcome } from '../controllers/welcome';

export const getRoutes = () => {
  const router = express.Router()

  router.get('/', getWelcome);
  router.get('/nodes', getNodes);
  router.get('/node/:id', getNodeById);
  router.get('/interfaces', getInterfaces);

  return router
}
