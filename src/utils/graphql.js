const path = require('path');
const { loadFilesSync } = require('@graphql-tools/load-files');
const { mergeTypeDefs } = require('@graphql-tools/merge');

const getTypeDefs = () => {
  const typesArray = loadFilesSync(path.join(__dirname, '../type-defs'));
  return mergeTypeDefs(typesArray);
};

module.exports = {
  getTypeDefs,
};
