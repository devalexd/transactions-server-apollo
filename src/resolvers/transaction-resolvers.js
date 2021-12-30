const { Decimal128 } = require("bson");
const { ObjectId } = require('mongodb');

const getTransactionByIdQueryResolver = (targetCollection) => (
  async (_, args) => {
    return targetCollection('transactions').findOne({
      _id: new ObjectId(args._id),
    })
    .then((transaction) => ({
      success: true,
      document: {
        ...transaction,
        _id: args._id,
        price: transaction.price.toString(),
        amount: transaction.amount.toString(),
        tax: transaction.tax.toString(),
        cost: transaction.cost.toString(),
      },
    }))
    .catch((e) => ({
      success: false,
      message: e.message,
    }));
  }
);

const getAllTransactionsQueryResolver = (targetCollection) => (
  async (_, args) => {
    return targetCollection('transactions').find({})
    .sort({ date: -1, store: 1 })
    .toArray()
    .then((transactions) => ({
      success: true,
      documents: transactions.map((transaction) => ({
        ...transaction,
        _id: transaction._id.toHexString(),
        price: transaction.price.toString(),
        amount: transaction.amount.toString(),
        tax: transaction.tax.toString(),
        cost: transaction.cost.toString(),
      })),
    }))
    .catch((e) => ({
      success: false,
      message: e.message,
    }));
  }
);

const createTransactionMutationResolver = (targetCollection) => (
  async (_, args) => {
    return targetCollection('transactions').insertOne({
      ...args,
      date: new Date(args.date),
      price: Decimal128.fromString(args.price),
      amount: Decimal128.fromString(args.amount),
      tax: Decimal128.fromString(args.tax),
      cost: Decimal128.fromString(args.cost),
    })
    .then((response) =>
      response?.acknowledged
      ?
      ({
        success: true,
        insertedId: response.insertedId.toHexString(),
      })
      :
      ({
        success: false,
        message: response.message,
      })
    )
    .catch((e) => ({
      success: false,
      message: e.message,
    }));
  }
);

const replaceTransactionMutationResolver = (targetCollection) => (
  async (_, args) => {
    const { _id, ...rest } = args;
    return targetCollection('transactions').replaceOne(
      {
        _id: new ObjectId(args._id),
      },
      {
        ...rest,
        date: new Date(args.date),
        price: Decimal128.fromString(args.price),
        amount: Decimal128.fromString(args.amount),
        tax: Decimal128.fromString(args.tax),
        cost: Decimal128.fromString(args.cost),
      }
    )
    .then((response) =>
      response?.acknowledged
      ?
      ({
        success: true,
        upsertedId: response.upsertedId.toHexString(),
      })
      :
      ({
        success: false,
        message: response.message,
      })
    )
    .catch((e) => ({
      success: false,
      message: e.message,
    }));
  }
);

module.exports = {
  getTransactionByIdQueryResolver,
  getAllTransactionsQueryResolver,
  createTransactionMutationResolver,
  replaceTransactionMutationResolver,
};
