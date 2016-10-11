/*

Last Index Of
Write the function lastIndexOf. Similar to indexOf, it takes in an array and a target value, and returns the index of the target value. However, as you might expect, when the target value occurs multiple times in the array, it should return the last instance of that value, rather than the first.

#####Constraints:
Solve using either higher-order functions (i.e. map, reduce, filter), OR recursion. No loops allowed!

Examples
Input                    Output
array:
[ 1, 2, 3 ]
target:
2                        1
array:
[ 4, 5, 5, 6 ]
target:
5                        2
array:
[ "a", "b", "c", "c" ]
target:
"c"                      3

*/

function lastIndexOf (array, target) {
  // The reduceRight function works
  //just like reduce, except it
  // starts at the end of the array
  return array.reduceRight((foundIndex, val, i) => {
    // If we've previously found an occurrence,
    //   keep returning that index
    if (foundIndex !== -1)
      return foundIndex;

    // If the current value matches the target,
    //   return the index we've found it at
    if (val === target)
      return i;

    // Otherwise keep returning -1
    return -1;
  }, -1)
}

// TL;DR Solution

function lastIndexOf (array, target) {
  return array.reduceRight((foundIndex, val, i) =>
    foundIndex !== -1 ? foundIndex :
    val === target    ? i : -1, -1)
}
