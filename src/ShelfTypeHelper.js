const currentlyReadingString = "currentlyReading";
const wantToReadString = "wantToRead";
const readString = "read";

export function shelfTypes() {
  return [currentlyReadingString, wantToReadString, readString]
}

export function shelfTypeLabel(shelfType) {
  switch (shelfType) {
    case currentlyReadingString:
      return "Currently Reading";
    case wantToReadString:
      return "Want To Read";
    case readString:
      return "Read";
    default:
      throw RangeError("Unhandled shelfType")
  }
}
