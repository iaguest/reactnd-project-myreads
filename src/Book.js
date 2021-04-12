import React from 'react'

function Book(props) {
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            // TODO: Review hard coded setting of width and height
            width: 128, height: 190, backgroundImage: `url(${props.book.imageLinks.smallThumbnail})`
            }}>
        </div>
        <div className="book-shelf-changer">
          <select value={props.book.shelf} onChange={(e) => props.onChangeShelf(props.book.id, e.target.value)}>
            <option value="move" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{props.book.title}</div>
        {props.book.authors.map((name => {
          return (
            <div key={name} className="book-authors">{`${name}`}</div>
          );
        }))}
    </div>
  );
}

export default Book;
