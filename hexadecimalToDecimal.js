/*

Hexadecimal to Decimal
Build a function that converts a hexadecimal number to a base 10 number. Do not use toString or parseInt.

For more on hexadecimal numbers: https://en.wikipedia.org/wiki/Hexadecimal

Examples
Input   Output
hex:
"ff"    255
hex:
"2329"  9001
hex:
"10"    16

*/

var hexChars = {
  a: 10,
  b: 11,
  c: 12,
  d: 13,
  e: 14,
  f: 15
}

function hexToDec (hex) {
  return hex.split('').reduceRight((sum, char, i) => {
    var power = hex.length - i - 1;
    var digit = char in hexChars ?
      hexChars[char] :
      Number(char);

    return sum + Math.pow(16, power) * digit;
  }, 0);
}
