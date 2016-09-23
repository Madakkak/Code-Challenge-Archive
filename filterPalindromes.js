/*

Filter Palindromes
Given an array of words (array of strings), return all words that are palindromes.

Examples
Input                          Output
words:
[ "word", "Ana", "race car" ]  [ "Ana", "race car" ]

*/

function filterPalindromes (words) {
  return words.filter(word =>
    word.toLowerCase()
        .replace(' ', '') ===
    word.toLowerCase()
        .replace(' ', '')
        .split('')
        .reverse()
        .join('')
  )
}
