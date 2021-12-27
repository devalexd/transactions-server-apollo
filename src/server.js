const { port } = require('./config/config');
const { ApolloServer } = require('apollo-server');
const { getTypeDefs } = require('./utils/graphql');

const typeDefs = getTypeDefs();

const { createConnection } = require('./config/client');
const connectResolvers = require('./resolvers');

const myPlugin = {
  // Fires whenever a GraphQL request is received from a client.
  async requestDidStart(requestContext) {
    console.log('Request started! Query:\n' +
      requestContext.request.query);
    console.log(JSON.stringify(requestContext.request.variables));

    return {
      // Fires whenever Apollo Server will parse a GraphQL
      // request to create its associated document AST.
      async parsingDidStart(requestContext) {
        console.log('Parsing started!');
      },

      // Fires whenever Apollo Server will validate a
      // request's document AST against your GraphQL schema.
      async validationDidStart(requestContext) {
        console.log('Validation started!');
      },

    }
  },
};

const createServer = async () => {
  const targetCollection = await createConnection();
  const resolvers = connectResolvers(targetCollection);
  const server = new ApolloServer({ typeDefs, resolvers, plugins: [myPlugin] });
  server.listen(port).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
};

module.exports = {
  createServer,
};