/*

Hash Table
Finish this implementation of a Hash Table. It should have the methods insert(), retrieve(), and remove(). Your hash table need not resize itself, but shall handle collisions.

Your Code Should Pass:

var should = chai.should();

describe('makeHashTable', function(){
  it('should exist', function(){
    should.exist(makeHashTable);
  });
  it('should be a function', function(){
    makeHashTable.should.be.a.Function;
  });
  it('should return a hash table', function(){
    var hashTable = makeHashTable();
    should.exist(hashTable);
    hashTable.should.be.an.Object;
  });
  it('should return different instances of hash tables each time', function(){
    var hashTable1 = makeHashTable();
    should.exist(hashTable1);

    var hashTable2 = makeHashTable();
    should.exist(hashTable2);
    hashTable1.should.not.be.equal(hashTable2);
    // `makehashTable()` should create a new hash table object instance
    // everytime but it's not!
  });
});

describe('hashTable', function(){
  describe('#insert', function(){
    it('should exist as a method of hashtable instances', function(){
      var hashTable = makeHashTable();
      should.exist(hashTable.insert);
    });
    it('should take exactly two arguments. a key and a value', function(){
      var hashTable = makeHashTable();
      hashTable.insert.length.should.equal(2);
    });
    it('should not throw an error with valid input', function(){
      (function(){
        var hashTable = makeHashTable();
        hashTable.insert('keanu reeves best movie', 'The Matrix');
        // calling insert should not throw an error
      }).should.not.throw();
    });
    it('should allow keys to be reinserted with new values', function(){
      var hashTable = makeHashTable();
      (function(){
        hashTable.insert('keanu reeves best movie', 'Bill & Ted\'s Excellent Adventure');
        hashTable.insert('keanu reeves best movie', 'The Matrix');
      }).should.not.throw();
    });
  });

  describe('#retrieve', function(){
    it('should be a method of hashTable instances', function(){
      var hashTable = makeHashTable();
      should.exist(hashTable.retrieve);
    })
    it('should be a function', function(){
      var hashTable = makeHashTable();
      hashTable.retrieve.should.be.a.Function;
    });
    it('should take exactly one argument', function(){
      var hashTable = makeHashTable();
      // the retrieve function should only take a single `key` argument
      hashTable.retrieve.length.should.equal(1);
    })
    it('should return values previously inserted', function(){
      var hashTable = makeHashTable();
      hashTable.insert('William Shatner\'s most well known role', 'Captain Kirk');
      var value = hashTable.retrieve('William Shatner\'s most well known role');
      should.exist(value);
      value.should.be.equal('Captain Kirk');
    });
    it('should return undefined for unknown keys', function(){
      var hashTable = makeHashTable();
      should.not.exist(hashTable.retrieve('echo?'));
    });
  });

  describe('#insert', function(){
    it('should allow values to be updated', function(){
      var hashTable = makeHashTable();
      hashTable.insert('Tarantino\'s best movie', 'Jackie Brown');
      hashTable.insert('Tarantino\'s best movie', 'Pulp Fiction');
      var value = hashTable.retrieve('Tarantino\'s best movie');
      should.exist(value);
      value.should.be.equal('Pulp Fiction');
    });
  });

  describe('#remove', function(){
    it('should exist as a method of the hashTable instance', function(){
      var hashTable = makeHashTable();
      should.exist(hashTable.remove);
    });
    it('should be a function', function(){
      var hashTable = makeHashTable();
      hashTable.remove.should.be.a.Function;
    });
    it('should take exactly one argument', function(){
      var hashTable = makeHashTable();
      // the remove function should only take a single `key` argument
      hashTable.remove.length.should.equal(1);
    });
    it('should allow values to be removed', function(){
      var hashTable = makeHashTable();
      hashTable.insert('Spielberg\'s best movie', 'Jaws');
      hashTable.remove('Spielberg\'s best movie');
      var value = hashTable.retrieve('Spielberg\'s best movie');
      should.not.exist(value);
    });
  });

  describe('#insert', function(){
    it('should handle collisions', function(){
      var hashTable = makeHashTable();
      var n = 1010;
      for(var i = 0; i < n; i++){
        hashTable.insert('userid:' + i, 'Jamie Hyneman #' + i);
      }
      for (var i = 0; i < n; i++) {
        hashTable.retrieve('userid:' + i).should.equal('Jamie Hyneman #' + i);
      }
    });
  });
});

*/

  var makeHashTable = function(){
    var table = {};
    var storage = [];
    var storageLimit = 1000;

    table.insert = function(key, value){
      // Index contains hashed key
      var index = getIndexBelowMaxForKey(key, storageLimit);

      // Initialize the bucket at index to an empty
      // array if it's not already
      storage[index] = storage[index] || [];

      // See if the key already exists. If it does, update
      // the value. Otherwise, just push the new key
      // value pair onto the bucket
      storage[index].find(function(tuple) {
        if (tuple[0] === key) {
          tuple[1] = value;
          return true;
        }

        return false;
      }) || storage[index].push([key, value])
    };

    table.retrieve = function(key){
      var i = getIndexBelowMaxForKey(key, storageLimit);

      // If the bucket at this hashed key exists,
      //   Search the bucket for an exact key match
      //   If found, return the associated value
      if (storage[i]) {
        return storage[i].reduce((val, arr) => {
          // If we find a key match,
          //   return the value
          if (arr[0] === key) {
            return arr[1];
          }

          // Otherwise, keep returning whatever
          // we've found previously
            return val;
        }, undefined)
      }

      // If the bucket doesn't exist, then there can't
      // be a value associated with this key
      return undefined;
    };

    table.remove = function(key){
      var i = getIndexBelowMaxForKey(key, storageLimit);
      // Remove the entire bucket and all values associated
      // with this key
      delete storage[i]
    };

    return table;
  };

 var getIndexBelowMaxForKey = function(str, max){
   var hash = 0;
   for (var i = 0; i < str.length; i++) {
     hash = (hash<<5) + hash + str.charCodeAt(i);
     hash = hash & hash; // Convert to 32bit integer
     hash = Math.abs(hash);
   }
   return hash % max;
 };
