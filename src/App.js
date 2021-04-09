import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'

import { BookCase } from './BookCase'
import { BookSearch } from './BookSearch'

import { Route, Link } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={()=>(
          <div>
            <BookCase />
            <div className="open-search">
            <Link to="/search">
              <button>Add a book</button>
            </Link>
            </div>
          </div>
        )} />
        <Route path='/search' render={({history}) =>(
          <BookSearch
            onExitSearch={() => {
              history.push('/');
            }}
          />
        )} />
      </div>
    )
  }

  componentDidMount() {
    const books = BooksAPI.getAll();
    console.log(books);
  }
}

export default BooksApp
