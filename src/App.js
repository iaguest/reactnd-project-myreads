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

  onChangeShelf = (id, newShelf) => {
    this.setState((prevState) => ({
      books: prevState.books.map(
        // TODO: Address potential scaling issue O(N)
        (book) => (book.id === id) ? {...book, shelf: newShelf} : book)
    }))
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
