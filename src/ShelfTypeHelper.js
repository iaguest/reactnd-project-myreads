const noneShelfString = "none"

export function isShelfTypeNone(shelfType) {
  return shelfType === noneShelfString;
}

export function shelfTypes() {
  return ["currentlyReading", "wantToRead", "read", noneShelfString]
}

export function shelfTypeLabel(shelfType) {
  return camelCaseToTitleCase(shelfType);
}

// Camel case to title case function
// Adapted code from https://stackoverflow.com/questions/7225407/convert-camelcasetext-to-sentence-case-text
function camelCaseToTitleCase(camelCaseString) {
  let result = camelCaseString.replace( /([A-Z])/g, " $1" );
  return result.charAt(0).toUpperCase() + result.slice(1);
}
