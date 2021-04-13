const currentlyReadingString = "currentlyReading";
const wantToReadString = "wantToRead";
const readString = "read";
export const noneString = "none";

export function isShelfTypeNone(shelfType) {
  return shelfType === noneString;
}

export function shelfTypes() {
  return [currentlyReadingString, wantToReadString, readString, noneString]
}

export function shelfTypeLabel(shelfType) {
  switch (shelfType) {
    case currentlyReadingString:
      return "Currently Reading";
    case wantToReadString:
      return "Want To Read";
    case readString:
      return "Read";
    case noneString:
      return "None";
    default:
      throw RangeError("Unhandled shelfType")
  }
}
