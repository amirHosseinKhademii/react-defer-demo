import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  from,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";

const httpLink = new HttpLink({ uri: "graphql/" });

const deferHandlerLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    const res = response as any;

    if (res.path && res.path[0] === "book") {
      const retObj = {
        ...response,
        data: {
          book: {
            __typename: "Book",
            id: 0,
            title: null,
            comments: [...response.data?.comments],
          },
        },
      };

      return retObj;
    }

    return response;
  });
});

const client = new ApolloClient({
  link: from([deferHandlerLink, httpLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          book: {
            merge(existing, incoming, { mergeObjects }) {
              // console.log({ existing, incoming });
              return mergeObjects(existing, incoming);
            },
          },
        },
      },
    },
  }),
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ApolloProvider {...{ client }}>
    <App />
  </ApolloProvider>
);
