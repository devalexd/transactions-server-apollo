const { dateScalar } = require('./scalar-resolvers');

const {
  getTransactionByIdQueryResolver,
  getAllTransactionsQueryResolver,
  createTransactionMutationResolver,
  replaceTransactionMutationResolver,
} = require('./transaction-resolvers');

module.exports = (targetCollection) => ({
  Date: dateScalar,
  Query: {
    getTransactionById: getTransactionByIdQueryResolver(targetCollection),
    getAllTransactions: getAllTransactionsQueryResolver(targetCollection),
  },
  Mutation: {
    createTransaction: createTransactionMutationResolver(targetCollection),
    replaceTransaction: replaceTransactionMutationResolver(targetCollection),
  },
});
