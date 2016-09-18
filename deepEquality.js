/*

Deep Equality
Write a function that, given two objects, returns whether or not the two are deeply equivalent–meaning the structure of the two objects is the same, and so is the structure of each of their corresponding descendants.

DO NOT use JSON.stringify.

Your Code Should Pass:

var should = chai.should();

describe('deepEquals()', function(){

  it('should exist', function(){
    should.exist(deepEquals);
  });
  it('should be a function', function(){
    deepEquals.should.be.a.Function;
  });
  it('should take at least two arguments', function(){
    deepEquals.length.should.be.above(1);
  });
  it('should return a result', function(){
    var result = deepEquals({}, {});
    should.exist(result);
  });
  it('should return a boolean', function(){
    deepEquals({}, {}).should.be.a.Boolean;
  });
  it('should return true for two empty objects', function(){
    deepEquals({}, {}).should.be.true;
  });
  it('distinguishes between objects and arrays', function() {
    var a = { foo: [2, { bar: {}}]}
    var b = { foo: [2, { bar: []}]}
    deepEquals(a,b).should.be.false;
  });
  it('should use deep equality', function(){
    var a = { foo: 1 };
    var b = { foo: '1' };
    deepEquals(a,b).should.be.false;
  });
  it('should return true for two objects with the same keys and values', function(){
    var a = { foo: 'bar' };
    var b = { foo: 'bar' };
    deepEquals(a, b).should.be.true;
  });
  it('should return false for two objects with the same keys and but different values', function(){
    var a = { foo: 'bar' };
    var b = { foo: 'pow' };
    deepEquals(a, b).should.be.false;
  });
  it('should return false for two objects with different number of keys', function(){
    var a = { foo: 'bar' };
    var b = { foo: 'bar', biz: 'baz' };
    deepEquals(a, b).should.be.false;
  });
  it('should return false for two objects with different number of keys', function(){
    var a = { foo: 'bar', biz: 'baz' };
    var b = { foo:'bar' };
    deepEquals(a, b).should.be.false;
  });
  it('should return true for similar nested object properties', function(){
    var a = { foo: 1, b: { c: 3 } };
    var b = { foo: 1, b: { c: 3 } };
    deepEquals(a,b).should.be.true;
  });
  it('should return false for dissimilar nested object properties', function(){
    var a = { foo: 1, b: { c: 3 } };
    var b = { foo: 1, b: { c:'potato' } };
    deepEquals(a,b).should.be.false;
  });
  it('should return false for dissimilar nested object properties', function(){
    var a = { foo: 1, b: { c: 'potato'} };
    var b = { foo: 1, b: { c: 3 } };
    deepEquals(a,b).should.be.false;
  });
  it('should return true for similar excessively nested object properties', function(){
    var a = { foo: 1, b: { c: { d: { e: 'potato' } } } };
    var b = { foo: 1, b: { c: { d: { e: 'potato' } } } };
    deepEquals(a,b).should.be.true;
  });
  it('should return true for similar excessively nested object properties', function(){
    var a = { b: { c: { d: { e: 'potato' } } }, foo: 1 };
    var b = { foo: 1, b: { c: { d: { e: 'potato' } } } };
    deepEquals(a,b).should.be.true;
  });
});

*/

deepEquals = function(a, b){

  // If the objects have a different # of properties,
  // they aren't equal so return
  if (Object.keys(a).length !== Object.keys(b).length) {
    return false;
  } else if (Array.isArray(a) && !Array.isArray(b) ||
             Array.isArray(b) && !Array.isArray(a)) {
    // If a is an array and b isn't or vice versa,
    // then they aren't equal
    return false;
  }
   else {
    // For every property in a, check that the equivalent
    // key/value is in b
    // If it's an object, recurse to check equality of
    // the nested properties
    for(var k in a) {
      if (typeof a[k] === 'object'  && typeof b[k] === 'object') {
        return deepEquals(a[k], b[k]);
      } else if (a[k] !== b[k]) {
        return false;
      }
    }
  }
  return true;
};
