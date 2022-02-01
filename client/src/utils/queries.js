import { gql } from "@apollo/client";

// export const GET_USER = gql`
//   query user {
//     user {
//       _id
//       username
//       email
//     }
//   }
// `;

export const GET_SEARCH_INQUIRY= gql`
  query searchInquiry($id:ID) {
    searchInquiry(id:$id) {
      _id
      firstName
      lastName
      dateOfBirth
      image
    }
  }
`;
