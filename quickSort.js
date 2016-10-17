/*

QuickSort
Quicksort (sometimes called partition-exchange sort) is an efficient sorting algorithm. When implemented well, it can be about two or three times faster than its main competitors, merge sort and heapsort.

It is a comparison sort, meaning that it can sort items of any type for which a “less-than” relation is defined.

Quicksort uses these steps.

Choose any element of the array to be the pivot. There are multiple ways of selecting a pivot; explore the options and note their advantages.

Divide all other elements (except the pivot) into two partitions.

All elements less than the pivot must be in the first partition.

All elements greater than the pivot must be in the second partition.

Recursively apply the above process to the two partitions

Join the first sorted partition, the pivot, and the second sorted partition.

The best pivot creates partitions of equal length (or lengths differing by 1). The worst pivot creates an empty partition (for example, if the pivot is the first or last element of a sorted array).

Extra Credit: Perform the sort in place.
Watch how at: https://www.youtube.com/watch?v=ywWBy6J5gz8

NOTE: DO NOT use JavaScript’s built-in sorting function (Array.prototype.sort).

Your Code Should Pass:

var should = chai.should();

describe('quickSort', function() {
  it('should exist', function(){
    should.exist(quickSort);
  });

  it('should be a function', function() {
    quickSort.should.be.a.Function;
  });

  it('should return an array', function() {
    var result = quickSort([1]);
    should.exist(result);
    result.should.be.an.instanceof(Array);
  });

  it('should return an array with a single number', function(){
    var result = quickSort([1]);
    result.should.be.eql([1]);
  });

  it('should handle an empty array', function(){
    var result = quickSort([]);
    result.should.be.eql([]);
  });

  it('should sort a short array of integers', function(){
    var result = quickSort([Number.MAX_SAFE_INTEGER,8,7,3,6,9,2,4,5,1]);
    result.should.be.eql([1,2,3,4,5,6,7,8,9,Number.MAX_SAFE_INTEGER]);
  });

  it('should handle repeated elements', function(){
    var result = quickSort([8,7,3,3,9,2,4,5,1]);
    result.should.be.eql([1,2,3,3,4,5,7,8,9]);
  });

  it('should handle reversely sorted array', function(){
    var result = quickSort([9,8,7,6,5,4,3,2,1]);
    result.should.be.eql([1,2,3,4,5,6,7,8,9]);
  });

  it('should not use Array.sort', function(){
    var _sort = Array.prototype.sort;
    Object.defineProperty(Array.prototype, 'sort', {enumerable: false,
      value: function () {
        should.fail(null, null, 'Array.sort called! That\'s cheating.',null);
      }
    });
    var result = quickSort([8,7,3,6,9,2,4,5,1]);
    Object.defineProperty(Array.prototype, 'sort', {enumerable: false,
      value: _sort
    });
  });

  it('should sort an enormous array of random integers', function(){
    var input = [];
    var sorted;
    var n = 100000;
    for (var i = 0; i < n; i++) {
      var number = Math.floor(Math.random() * n);
      input.push(number);
    }
    sorted = input.slice().sort(function (a,b) {return a - b;}); // sort numerically, not lexicographically
    var result = quickSort(input);

    // using .eql can cause an n-line error message to print, so we do it by hand
    for (var i = 0; i < n; i++) {
      result[i].should.equal(sorted[i]);
    }
  });
});

*/

function quickSort(arr) {
  // Low and high indeces we'll
  // be moving around to find
  // the ideal pivot point
  var low = 0;
  var high = arr.length - 1;

  // Swapped determines whether
  // we move the high index or the
  // low index after comparing values.
  // This is toggled every time we
  // swap high and low
  var swapped = false;

  // Base case:
  // Determine if there are 2 or more
  // elements in arr
  if (arr.length > 1) {

    // Loop as long as the low and high
    // indeces don't meet
    while(low !== high) {
      // If the value at the high index
      // is less than value at the low,
      //   swap the high and low values
      if (arr[high] < arr[low]) {
        var temp = arr[high];
        arr[high] = arr[low];
        arr[low] = temp;

        // Toggle swapped to flip whether
        // we're moving the high or low index
        swapped = !swapped;
      } else {
        // We didn't swap values, so
        // move the high or low index
        // depending on the swapped boolean
        if (swapped) {
          low++;
        } else {
          high--;
        }
      }
    }

    // Recursive case:
    // High and low indeces have met and we
    // have swapped everything we can so far.
    // Using the index where high and low meet
    // as the pivot,
    //   Quicksort the array to the left
    //   of the pivot, then concat the pivot,
    //   and finally concat the results of
    //   quicksorting the array to the right
    return quickSort(arr.slice(0, low))
      .concat(arr[low],
              quickSort(arr.slice(low+1)));
  }

  // There are less than 2 elements in arr -
  // Return either the one element in arr
  // or an empty array otherwise
  return arr.length === 1 ? arr : [];
}


//
//TL;DR
//
function quickSort(arr) {
  var low = 0, swapped = 0, high = arr.length - 1;
  if (arr.length > 1) {
    while(low !== high) {
      if (arr[high] < arr[low]) {
        var temp = arr[high];
        arr[high] = arr[low];
        arr[low] = temp;
        swapped ^= 1;
      } else {
        if (swapped) low++;
        else         high--;
      }
    }
    return quickSort(arr.slice(0, low))
      .concat(arr[low],
              quickSort(arr.slice(low+1)));
  }
  return arr.length === 1 ? arr : [];
};
