import React from 'react'

import { shelfTypes, shelfTypeLabel } from './ShelfTypeHelper'

function Book(props) {
  let defaultShelfValue = "none";
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
              // TODO: Review hard coded setting of width and height
              width: 128,
              height: 190,
              backgroundImage: `url(${(props.book.imageLinks) ? props.book.imageLinks.smallThumbnail : '#'})`
            }}>
        </div>
        <div className="book-shelf-changer">
          <select
            value={(props.book.shelf) ? (props.book.shelf) : defaultShelfValue}
            onChange={(e) => props.onChangeShelf(props.book, e.target.value)}>
              <option value="move" disabled>Move to...</option>
              { shelfTypes().map((shelfType) => {
                  return <option key={shelfType} value={shelfType}>{shelfTypeLabel(shelfType)}</option>})}
              <option value={defaultShelfValue}>None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{props.book.title}</div>
      {(props.book.authors) && (
          props.book.authors.map(name => {
            return <div key={name} className="book-authors">{`${name}`}</div>; }
        ))}
    </div>
  );
}

export default Book;
