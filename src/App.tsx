import { useQuery } from "@apollo/client";
import { GetBooks } from "./queries/books";

function App() {
  const { data, loading } = useQuery(GetBooks, {
    onCompleted: (data) => console.log(data),
  });

  return <div>test</div>;
}

export default App;
