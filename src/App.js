import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route, Link } from 'react-router-dom'

import './App.css'

import { BookCase } from './BookCase'
import { BookSearch } from './BookSearch'


class BooksApp extends React.Component {
  state = {
    books: [],
  }

  // Modifies existing an book or adds a new one if it's not in the current list
  onChangeShelf = (book, newShelf, isExistingBook=true) => {
    console.log(`In BooksApp:onChangeShelf for book title: ${book.title}, newShelf: ${newShelf}, isNewBook: ${isExistingBook}}...`)
    this.setState((prevState) => ({
      books: (isExistingBook)
             ? prevState.books.map((item) => (item.id === book.id) ? {...item, shelf: newShelf} : item)
             : [...prevState.books, {...book, shelf: newShelf} ]
    }));
  }

  render() {
    console.log("In BooksApp:render...")
    return (
      <div className="app">
        <Route exact path='/' render={()=>(
          <div>
            <BookCase
              books = { this.state.books }
              onChangeShelf = { this.onChangeShelf }
            />
            <div className="open-search">
            <Link to="/search">
              <button>Add a book</button>
            </Link>
            </div>
          </div>
        )} />
        <Route path='/search' render={({history}) =>(
          <BookSearch
            getCurrentBooks = { () => this.state.books }
            onChangeShelf = { this.onChangeShelf }
            onExitSearch={() => {
              history.push('/');
            }}
          />
        )} />
      </div>
    )
  }

  componentDidMount() {
    console.log('In BooksApp:componentDidMount...')
    BooksAPI.getAll().then(books=>{
      this.setState((prevState)=>({
        books: books,
      }))
    });
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('In BooksApp:componentDidUpdate...')

    const numPrevBooks = prevState.books.length;
    const numCurrentBooks = this.state.books.length;

    if (numPrevBooks === numCurrentBooks) {
      console.log("Handle modified book by calling update for first matching item id");
      prevState.books.forEach((prevBook, index) => {
        let currentBook = this.state.books[index];
        if (currentBook.shelf !== prevBook.shelf) {
          BooksAPI.update(prevBook, currentBook.shelf);
          return;
        }
      });
    } else if (numPrevBooks === numCurrentBooks - 1) {
      console.log("Handle new book by calling update for last current book item");
      const newBook = this.state.books[numCurrentBooks - 1];
      BooksAPI.update(newBook, newBook.shelf);
    }
  }
}

export default BooksApp
