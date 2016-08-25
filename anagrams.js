/*

Anagrams
Given two strings, return true if one string is an anagram of another.

Examples
Input         Output
a:
"silent"
b:
"listen"      true
a:
"torchwood"
b:
"doctor who"  true
a:
"why?"
b:
"why not?"    false

*/

function isAnagram (a, b) {
  // Declare aArr and bArr which take
  // the respective strings and
  // remove all white characters,
  // split into an array,
  // and sort
  var aArr = a
    .replace(' ', '')
    .split('')
    .sort();
  var bArr = b
    .replace(' ', '')
    .split('')
    .sort();

  // To be an anagram, every character in
  // both arrays need to be the same
  return aArr.every(function(char, i) {
    return char === bArr[i];
  })
}

// TL;DR

function isAnagram (a, b) {
  var aArr = a.replace(' ', '').split('').sort();
  var bArr = b.replace(' ', '').split('').sort();
  return aArr.every((char, i) => char === bArr[i])
}
