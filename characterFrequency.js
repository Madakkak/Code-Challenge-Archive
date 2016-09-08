/*

Character Frequency
Write a function that takes as its input a string and returns an array of arrays as shown below sorted in descending order by frequency and then by ascending order by character.

Examples
Input          Output
string:
"aaabbc"       [ [ "a", 3 ], [ "b", 2 ], [ "c", 1 ] ]
string:
"mississippi"  [ [ "i", 4 ], [ "s", 4 ], [ "p", 2 ], [ "m", 1 ] ]
string:
""             [ ]

*/

function characterFrequency(string) {
  // Start by splitting the string into an array
  // of characters, then
  // iterate over that array using reduce.
  // Next, define a custom sorting function
  // that first attempts to sort by occurrence count
  // and then, if tied, sorts alphabetically
  return string
    .split('')
    .reduce(function(freqs, char) {
      // For each character,
      //   attempt to find it in our
      //   results so far.
      var i = freqs.findIndex(function(val) {
        return val[0] === char;
      })

      if (i !== -1) {
        // If we've already found this char before,
        //   increment the occurrence count
        freqs[i][1] += 1;
      } else {
        // Otherwise, add this char to our
        // results with an initial occurrence
        // count of 1
        freqs.push([char, 1]);
      }

      // Return the results each time so
      // we accumulate the occurrences as we
      // progress through the array
      return freqs;
    }, [])
    .sort(function(val1, val2) {
      // First check if the occurrences
      // of the two characters differ
      if (val2[1] - val1[1]) {
        // If they do, then sort them
        // numerically like we normally do
        return val2[1] - val1[1];
      } else if (val1[0] > val2[0]) {
        // The occurrence counts were equal,
        // so now we need to sort them
        // alphabetically. Return 1 if
        // the first character is greater
        // than the second
        return 1;
      } else if (val1[0] < val2[0]) {
        // If the second character is greater
        // alphabetically than the first,
        //   return -1
        return -1;
      } else {
        // If the characters are the same,
        //   return 0
        return 0;
      }
    })
}


//
// Compact Solution
// This solution is the equivalent of the above
// with no comments, written with brevity in mind
// Study this if you'd like to learn a few shortcuts
//
function characterFrequency (string) {
  return string.split('').reduce((freqs, char) => {
    var i = freqs.findIndex(val => val[0] === char)
    if (~i) freqs[i][1]++
    else freqs.push([char, 1])
    return freqs;
  }, []).sort((val1, val2) =>
      val2[1] - val1[1] ?
      val2[1] - val1[1] :
      val1[0] > val2[0] ?  1 :
      val1[0] < val2[0] ? -1 : 0 )
}
