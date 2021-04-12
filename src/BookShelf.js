import React from 'react'

import Book from './Book'

function BookShelf(props) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.name}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
            { props.books.map((book) => {
              return <li><Book book={book} onChangeShelf = { props.onChangeShelf }/></li> })}         
        </ol>
      </div>
    </div>
)}

export default BookShelf;