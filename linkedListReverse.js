/*

Linked List Reverse
Write a function that reverses a linked list.

Explanation:

Given the below linked list:

A -> B -> C -> D -> E -> null

Return:

E -> D -> C -> B -> A -> null

‘Constraint 1: Do this in linear time’

‘Constraint 2: Do this in constant space’

‘Constraint 3: Do not mutate the original nodes by adding any new properties’

You've got Helpers! (click to view code)
Node(val)
Your Code Should Pass:

var should = chai.should();

var stringify = function(list) {
  var res = [];
  while(list !== null) {
    res.push(list.value);
    list = list.next;
  }
  return res.join("");
}


describe('reverseLinkedList', function(){
  it('should be exist', function(){
    should.exist(reverseLinkedList);
  });

  it('should be a function', function(){
    reverseLinkedList.should.be.a.Function;
  });

  it('should return something', function() {
    var result = reverseLinkedList(Node('A'));
    should.exist(result);
  });

  it('should return a reversed list', function(){
    var list = Node('A');
    var nodeB = list.next = Node('B');
    var nodeC = nodeB.next = Node('C');
    var nodeD = nodeC.next = Node('D');
    var nodeE = nodeD.next = Node('E');

    var expected = 'EDCBA';
    var result = stringify(reverseLinkedList(list));

    expected.should.be.equal(result);
  });

  it('should return the same list when the list has only one node', function(){
    var list = Node('A');

    var expected = 'A';
    var result = stringify(reverseLinkedList(list))

    expected.should.be.equal(result);
  });

});

*/

var reverseLinkedList = function(linkedList) {
  var front = linkedList; // Start at head of list
  var back = null; // End at null
  var cur, temp;

  while(front.next !== back) {
    cur = front;

    while(cur.next !== back) {
      cur = cur.next;
    }

    // Save the last node we just found
    back = cur;

    // Swap
    temp = front.value;
    front.value = back.value;
    back.value = temp;

    // Move the front forward
    front = front.next;
  }

  return linkedList;
};
