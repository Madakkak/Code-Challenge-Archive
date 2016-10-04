/*

Insertion Sort
Insertion sort is a basic sorting algorithm.

Insertion sort iterates over an array, growing a sorted array behind the current location. It takes each element from the input and finds the spot, up to the current point, where that element belongs (in constant space). It does this until it gets to the end of the array.

Insertion sort should be implemented as a stable sort. This means that equal elements
should retain their relative order. Numbers, as primitives, give us no way to check this,
so we’ll be sorting objects with a value field, on which they will be sorted, like so:

[{value: 10}, {value: 5, order: 1}, {value: 5, order: 2}]

A stable sort must return {value: 5, order: 1}, {value:5, order: 2} in that order.

EXTRA CREDIT:

Refactor your sort to (optionally) take an explicit comparator function as its second argument, so that callers can define arbitrary ways to sort elements. See Array.prototype.sort for an example of how this works (excerpt below):

If comparator(a, b) is less than 0, sort a to a lower index than b, i.e. a comes first.
If comparator(a, b) returns 0, leave a and b unchanged with respect to each other, but sorted with respect to all different elements.
If comparator(a, b) is greater than 0, sort b to a lower index than a.

If no comparator is given, just sort the elements using < or >.

You've got Helpers! (click to view code)
myHelper(x, y)
Examples
Input                                                                        Output
array:
[ { "value": 3 }, { "value": 1 }, { "value": 2 } ]                           [ { "value": 1 }, { "value": 2 }, { "value": 3 } ]
array:
[ { "value": 10 }, { "value": 5, "order": 1 }, { "value": 5, "order": 2 } ]  [ { "value": 5, "order": 1 }, { "value": 5, "order": 2 }, { "value": 10 } ]

*/

function insertionSort (array, comp) {
  return array.reduce(function(prevSorted, a, j) {
    // Haven't added anything to our sorted array yet,
    // so use the first element
    if (!prevSorted.length) {
      return [a];
    }

    // Build a sorted array
    return prevSorted.reduce(function(newSorted, b, i) {
      if (newSorted.length < prevSorted.length + 1) {
        if ((comp && comp(a.value, b.value) < 0) ||
             a.value < b.value) {
          newSorted.splice(i, 0, a);
        } else if ((comp && comp(a.value, b.value) === 0) ||
                    a.value === b.value) {
          newSorted.splice(i + 1, 0, a);
        } else if (i === prevSorted.length - 1) {
          newSorted.push(a);
        }
      }
      return newSorted;
    }, prevSorted.slice());
  }, []);
}

// // TL;DR
function insertionSort (array, comp) {
  return array.reduce((sorted, el, j) => {
    return sorted.length ?
      sorted.reduce((newSorted, sval, i) => {
        if (newSorted.length < sorted.length + 1) {
          if ((comp && comp(el.value, sval.value) < 0) ||
              el.value < sval.value)
            newSorted.splice(i, 0, el);
          else if ((comp && comp(el.value, sval.value) === 0) ||
                    el.value === sval.value)
            newSorted.splice(i + 1, 0, el);
          else if (i === sorted.length - 1)
            newSorted.push(el);
        }
        return newSorted;
      }, sorted.slice()) : [el];
  }, []);
}
