/*

Even Occurrence

Find the first item that occurs an even number of times in an array. Remember to handle multiple even-occurrence items and return the first one. Return null if there are no even-occurrence items.

Examples
Input                            Output
arr:
[ 1, 3, 3, 3, 2, 4, 4, 2, 5 ]    2
arr:
[ "cat", "dog", "dig", "cat" ]   "cat"

*/


function evenOccurrence (arr) {
  var arrc = arr.slice();
  return arr.reduce((res, el, f) => {
    var l = arr.lastIndexOf(el);
    if (res) return res;
    if (~l && l !== f) {
      arrc.splice(l, 1), arrc.splice(f, 1);
      return ~arrc.indexOf(el) ?
          evenOccurrence(arrc) : el
    }
  }, null) || null;
}

