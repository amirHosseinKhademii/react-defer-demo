import { gql } from "@apollo/client";

export const GetBooks = gql`
  query GetBooks {
    books {
      id
      title
      ... on Book @defer {
        comments {
          id
        }
      }
    }
  }
`;
