import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'

import { BookCase } from './BookCase'
import { BookSearch } from './BookSearch'

import { Route, Link } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    books: [],
    shelfTypes: new Set(),
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
              shelfTypes = { this.state.shelfTypes }
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
            books = { this.state.books }
            onExitSearch={() => {
              history.push('/');
            }}
          />
        )} />
      </div>
    )
  }

  componentDidMount() {
    console.log('In componentDidMount...')
    BooksAPI.getAll().then(books=>{
      this.setState((prevState)=>({
        books: books,
        shelfTypes: new Set(books.map((book) => { return book.shelf; }))
      }))
    });
  }
}

export default BooksApp
