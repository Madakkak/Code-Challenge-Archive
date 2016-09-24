/*

Flatten
Given an array of arrays, return all elements in a single array. You must use recursion.

Hint: Use Array.isArray(elem) to see if something is an array.

Examples
Input                                Output
arrays:
[ [ 10 ], [ 20, 30 ], [ 40 ] ]       [ 10, 20, 30, 40 ]
arrays:
[ 1, 2, [ 3 ], 4, [ 5, [ 6 ], 7 ] ]  [ 1, 2, 3, 4, 5, 6, 7 ]

*/

function flatten (arrays) {
  // Starting with an empty array,
  //   concatenate each value onto
  //   an accumulating flat array
  return arrays.reduce(function(flat,val) {
    // If val is an array, recurse and concatenate
    // the resulting array to our current flat array
    if (Array.isArray(val)) {
      return flat.concat(flatten(val));
    }

    // Non-array values should be concatenated
    // as is
    return flat.concat(val);
  }, [])
}

// Compact Solution

function flatten (arrays) {
  return arrays.reduce((flat,val) =>
    Array.isArray(val) ?
      flat.concat(flatten(val)) :
      flat.concat(val)
    , [])
}
