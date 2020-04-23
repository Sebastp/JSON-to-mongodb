var path = require('path')
var mergeGraphql = require('merge-graphql-schemas')

//loads files automaticly so you don't have to import anything
const modelsArray = mergeGraphql.fileLoader(path.join(__dirname, './*.model.*'))

let allModelsObj = {} 
//transform array of objects into one object of models
modelsArray.forEach(modelObj => {
  allModelsObj = { ...allModelsObj, ...modelObj }
})

module.exports = allModelsObj
