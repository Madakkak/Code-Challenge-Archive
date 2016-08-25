/*

Alphabetic Anagrams
In an array of every possible anagram of a given string, what index would the original string occupy?

Consider an anagram as any sequence of letters. For any word with at least two different letters, there are other words composed of the same letters but in a different order (for instance, RESISTANCE/ANCESTRIES, which happen to both be dictionary words; for our purposes “SISTANERCE” is also a “word” composed of the same letters as these two).

Given a word, return its index number, starting at 1 (not 0), for some reason.

Here is the catch: Your function should be able to accept any word 20 letters or less in length (possibly with some letters repeated), and take no more than 5000 milliseconds to run.

Examples

Input      Output
string:
"BAEBEE"   12
string:
"ABBS"     1
string:
"BABS"     4
string:
"ARCTIC"   42
string:
"STARK"    92

*/

// Solution Strategy:
//
// This solutions calculates the input string's anagram position without
// actually finding any anagrams.
//
// Total permutations of a word = number of letters factorial (n!)
// To account for letter repeats, we divide (n!) by the (r!) where
// r is the # of times the character repeats. We do this for every character
// that repeats more than once.
//
// Example: "BAEBEE"
// Total = 6! / (3! * 2!) = 60
//
// If we divide the total number permutations by the number of letters in the string,
// we get the total number of permutations starting with each letter
//
// Example: 60 / 6 = 10 word permutations per letter (PPL)
// In other words, there will be 10 words that start with 'A'
//
// Now we compare each letter in the original string to the first, and
// add PPL for each character that comes before the first alphabetically,
//
// "BAEBEE"
// 10 perms per letter
// 'A' comes before B
// totalIndex = 0 + 10 = 10
//
// Next, we do the same but for a new string with the first spliced out
//
// "AEBEE"
// Total perms = 5! / 3! = 20
// 4 perms per letter
// None of the other letters come before 'A'
// totalIndex = 10 + 0 = 10
//
// "EBEE"
// Total perms = 4! / 3! = 4
// 1 perm per letter
// 'B' comes before 'E'
// totalIndex = 10 + 1 = 11
//
// "BEE"
// Total perms = 3! / 2! = 3
// 1 perm per letter
// None of the other letters come before 'B'
// totalIndex = 11 + 0 = 11
//
// "EE"
// Total perms = 2! / 2! = 1
// Since there's only one permutation, it can't affect our totalIndex
//
// DONE -> return totalIndex = 11 + 1 = 12

function anagramPosition (string) {
  let chars = string.split('');

  // Use an IIFE to recursively calculate the position of input string in
  // an array of anagrams. Add 1 to the final result, for some reason.
  return (function calcPosition(str, totalIndex) {

    // Base case: a word must be at least two letters, so just return the final position
    if (str.length < 2) return totalIndex;

    // Calculate the number of word permutations per letter = total number of permutations / number of letters in string
    // Total permutations is (number of letters) factorial
    let totalPerms = factorial(str.length);

    // Find the character frequency of letters in this string
    const freqs = characterFrequency(str);

    // Iterate over the array of character frequencies, each time dividing the total permutations by
    // the (number of occurrences) factorial. This gives us the final total number of permutations
    // while accounting for character repeats
    totalPerms = freqs.reduce((total, currentFreq) => {
      return total /= factorial(currentFreq[1]);
    }, totalPerms);

    // The number of permutations beginning with each individual letter in the input string
    const permsPerLetter = totalPerms / str.length;

    // Grab the first letter of the string
    const firstChar = str.splice(0, 1);

    // Iterate over what's left of the string
    // If any letter comes before firstChar alphabetically, increase our total position
    // by the amount of permsPerLetter
    totalIndex = str.reduce((sum, char) =>
      char < firstChar ? sum + permsPerLetter : sum,
      totalIndex
    );

    // Finally, recurse with what's left of the string after removing the first character
    return calcPosition(str, totalIndex);
  })(chars, 0) + 1;
}

// Helper function to calculate the factorial of a number
// EXAMPLE: 5! = 5*4*3*2*1 = 120
function factorial(num) {
    // If the number is less than 0, reject it.
    if (num < 0) return -1;

    // If the number is 0, its factorial is 1.
    if (num == 0) return 1;

    var total = num;

    while (num-- > 2) {
        total *= num;
    }

    return total;
}

// Use a previous toy problem solution to calculate
// number of times characters repeat in the input string
function characterFrequency (string) {
  return string.reduce((freqs, char) => {
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
