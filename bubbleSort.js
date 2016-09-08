/*

BubbleSort V.2
Bubble sort is considered the most basic sorting algorithm in Computer Science. It works by starting at the first element of an array and comparing it to the second element:

If the first element is greater than the second element, it swaps the two.
It then compares the second to the third, and the third to the fourth, and so on.
In this way, the largest values ‘bubble’ to the end of the array.
Once it gets to the end of the array, it starts over and repeats the process until the array is sorted numerically.
Implement a function that takes an array and sorts it using this technique.

NOTE: DO NOT use JavaScript’s built-in sorting function (Array.prototype.sort).

Examples

Input                        Output
[ 20, -10, -10, 2, 4, 299 ]  [ -10, -10, 2, 4, 20, 299 ]

*/

function bubbleSort (input) {
  // Make a copy of input so we don't mutate it
  var arr = input.slice();

  // We'll use this as temporary storage when
  // swapping two values
  var temp;

  // For every element in arr,
  //   Compare that element to the subsequent element
  //   If the first is greater than the second, swap
  // After each element is compared to each other element,
  // repeat the process for the next element,
  // but one less time
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j + 1 < arr.length - i; j++) {
      if (arr[j] > arr[j + 1]) {
        temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }

  // Return our sorted array
  return arr;
}
