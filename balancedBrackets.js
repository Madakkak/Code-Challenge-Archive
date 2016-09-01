/*

Balanced Brackets
Given a string, return true if it contains all balanced parenthesis (), curly-brackets {}, and square-brackets [].

Examples
Input                    Output
str:
"(x + y) - (4)"          true
str:
"(x + y) - (4)"          true
str:
"(((10 ) ()) ((?)(:)))"  true
str:
"[{()}]"                 true
str:
"(50)("                  false
str:
"[{]}"                   false

*/

function isBalanced (str) {
  var open = ['(', '{', '['],
      close = [')', '}', ']'],
      stack = [];

  return str.split('').reduce((acc, char) => {
    if (!acc) return false;
    open.forEach(op => {
      if (op === char) stack.push(op)
    });
    close.forEach((cl, i) =>
      acc = cl === char ? stack.pop() === open[i] : acc
    );
    return acc;
  }, true) && stack.length === 0;
}
