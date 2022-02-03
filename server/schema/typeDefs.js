const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String
    
  }

  type Auth {
    token: ID!
    user: User
  }

  type SearchInquiry{
    _id: ID
    firstName: String
    lastName:String
    dateOfBirth: String
    image: String
  }

  type Query {
    users: [User]
    user(username: String!): User
    searchInquiry(_id:ID): SearchInquiry
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addSearchInquiry(firstName: String, lastName: String, dateOfBirth:String, image: String): SearchInquiry
    updateSearchInquiry(firstName: String, lastName: String, dateOfBirth:String, image: String): SearchInquiry
    removeSearchInquiry(firstName: String, lastName: String, dateOfBirth: String, image: String): User
  }
`;
// still need an update and delete
module.exports = typeDefs;
