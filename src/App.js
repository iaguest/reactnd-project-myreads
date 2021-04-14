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

  onChangeShelf = (changedBook, newShelf) => {
    console.log("In BooksApp:onChangeShelf...")
    this.setState((prevState) => ({
      books: prevState.books.map(
        (book) => (book.id === changedBook.id) ? {...book, shelf: newShelf} : book)
    }));
  }

  render() {
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
            currentBooks = { this.state.books }
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
    console.log('In App:componentDidMount...')
    BooksAPI.getAll().then(books=>{
      this.setState((prevState)=>({
        books: books,
      }))
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('In App:componentDidUpdate...')
    // Update first changed component
    prevState.books.forEach((prevBook, index) => {
      let currentBook = this.state.books[index];
      if (currentBook.shelf !== prevBook.shelf) {
        BooksAPI.update(prevBook, currentBook.shelf);
        return;
      }
    });
  }
}

export default BooksApp
