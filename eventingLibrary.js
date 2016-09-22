/*

Eventing Library
Make an eventing system mix-in that adds .trigger() and .on() to any input object.

Example usage:
var obj = mixEvents({ name: 'Alice', age: 30 });
obj.on('ageChange', function(){ // On takes an event name and a callback function
  console.log('Age changed');
});
obj.age++;
obj.trigger('ageChange'); // This should call our callback! Should log 'age changed'.
Caveats:
- mixEvents should return the original object it was passed after extending it.
- If we repeatedly call .on with the same event name, it should
continue to call the old function as well. That is to say, we can have multiple
listeners for an event.
- If obj.trigger is called with additional arguments, pass those to the
listeners.
- It is not necessary to write a way to remove listeners.

Your Code Should Pass:

var should = chai.should();

describe('mixEvents', function() {
  it('should exist', function(){
    should.exist(mixEvents);
  });

  it('should be a function', function() {
    should.exist(mixEvents);
    mixEvents.should.be.a.Function;
  });

  it('should return the passed in object', function(){
    var obj = {};
    // because it's convient
    mixEvents(obj).should.equal(obj);
  });

  describe('#on', function(){
    it('should exist', function(){
      should.exist(mixEvents({}).on);
    });
    it('should be a function', function(){
      mixEvents({}).on.should.be.a.Function;
    })
  });

  describe('#trigger', function(){
    it('should exist', function(){
      should.exist(mixEvents({}).trigger);
    });

    it('should be a function', function(){
      mixEvents({}).trigger.should.be.a.Function;
    });

    it('should call the callback we pass into `on`', function() {
      var car = { color: "red", speed: 0 };
      mixEvents(car);
      car.on('green-light', function() {
        car.speed = 100; // FLOOR IT!
      });
      car.trigger('green-light');
      car.speed.should.equal(100); // Did our callback actually get called?
    });

    it('should be able to have multiple callbacks', function() {
      var car = mixEvents({
          color: "red",
          "insurance-premium": "costly",
          speed: 0,
          radio: "off"
      });

      // Both of these should get called when we trigger 'green-light'.
      car.on('green-light', function() {
        car.speed = 100;
      });

      car.on('green-light', function() {
        car.radio = "blaring";
      });

      car.speed.should.equal(0);
      car.radio.should.equal("off");

      car.trigger('green-light');

      car.speed.should.equal(100);
      car.radio.should.equal("blaring");
    });

    it('should ignore events that don\'t have listeners without erroring', function(){
      (function(){
        mixEvents({"abc":1234}).trigger('reticulate-splines');
      }).should.not.throw();
    });
  });

  describe('#on', function(){
    it('should pass any additional arguments in `trigger` to the listeners', function(){
      var dinner = mixEvents({});
      var result;
      dinner.on('order', function(dish, side){
        result = dish + " with a side of " + side;
      });
      dinner.trigger('order', "spam", "spinach");
      result.should.equal("spam with a side of spinach");
    });
  });
});

*/

var mixEvents = function(obj) {
  // A hash map of all our event callbacks
  var events = {};

  obj.trigger = function (event) {
    // Any additional arguments will be passed to the callback
    // invocation
    var args = Array.prototype.slice.call(arguments, 1);

    // First determine if there's an event listener for
    // the input event
    if (event in events) {
      // Iterate over each callback associated
      // with this event and apply the callback
      // with any provided args
      events[event].forEach(function(cb) {
        cb.apply(cb, args);
      })
    }
  };

  // Register a callback to be fired on this event.
  obj.on = function (event, callback) {
    if (event in events) {
      // If the event listener is already registered,
      // then add the callback to the callbacks array
      events[event].push(callback);
    } else {
      // Otherwise initialize a new array with this
      // callback as the first element
      events[event] = [callback];
    };
  };

  // Return the extended object
  return obj;
};


//
// TL;DR
//
var mixEvents = function(obj) {
  var events = {};

  obj.trigger = function (event) {
    var args = Array.prototype.slice.call(arguments, 1);
    if (event in events)
      events[event].forEach(cb =>
         cb.apply(cb, args))
  };

  obj.on = function (event, callback) {
    events[event] = event in events  ?
      events[event].concat(callback) :
      [callback];
  };

  return obj;
};


//
// TEST
//
var dinner = mixEvents({});
var result;
dinner.on('order', function(dish, side){
  result = dish + " with a side of " + side;
});
dinner.trigger('order', "spam", "spinach")
console.log(result);

