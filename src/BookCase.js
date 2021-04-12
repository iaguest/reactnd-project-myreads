import React from 'react'

import BookShelf from './BookShelf'
import { camelCaseToTitleCase } from './utils'

export class BookCase extends React.Component {
  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            { Array.from(this.props.shelfTypes).map((shelfType) => {
              return <BookShelf
                        name={ camelCaseToTitleCase(shelfType) }
                        books={this.props.books.filter((book) => book.shelf === shelfType)} />
            })}
          </div>
        </div>
      </div>
    );
  }
}