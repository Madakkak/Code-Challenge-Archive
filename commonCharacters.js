/*

Common Characters
Write a function that accepts two strings as arguments, and returns only the characters that are common to both strings.

Your function should return the common characters in the same order that they appear in the first argument. Do not return duplicate characters and ignore whitespace in your returned string.

Example: commonCharacters('acexivou', 'aegihobu')

Returns: 'aeiou'

Your Code Should Pass:

var should = chai.should();

describe('Common Characters', function(){
  it('returns common characters', function(){
    commonCharacters('abc', 'abc').should.equal('abc');
  });

  it('returns common characters', function(){
    commonCharacters("What is love?", "Baby don't hurt me").should.equal('hatoe');
  });

  it('returns common characters', function(){
    commonCharacters('Riding on a buffalo makes me more approachable', 'so what').should.equal('oash');
  });

  it('returns empty string', function(){
    commonCharacters('', 'No more').should.equal('');
  });

  it('returns empty string', function(){
    commonCharacters('No more', '').should.equal('');
  });

  it('returns empty string', function(){
    commonCharacters('', '').should.equal('')
  });
});

*/

commonCharacters = function(string1, string2) {
  if (string1 && string2) {
    // First split the first string into an array,
    // then iterate over that array using reduce,
    // find all unique common characters,
    // and finally join the array back into a string
    return string1
      .split('')
      .reduce(function(results, char) {
        // For each character in string1,
        // add to results if:
        // 1) string2 also includes char
        // 2) the char is not a whitespace
        // 3) our results don't already contain this char
        if (string2.includes(char) &&
            char !== ' ' &&
            !results.includes(char)) {
          results.push(char);
        }

        // Return results, which accumulates the
        // final string containing all
        // unique commmon characters
        return results;
      }, []).join('')
  }

  // If string1 or string2 is undefined,
  //   return an empty string
  return '';
}

//
// TL;DR
//
commonCharacters = function(string1, string2) {
  return (string1 && string2) ?
    string1.split('').reduce((results, char) =>
      string2.includes(char) &&
      char !== ' ' &&
      !results.includes(char) ?
        results.concat(char)  : results
  , []).join('') : '';
};
