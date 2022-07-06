const { ApolloServer, gql } = require("apollo-server");
const collectionsData = require("./collections.json");
const productsData = require("./products.json");

const typeDefs = gql`
  type Collection {
    id: ID!
    title: String!
    description: String
    isPublished: Boolean!
  }

  type Price {
    amount: Int!
    currency: String!
  }

  enum Category {
    apparel
    accessories
    stationery
  }

  type Product {
    id: ID!
    category: Category!
    name: String!
    brand: String
    inventory: Int!
    price: Price
    collections: [Collection!]!
  }

  type Query {
    collections: [Collection!]!
    products: [Product!]!
    productById(id: ID!): Product
  }
`;

const resolvers = {
    Query: {
      collections: () => {
        return collectionsData;
      },
      products: () => {
        return productsData;
      },
    },
  };

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});