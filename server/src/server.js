import express from 'express';
import graphqlHTTP from 'express-graphql';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { importSchema } from 'graphql-import';
import { makeExecutableSchema } from 'graphql-tools';
import boom from '@hapi/boom';
import log from './utils/log';

import './models/todo';

import indexRouter from './routes/index';
import todosRouter from './routes/todos';

import './config/connection';

import resolvers from './graphql/resolvers';

const app = express();

app.use(cors());

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/api/todos', todosRouter);

// The path is './src/schema.graphql' because the node process starts from the root
const typeDefs = importSchema('./src/graphql/schema.graphql');
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  }),
);

app.use((req, res, next) => {
  next(boom.notFound().output);
});

// eslint-disable-next-line
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500);
  res.send(err);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  log(`Server listening on port ${PORT}`);
});