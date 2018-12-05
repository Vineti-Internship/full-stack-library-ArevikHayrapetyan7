import React from 'react';
import Req from '../helper_request';

export const BContext = React.createContext();

export class BookProvider extends React.Component {
  constructor() {
    super();
  
    this.getBook = this.getBook.bind(this);
    this.addBook = this.addBook.bind(this);
    this.deleteBook = this.deleteBook.bind(this);
    this.changeBook = this.changeBook.bind(this);
    this.getCreatedBooks = this.getCreatedBooks.bind(this);
    this.getBooks = this.getBooks.bind(this);
   
  }

  state = {
    autorsBooks: [],
    Books: [],
    book: null
  };

  getBook = async (id) => {
    try {
      const result = await Req.get(`/books/${id}`);
      const book = await result.json();
      this.setState({ book });
    } catch (error) {
      console.log(`ERROR: ${error.message}`);
    }
  }

  addBook = async (book) => {
    try {
      await Req.post('/books', book, 'book');
      await this.getAllBooks();
    } catch (error) {
      console.log(`ERROR: ${error.message}`);
    }
  }

  deleteBook = async (e, book) => {
    e.preventDefault();

    const confirmation = window.confirm(`Do you want to remove ${book.title} book?`);
    if (confirmation) {
      try {
        await Req.delete(`/books/${book.id}`)
        await this.getAllBooks();
        window.alert("book is  deleted");
      } catch (error) {
        console.log(`ERROR: ${error.message}`);
      }
    } else {
      window.alert("it has been closed!");
    }
  }

changeBook = async (book) => {
    try {
      await Req.update(`/books/${book.id}`, book, 'book');
    } catch (error) {
      console.log(`ERROR: ${error.message}`);
    }
  }

  getCreatedBooks = async (autorId) => {
    try {
      const result = await Req.get(`/autors/${autorId}`);
      const { books } = await result.json();
      this.setState({
        autorsBooks: books
      });
    } catch (error) {
      console.log(`ERROR: ${error.message}`);
    }
  }

  getBooks = async () => {
    try {
      const result = await Req.get('/books');
      const books = await result.json();
      this.setState({
        Books: books
      });
    } catch (error) {
      console.log(`ERROR: ${error.message}`)
    }
  }

  render() {
    return (
      <BContext.Provider value={
        {
          title:this.state.title,
          body:this.state.body,
          addBook: this.addBook,
          getBook: this.getBook,
          changeBook: this.changeBook,
          deleteeBook: this.deleteBook,
          getBooks: this.getBooks,
          getCreatedBooks: this.getCreatedBooks
        }}>
        {this.props.children}
      </BContext.Provider>
    )
  }
};