/*

Iterative Fib
Given a number n, write an iterative (not recursive) solution to find the nth number in the fibonacci sequence.

Examples
Input  Output
n:
1      1
n:
2      1
n:
3      2
n:
7      13

*/

iterativeFib = function(n) {
  // Initial sequence values
  var firstPrev = 1;
  var secondPrev = 0;
  var current = 1;

  if (n >= 1) {
    for (var i = 2; i <= n; i++) {
      // current val is the sum of the previous two
      current = firstPrev + secondPrev;

      // current - 2 updates to current - 1
      secondPrev = firstPrev;

      // current - 1 updates to current
      firstPrev = current;
    }

    // Once we reach n, return it's fib value
    return current;
  } else {
    // Any other input should
    // just return 0
    return 0;
  }
};
