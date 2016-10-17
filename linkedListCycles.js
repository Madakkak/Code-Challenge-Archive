/*

Linked List Cycles
Write a function that returns true if a linked list contains a cycle, or false if it terminates somewhere.

Explanation:

Generally, we assume that a linked list will terminate in a null next pointer, as follows:

 A -> B -> C -> D -> E -> null
A ‘cycle’ in a linked list is when traversing the list would result in visiting the same nodes over and over.

This is caused by pointing a node in the list to another node that already appeared earlier in the list. Example:

 A -> B -> C
      ^    |
      |    v
      E <- D
'Constraint 1: Do this in linear time'

'Constraint 2: Do this in constant space'

'Constraint 3: Do not mutate the original nodes in any way'

You've got Helpers! (click to view code)
Node(val)
Your Code Should Pass:

var should = chai.should();

describe('hasCycle', function(){
  it('should be exist', function(){
    should.exist(hasCycle);
  });

  it('should be a function', function(){
    hasCycle.should.be.a.Function;
  });

  it('should take at least one argument', function(){
    hasCycle.length.should.be.above(0);
  });

  it('should return something', function() {
    var result = hasCycle(Node('A'));
    should.exist(result);
  });

  it('should return a boolean', function() {
    var result = hasCycle(Node('A'));
    result.should.be.a.Boolean;
  });

  it('should return false for a linked list with only 1 node that points to null', function(){
    // aka, A -> null
    var nodeA = Node('A');
    hasCycle(nodeA).should.be.false;
  });

  it('should return true for a linked list with only 1 node that points to itself', function(){
    // aka, A -> A -> A -> etc...
    var nodeA = Node('A');
    nodeA.next = nodeA;
    hasCycle(nodeA).should.be.true;
  });

  it('should return false for a non-cyclical linked list of size 2', function(){
    // aka, A -> B -> null
    var nodeA = Node('A');
    var nodeB = nodeA.next = Node('B');
    hasCycle(nodeA).should.be.false;
  });

  it('should return true for a cyclical linked list of size 2', function(){
    // aka, A -> B -> A -> B -> etc...
    var nodeA = Node('A');
    var nodeB = nodeA.next = Node('B');
    nodeB.next = nodeA;
    hasCycle(nodeA).should.be.true;
  });

  it('should return false for a non-cyclical linked list of size 3', function(){
    // aka, A -> B -> C -> null
    var nodeA = Node('A');
    var nodeB = nodeA.next = Node('B');
    var nodeC = nodeB.next = Node('C');
    hasCycle(nodeA).should.be.false;
  });

  it('should return true for a cyclical linked list of size 3', function(){
    // aka, A -> B -> C -> A -> B -> etc...
    var nodeA = Node('A');
    var nodeB = nodeA.next = Node('B');
    var nodeC = nodeB.next = Node('C');
    nodeC.next = nodeA;
    hasCycle(nodeA).should.be.true;
  });

  it('should return false for a medium sized non-cyclical linked list', function(){
    // aka, start -> tail0 -> tail1 -> ... -> tail8 -> null
    var startNode = Node('start');
    var currentNode = startNode;
    for(var i = 0; i < 9; i++){
      currentNode.next = Node('tail' + i);
      currentNode = currentNode.next;
    }
    hasCycle(startNode).should.be.false;
  });

  it('should return true for a medium sized cyclical linked list', function(){
    // aka, start -> tail0 -> tail1 -> ... -> tail8 -> start
    var startNode = Node('start');
    var currentNode = startNode;
    for(var i = 0; i < 9; i++){
      currentNode.next = Node('tail' + i);
      currentNode = currentNode.next;
    }
    // have the tail of the linked list point to the start
    currentNode.next = startNode;
    hasCycle(startNode).should.be.true;
  });

  it('should return false for a large sized non-cyclical linked list', function(){
    // aka, start -> tail0 -> tail1 -> ... -> tail99998 -> tail99999 -> null
    var startNode = Node('start');
    var currentNode = startNode;
    // one. million nodes!! wahahahaha
    for(var i = 0; i < 999999; i++){
      currentNode.next = Node('tail' + i);
      currentNode = currentNode.next;
    }
    hasCycle(startNode).should.be.false;
  });

  it('should return true for a large sized cyclical linked list', function(){
    // aka, start -> tail0 -> tail1 -> ... -> tail99998 -> tail99999 -> start
    var startNode = Node('start');
    var currentNode = startNode;
    // one. million nodes!! wahahahaha
    for(var i = 0; i < 999999; i++){
      currentNode.next = Node('tail' + i);
      currentNode = currentNode.next;
    }
    // have the tail of the linked list point to the start
    currentNode.next = startNode;
    hasCycle(startNode).should.be.true;
  });

  it('should do this in linear time', function(){
    var startTime, endTime, randoPointer;
    var startNode = Node('start');
    var currentNode = startNode;

    for(var i = 0; i < 999999; i++){
      currentNode.next = Node('tail' + i);
      currentNode = currentNode.next;
      //grab random node to later point the back to
      if(i == 54643){randoPointer = currentNode;}
    }

    currentNode.next = randoPointer;

    startTime = new Date();
    hasCycle(startNode).should.be.true;
    endTime = new Date();

    (endTime - startTime).should.be.below(50);
  });

});

*/

var hasCycle = function(lili) {
  // Initialize slow and fast pointers
  var slow = lili;
  var fast = lili;

  // Keep traversing the list so long as we
  // don't hit an end.
  // We only need to check that fast and fast.next is non-null since
  // it will hit an end sooner than the slow pointer
  while (fast && fast.next) {
    // Fast pointer traverses two nodes at a time
    fast = fast.next.next

    // If at any point the slow and fast pointers
    // point to the same node, then we've detected a cycle
    if (slow === fast) return true;

    // Slow pointer traverses one node at a time
    slow = slow.next
  }

  // Hit the end of the list, therefore it's not cyclic
  return false;
}
