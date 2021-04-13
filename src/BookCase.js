import React from 'react'

import BookShelf from './BookShelf'
import { shelfTypes, shelfTypeLabel } from './ShelfTypeHelper'

export class BookCase extends React.Component {
  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            { shelfTypes().map((shelfType) => {
              return <BookShelf
                        key={shelfType}
                        name={ shelfTypeLabel(shelfType) }
                        books={ this.props.books.filter((book) => book.shelf === shelfType) }
                        onChangeShelf = { this.props.onChangeShelf } />
            })}
          </div>
        </div>
      </div>
    );
  }
}