import React from 'react'

function Book(props) {
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: props.book.imageWidth, height: props.book.imageHeight, backgroundImage: `url(${props.book.imageUrl})`
            }}>
        </div>
        <div className="book-shelf-changer">
          <select>
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
          <div className="book-authors">{`${name}`}</div>
        );
      }))}

    </div>
  );
}

export default Book;
