import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        
      }
    }
  }
`;
// rockysemail@email.com rocky
// 
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// SHOULD GO IN PROFILE
export const ADD_SEARCH_INQUIRY = gql`
  mutation addSearchInquiry(
    $firstName: String
    $lastName: String
    $dateOfBirth: String
    $image: String
  ) {
    addSearchInquiry(
     
      firstName: $firstName
      lastName: $lastName
      dateOfBirth: $dateOfBirth
      image: $image
    ) {
      firstName
      lastName
      dateOfBirth
      image
    }
  }
`;

export const UPDATE_SEARCH_INQUIRY = gql`
mutation updateSearchInquiry {
  updateSearchInquiry(_id:ID firstName: String lastName: String dateOfBirth: String image: String) {
    _id
    firstName
    lastName
    dateOfBirth
    image
  }
}
`;

export const REMOVE_SEARCH_INQUIRY = gql`
mutation removeSearchInquiry {
  removeSearchInquiry(_id: ID) {
    firstName
    lastName
    dateOfBirth
    image
  }
}
`;
