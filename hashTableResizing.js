/*

Hash Table Resizing
Define a resize function in the following hash table implementation.

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
    })
    it('should take exactly two arguments. a key and a value', function(){
      var hashTable = makeHashTable();
      hashTable.insert.length.should.equal(2);
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
    it('should allow valus to be updated', function(){
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
      (function(){
        var n = 1000;
        for(var i = 0; i < n; i++){
          hashTable.insert('userid:' + (i++), 'Jamie Hyneman');
        }
      }).should.not.throw();
    });

    it('should be able to resize in a timely fashion', function(){
      // if your hashtable isn't resizing, its going to start running more
      // and more slowly with a large number of inserts and retrievals.
      var hashTable = makeHashTable();
      var n = 10, id = 0, diffs = [];
      var endTime, startTime, key;
      for(var i = 0; i <= n; i++){
        startTime = new Date();
        for(var j = 0; j < 1000; j++){
          key = 'userid:' + (id++);
          hashTable.insert(key, 'hocus pocus');
        }
        for(j = 0; j < 100; j++){
          hashTable.retrieve('userid:' + Math.floor(Math.random() * j));
        }
        endTime = new Date();
        diffs.push(endTime - startTime);
      }
      var sum = function(arr){
        var total = 0;
        for(var i = 0;i < arr.length; i++) {
          total += arr[i];
        }
        return total;
      }
      // we should expect the first iteration to take up ruffly 1 / n
      // of the total time. we give it some wiggle room by letting it be as
      // low as a 1 / (n*2) of the total duration.
      var ratio = (diffs[0] / sum(diffs));
      ratio.should.be.above( 1 / ( n * 2 ));
    });

    it('should resize and redistribute values properly', function(){
      var hashTable = makeHashTable();

      var id = 0, diffs = [];
      var endTime, startTime, key;
      for(var i = 0; i <= 10; i++){
        for(var j = 0; j < 1000; j++){
          key = 'userid:' + (id++);
          hashTable.insert(key, 'hocus pocus');
        }
      }

      //below here, we will test to make sure that you have redistributed
      //values from the hash table over time. Again, you can ignore the
      //getIndexBelowMaxForKey function
      function getIndexBelowMaxForKey (str, max){
        var hash = 0;
        for (var i = 0; i < str.length; i++) {
          hash = (hash<<5) + hash + str.charCodeAt(i);
          hash = hash & hash; // Convert to 32bit integer
          hash = Math.abs(hash);
        }
        return hash % max;
      }

      //select 10 random keys and make sure that they are in the correct
      //place in the hash table
      for(var i = 0; i<10; i++){
        var found = false;
        var place = Math.floor(Math.random()*11000); //since we added about
        //11,000 items in the functionality at beginning
        var str = 'userid:' + place;
        var supposedIndex = getIndexBelowMaxForKey (str, 16384);
        var bucket = hashTable.find(supposedIndex);
        for(var z = 0; z<bucket.length; z++){
          if(bucket[z][0] == str){
            found = true;
          }
        }
        found.should.be.equal(true);
      }
    });

  });
});

*/


var makeHashTable = function() {
  var result = {};
  var storage = [];
  var storageLimit = 4;
  var size = 0;
  var resizing = false;

  result.insert = function(key, value){
    var index = getIndexBelowMaxForKey(key, storageLimit);
    storage[index] = storage[index] || [];
    var pairs = storage[index];
    var pair;
    var replaced = false;
    for (var i = 0; i < pairs.length; i++) {
      pair = pairs[i] || [];
      if (pair[0] === key) {
        pair[1] = value;
        replaced = true;
      }
    }

    if (!replaced) {
      pairs.push([key, value]);
      size++;
    }
    if(size >= storageLimit * 0.75 && !resizing){
      // increase the size of the hash table
      resize(storageLimit * 2);
    }
  };

  result.retrieve = function(key){
    var index = getIndexBelowMaxForKey(key, storageLimit);
    var pairs = storage[index];
    if (!pairs) { return; }
    var pair;

    for (var i = 0; i < pairs.length; i++) {
      pair = pairs[i];
      if (pair && pair[0] === key) {
        return pair[1];
      }
    }
  };

  result.remove = function(key){

    var index = getIndexBelowMaxForKey(key, storageLimit);
    var pairs = storage[index] || [];
    var pair;

    for (var i = 0; i < pairs.length; i++) {
      pair = pairs[i] || [];
      if (pair[0] === key) {
        var value = pair[1];
        pairs.splice(i, 1);
        size--;
        if(size <= storageLimit * 0.25 && !resizing){
          // decrease the size of the hash table
          resize(storageLimit / 2);
        }
        return value;
      }
    }
  };

  //This next function you would never have for a hash table
  //It is here merely for testing purposes. So we can check that
  //you are resizing correctly
  result.find = function(index){
    //return the bucket at a given index
    return storage[index];
  };

//***Finish This Function***//

  function resize(newSize){
    // Indicate that we're resizing
    // so we don't attempt to resize again during
    resizing = true;

    // Remove everything from the current table, storing
    // it all in a temp array
    var temp = [];
    storage.forEach(bucket => {
      bucket.forEach(pair => {
        temp.push(pair);
        result.remove(pair[0]);
      })
    })

    // Set the new storage limit
    storageLimit = newSize;

    // Re-build the hash table with the
    // new limit
    temp.forEach(pair => {
      result.insert(pair[0], pair[1]);
    })

    // Done resizing
    resizing = false;
  }

//*************************//

  return result;
};

// This is a "hashing function". You don't need to worry about it, just use it
// to turn any string into an integer that is well-distributed between
// 0 and max - 1
var getIndexBelowMaxForKey = function(str, max){
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = (hash<<5) + hash + str.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
    hash = Math.abs(hash);
  }
  return hash % max;
};

