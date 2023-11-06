import dotenv from 'dotenv';
import express, { Express } from 'express';
import { getRoutes } from './src/routes';

dotenv.config();

const port = process.env.PORT;

const app: Express = express();

// Only parse query parameters into strings, not objects
app.set('query parser', 'simple');

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({'message': err.message});

  return;
});

app.use('/', getRoutes());

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
