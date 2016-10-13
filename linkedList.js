/*

Linked List
Implement a linked-list

Your Code Should Pass:

var should = chai.should();

describe("LinkedList", function() {
  it('should exist', function(){
    should.exist(LinkedList);
  });

  it('should be a function', function(){
    LinkedList.should.be.a.Function;
  });

  it("should be implemented using the pseudoclassical pattern", function(){
    LinkedList.prototype.addToTail.should.be.a.Function;
    LinkedList.prototype.removeHead.should.be.a.Function;
    LinkedList.prototype.contains.should.be.a.Function;
  });

  it("should accept an initial value", function(){
    var list = new LinkedList(1);
    list.tail.value.should.equal(1);
    list.head.value.should.equal(1);
    list.addToTail(2);
    list.head.next.value.should.equal(2);
  })

  it("should designate a new tail when new nodes are added", function(){
    var list = new LinkedList();
    list.addToTail(4);
    list.tail.value.should.equal(4);
    list.addToTail(5);
    list.tail.value.should.equal(5);
  });

  it("should remove the head from the list when removeHead is called", function(){
    var list = new LinkedList();
    list.addToTail(4);
    list.addToTail(5);
    list.head.value.should.equal(4);
    list.removeHead();
    list.head.value.should.equal(5);
  });

  it("should remove the head and tail from the list when removeHead is called and there is only one element present", function(){
    var list = new LinkedList(4);
    list.head.value.should.equal(4);
    list.tail.value.should.equal(4);
    list.removeHead();
    should.not.exist(list.head);
    should.not.exist(list.tail);
  });

  it("should contain a value that was added", function(){
    var list = new LinkedList(4);
    list.addToTail(5);
    list.contains(4).should.be.true;
    list.contains(5).should.be.true;
    list.contains(6).should.be.false;
  });

  it("should not contain a value that was removed", function(){
    var list = new LinkedList();
    list.addToTail(4);
    list.addToTail(5);
    list.removeHead();
    list.contains(4).should.be.false;
  });

});

*/

// Instantiates a new list
  // by setting the head and tail to a
  // new node with the initial value
  var LinkedList = function (initialValue) {
    this.head = this.tail = new Node(initialValue);
  };

  // Add a new value to the linked list
  LinkedList.prototype.addToTail = function(val) {
    var node = new Node(val);
    if (this.head.value === null) {
      // The list isn't yet initialized ->
      // set head and tail values
      this.head = this.tail = node;
    } else {
      // First set the current tail's next
      // pointer to point to the new node
      this.tail.next = node;

      // Next have the tail point to the
      // new node
      this.tail = node;
    }
  }

  // Remove an element from the head of the list
  LinkedList.prototype.removeHead = function() {
    if (this.head.next !== null) {
      // The list has elements other than head,
      // so remove the head and move the pointer
      this.head = this.head.next
    } else {
      // Either list is empty or head
      // is all that's left
      this.head = this.tail = null;
    }
  }

  // Determing if the linked list contains the target value
  LinkedList.prototype.contains = function(val) {
    // Starting at the list head,
    // Keep going through next nodes until either
    // we've found the target val or we reach the end
    var node = this.head, found = false;
    while (node !== null) {
      if (node.value === val) {
        found = true;
        break;
      }
      node = node.next;
    }
    return found;
  }

  // Node class to store node value as well
  // as next node pointer
  var Node = function(val, next) {
    this.value = val || null;
    this.next = next || null;
  }
