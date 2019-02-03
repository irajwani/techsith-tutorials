// Apply

//`apply` makes other functions do more, or save us the effort of looping. (Of course, there are other use cases)
//The apply() method calls a function with a given this value, 
//and arguments provided as an array (or an array-like object).

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply

var array = ['a', 'b'];
var elements = [0, 1, 2];
array.push.apply(array, elements);
console.info(array); // ["a", "b", 0, 1, 2]

// min/max number in an array
var numbers = [5, 6, 2, 3, 7];

// using Math.min/Math.max apply
var max = Math.max.apply(null, numbers); 
// This about equal to Math.max(numbers[0], ...)
// or Math.max(5, 6, ...)

var min = Math.min.apply(null, numbers);

// vs. simple (actually quite clever) loop based algorithm
max = -Infinity, min = +Infinity;

for (var i = 0; i < numbers.length; i++) {
  if (numbers[i] > max) {
    max = numbers[i];
  }
  if (numbers[i] < min) {
    min = numbers[i];
  }
}

//You can use apply to chain constructors for an object, similar to Java. 
//In the following example we will create a global Function method called construct, which 
//will enable you to use an array-like object with a constructor instead of an arguments list.

//this function just allows us to append apply to any other function AND handles the object creation and return process for us
Function.prototype.construct = function(aArgs) {
    var oNew = Object.create(this.prototype); //so over here, we create a new object
    //using an existing object as the prototype of the newly created object. In this case we create it based on
    //`this.prototype` which refers to Function.prototype
    this.apply(oNew, aArgs); // --> Here the function of our choice is invoked with multiple arguments which returns an object
    return oNew;
};

//so now for any function we may use .construct, in this case we set up MyConstructor below to return
//object with a few properties. Note how its pretty standard constructor pattern but the new keyword below was not necessary

function MyConstructor() {
    for (var nProp = 0; nProp < arguments.length; nProp++) {
        this['property' + nProp] = arguments[nProp];
    }
}
  
var myArray = [4, 'Hello world!', false];
var myInstance = MyConstructor.construct(myArray);

console.log(myInstance.property1);                // logs 'Hello world!'
console.log(myInstance.property0);                // logs 4
console.log(myInstance instanceof MyConstructor); // logs 'true'
console.log(myInstance.constructor);              // logs 'MyConstructor'


////////////////////
//////////////////// Call
////////////////////

// The call() allows for a function/method belonging to one object to be assigned and called for a different object.

// call() provides a new value of this to the function/method. With call, you can write a method once and 
// then inherit it in another object, without having to rewrite the method for the new object.

//.call is the same thing as apply, but now we provide our arguments individually,

function Product(name, price) {
  this.name = name;
  this.price = price;
}

function Food(name, price) {
  Product.call(this, name, price); //another example of object stealing/classical inheritance
  this.category = 'food';
}

console.log(new Product('cheese', 5).name);// expected output: "cheese"
console.log(new Food("cheese", 5).category) // food





