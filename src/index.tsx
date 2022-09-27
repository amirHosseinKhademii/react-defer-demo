import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "graphql/",
  cache: new InMemoryCache({
    // typePolicies: {
    //   Query: {
    //     fields: {
    //       books: {
    //         merge(existing, incoming, { mergeObjects }) {
    //           console.log({ existing, incoming });
    //           return mergeObjects(existing, incoming);
    //         },
    //       },
    //     },
    //   },
    // },
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
