import axios from "axios";
import { useEffect, useState } from "react";
import BookCreate from "./companents/BookCreate";
import BookList from "./companents/BookList";

function App() {
  const [books, setBooks] = useState([]);

  const createBook = async (title) => {
    const response = await axios.post("http://localhost:3001/books", {
      title,
    });
    const uptadeBooks = [...books, response.data];
    setBooks(uptadeBooks);
  };

  const fetchBooks = async () => {
    const response = await axios.get("http://localhost:3001/books");

    setBooks(response.data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const deleteBookById = async (id) => {
    await axios.delete(`http://localhost:3001/books/${id}`);

    const uptadeBooks = books.filter((book) => {
      return book.id !== id;
    });
    setBooks(uptadeBooks);
  };

  const editBookById = async (id, newTitle) => {
    const response = await axios.put("http://localhost:3001/books/" + id, {
      title: newTitle,
    });

    const uptadeBooks = books.map((book) => {
      if (book.id === id) {
        return { ...book, ...response.data };
      }
      return book;
    });
    setBooks(uptadeBooks);
  };

  return (
    <div className="app">
      <h1>Reading List</h1>
      <BookList books={books} onDelete={deleteBookById} onEdit={editBookById} />
      <BookCreate onCreate={createBook} />
    </div>
  );
}

export default App;
