import React from 'react'

import * as BooksAPI from './BooksAPI'

import Book from './Book'

export class BookSearch extends React.Component {

  state = {
    query: '',
    queryResults: []
  }

  updateQuery = query => {
    this.setState(() => ({
      query: query.trim()
    }))
  }

  searchResultsUpdatedForCurrentBooksState = (searchResults) => {
    const bookIdToBookMap = new Map(searchResults.map(book => ([book.id, book])));
    this.props.currentBooks.forEach(currentBook => {
      const book = bookIdToBookMap.get(currentBook.id);
      if (book !== undefined) {
        book.shelf = currentBook.shelf;
      }
    });
    return Array.from(bookIdToBookMap.values());
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('In BookSearch:componentDidUpdate');
    if (prevState.query !== this.state.query) {
      BooksAPI.search(this.state.query)
        .then(books => {
            this.setState((prevState)=>({
              queryResults: this.searchResultsUpdatedForCurrentBooksState(books)
          }))})
        .catch(e => {
            this.setState((prevState)=>({
              queryResults: []
          }))
        });
    }
  }

  render() {

    return (
        <div className="search-books">
          <div className="search-books-bar">
            <button className="close-search" onClick={() => { this.props.onExitSearch() } }>Close</button>
            <div className="search-books-input-wrapper">
              {/*
                NOTES: The search from BooksAPI is limited to a particular set of search terms.
                You can find these search terms here:
                https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                you don't find a specific author or title. Every search is limited by search terms.
              */}
              <input type="text" placeholder="Search by title or author" onChange={ (event) => this.updateQuery(event.target.value) }/>

            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              { (this.state.queryResults && this.state.queryResults.length > 0) && (
                  this.state.queryResults.map((book) => {
                    return <li key={book.id}><Book book={book} onChangeShelf = { this.props.onChangeShelf }/></li>}))}
            </ol>
          </div>
        </div>
    );
  }
}
