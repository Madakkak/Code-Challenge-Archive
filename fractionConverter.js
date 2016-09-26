/*

Fraction Converter
Write a function that takes a number as its argument and returns a string that represents that number’s simplified fraction.
Whole numbers and mixed fractions should be returned as improper fractions.

Examples
Input      Output
number:
0.5        "1/2"
number:
3          "3/1"
number:
2.5        "5/2"
number:
2.75       "11/4"

*/

function fractionConverter (number) {
  var numer = number;
  var denom = 1;
  var numArr = number.toString().replace('.', '').split('');
  num = numArr.join('');
  var decimals = numArr.slice(numArr.indexOf('.') + 1).length;

  console.log("num =",num);
  console.log("decimals =",decimals);
  numer *= Math.fround(Math.pow(10, decimals));
  denom *= Math.pow(10, decimals);

  while (numer % 2 === 0 && denom % 2 === 0) {
    numer /= 2;
    denom /= 2;
  }

  while (numer % 5 === 0 && denom % 5 === 0) {
    numer /= 5;
    denom /= 5;
  }

  return numer + "/" + denom;
};
