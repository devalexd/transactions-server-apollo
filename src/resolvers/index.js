const {
  getTransactionByIdQueryResolver,
  getAllTransactionsQueryResolver,
  createTransactionMutationResolver,
  replaceTransactionMutationResolver,
} = require('./transaction-resolvers');

module.exports = (targetCollection) => ({
  Query: {
    getTransactionById: getTransactionByIdQueryResolver(targetCollection),
    getAllTransactions: getAllTransactionsQueryResolver(targetCollection),
  },
  Mutation: {
    createTransaction: createTransactionMutationResolver(targetCollection),
    replaceTransaction: replaceTransactionMutationResolver(targetCollection),
  },
});
