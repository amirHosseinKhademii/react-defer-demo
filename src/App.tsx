import { useQuery } from "@apollo/client";
import React from "react";
import { GetBooks } from "./queries/books";

function App() {
  const [book, setBook] = React.useState<any>(null);

  const { data } = useQuery(GetBooks, {
    onCompleted: (data) => {
      setBook((prev: any) => ({
        ...data.book,
        title: prev?.title ?? data.book.title,
      }));
    },
  });

  if (book === null) return <div>Loading...</div>;

  return (
    <div>
      Book title:
      <div>{book.title}</div>
      {book.comments ? (
        <div>
          Comments:
          <div>
            {data?.book.comments.map((c: any) => (
              <div key={c.body}>{c.body}</div>
            ))}
          </div>
        </div>
      ) : (
        <div>Loading comments</div>
      )}
    </div>
  );
}

export default App;
