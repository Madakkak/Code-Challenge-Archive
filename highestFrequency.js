/*

Highest Frequency
Given a string of only lowercase alphabet characters, find the character that occurs the highest number of times. If any characters tie, return them all in alphabetical order.

Examples
Input        Output
str:
"abcdc"      "c"
str:
"occurring"  "cr"
str:
"xxyyzz"     "xyz"

*/

function highestFreq (str) {
  const freqs = characterFrequency(str);
  const highestCount = freqs[0][1];

  return freqs.reduce((result, pair) =>
    pair[1] === highestCount ?
      result.concat(pair[0]) :
      result
  , '')
}

function characterFrequency (string) {
  return string
    .split('')
    .reduce((freqs, char) => {
      var i = freqs.findIndex(val => val[0] === char)
      if (~i) freqs[i][1]++
      else freqs.push([char, 1])
      return freqs;
    }, [])
    .sort((val1, val2) =>
       val2[1] - val1[1] ?
       val2[1] - val1[1] :
       val1[0] > val2[0] ?  1 :
       val1[0] < val2[0] ? -1 : 0 )
}
