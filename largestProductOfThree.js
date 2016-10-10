/*

Largest Product of Three
Write a function that accepts an array of integers and returns the largest product possible from three of those numbers.

Examples
Input            Output
array:
[ 2, 1, 3, 7 ]   42
array:
[ 0, 2, 3 ]      0

*/

function largestProductOfThree (array) {
  //
  // Sort input array in descending order
  //
  var sorted = array.sort(function(a, b) { return b-a; });
  var len = sorted.length;

  //
  // If last two values produce a larger product
  // (when negative) than second aand third,
  // make those last two the second and third largest
  //
  if ( len >= 3 &&
       sorted[0] > 0 &&
       sorted[len-1]*sorted[len-2] > sorted[1]*sorted[2] ) {
    sorted = [sorted[0]].concat([sorted[len-1], sorted[len-2]])
  } else {
    sorted = sorted.splice(0,3);
  }

  // Return the largest product
  return sorted.reduce(function(product, x) {
    return product*x;
  });
};
