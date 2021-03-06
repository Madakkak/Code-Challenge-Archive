/*

Array Basics
In this exercise you should make your answer variable for each function equal to what the function comment is asking you for. If you want to get fancy you can skip setting the answer variable itself and simply return the value we are expecting.

Your Code Should Pass:

describe("The Problem", function() {
  it("exists", function() {
    expect( basicAccessing() ).toBe("beta")
  })
})
describe("The Problem", function() {
  it("exists", function() {
    expect( basicAccessing2() ).toBe(3)
  })
})
describe("The Problem", function() {
  it("exists", function() {
    expect( nestedArrays() ).toBe(10)
  })
})

*/

function basicAccessing(){
  //For this function, make answer be equal to the second item in the array.
  var myArray = ["alpha","beta","charlie", "delta"]
  var answer = myArray[1];

  return answer
}

function basicAccessing2(){
  //For this function, make answer be equal to the third item in the array.
  var myArray = [1,2,3,4]
  var answer = myArray[2];

  return answer
}

function nestedArrays(){
  //For this function, make answer be equal to the second item in the third nested array.
  var myArray = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]]
  var answer = myArray[2][1];

  return answer
}
