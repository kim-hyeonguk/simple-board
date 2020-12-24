const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const { MONGODB } = require('./config.js');



const server = new ApolloServer({
  typeDefs,
  resolvers
});


mongoose
  .connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
  .then(() => {
    console.log('MongoDB is Connected');
    return server.listen({ port:5000 });
  }).then(res => {
  console.log(`Server running at ${res.url}`)
});
