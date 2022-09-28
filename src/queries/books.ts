import { gql } from "@apollo/client";

export const GetBooks = gql`
  query GetBooks {
    book {
      id
      title
      ... on Book @defer {
        comments {
          id
          body
        }
      }
    }
  }
`;
