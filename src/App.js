import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'

import { BookCase } from './BookCase'
import { BookSearch } from './BookSearch'

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
        {this.state.showSearchPage ? (
          <BookSearch onExitSearch= { this.onExitSearch }/>
        ) : (
          <BookCase />
        )}
        <div className="open-search">
          <button onClick={() => { this.onEnterSearch() } }>Add a book</button>
        </div>
      </div>
    )
  }
}

export default BooksApp
