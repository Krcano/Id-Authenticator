const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String
    searchInquiries: [SearchInquiry]
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
    user: User
    searchInquiry(_id:ID): SearchInquiry
    searchInquiries:[SearchInquiry]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addSearchInquiry(firstName: String, lastName: String, dateOfBirth:String, image: String): SearchInquiry
    updateSearchInquiry(_id:ID!, firstName: String, lastName: String, dateOfBirth:String, image: String): SearchInquiry
    removeSearchInquiry(_id:ID!):  SearchInquiry
  }
`;
// still need an update and delete
module.exports = typeDefs;
