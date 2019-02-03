// The simplest use of bind() is to make a function that, no matter how it is called, is called 
// with a particular this value. A common mistake for new JavaScript programmers is to extract a method 
// from an object, then to later call that function and expect it to use the original object as 
// its this (e.g. by using that method in callback-based code). Without special care, however, 
// the original object is usually lost. Creating a bound function from the function, using the
// original object, neatly solves this problem:

//`bind` explicitly allows one to set the scope of `this` so when we use an object,
//in this case, module, and if we try to access the `this` within module, we get the global `this` instead.
//With `retrieveX.bind(module)` we explicitly say `this` is module.

this.x = 9;    // this refers to global "window" object here in the browser
var module = {
  x: 81,
  getX: function() { return this.x; }
};

module.getX(); // 81

var retrieveX = module.getX;
retrieveX();   
// returns 9 - The function gets invoked at the global scope

// Create a new function with 'this' bound to module
// New programmers might confuse the
// global var x with module's property x
var boundGetX = retrieveX.bind(module);
boundGetX(); // 81