import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'

import { BookCase } from './BookCase'
import { BookSearch } from './BookSearch'

import { Route, Link } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }

  onExitSearch = () => {
    this.setState((prevState) => ({
      showSearchPage: false
    }))
  }

  onEnterSearch = () => {
    this.setState((prevState) => ({
      showSearchPage: true
    }))
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
}

export default BooksApp
