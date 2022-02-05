import { gql } from "@apollo/client";

export const GET_USER = gql`
  query user {
    user {
      _id
      username
      email
      searchInquiries {
        _id
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

export const GET_ALL_SEARCH_INQUIRIES =gql
`query searchInquiry {
  searchInquiry{
    _id
    firstName
    lastName
    dateOfBirth
    image
  }
}
`
