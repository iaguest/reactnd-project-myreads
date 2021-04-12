// Camel case to title case function
// Adapted code from https://stackoverflow.com/questions/7225407/convert-camelcasetext-to-sentence-case-text
export function camelCaseToTitleCase(camelCaseString) {
  let result = camelCaseString.replace( /([A-Z])/g, " $1" );
  return result.charAt(0).toUpperCase() + result.slice(1);
}
