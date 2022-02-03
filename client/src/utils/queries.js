import { gql } from "@apollo/client";

export const GET_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      searchInquiries {
        firstName
        dateOfBirth
        lastName
        image
      }
    }
  }
`;

export const GET_USERS = gql`
  query users {
    users {
      _id
      username
      email
    }
  }
`;

export const GET_SEARCH_INQUIRY = gql`
  query searchInquiry($id: ID) {
    searchInquiry(id: $id) {
      _id
      firstName
      lastName
      dateOfBirth
      image
    }
  }
`;
