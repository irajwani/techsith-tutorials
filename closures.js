//usually when you create a function, we either pass it some inner variables or arguments

//consider this simple function

// var addTo = (passed) => {
//     var inner = 2;
//     return passed + inner;
// }

//if we were to remove the passed argument from the function, and just declare `var passed = 3` outside,
//our function would be able to use that variable inside of it. That is, variables declared outside the function
//can be used inside the function. This is the simplest example of closure:
var passed = 3;
var addTo = () => {
    var inner = 2;
    return inner + passed
}

console.dir(addTo()) 
// will show us this function's description, which consists of the scope of this function, which
// will consist of the Closure of this function

//When the function executes, it recognizes it needs the value of `passed`; first it searches the function body itself
// and if it cannot find this variable, it searches outside the function, and if the variable still is not 
// found in the layer or scope immediately outside the function, it goes one more layer outside (if available of course)
// Outside the function, it will use the value of `passed` that was declared on line n rather than line n-1.
// Hence the Closure of addTo() will be that value as well.


//Now we have an outer function which takes an argument `passed` and returns a function, a function that is customized
// to do something based on the argument passed to it, and speaking of this inner function, the inner function 
// just returns a value. So if we execute, say `addTo(3)`, we will get a function that will take some argument
// called `inner` which is still undefined, and return its sum with 3. As a result, the value of 3 is under the closure of 
// the returned function. In general whatever we pass to `addTo(passed)` will fall under the closure of `add()`
var addTo = (passed) => {
    var add = (inner) => {return passed + inner}
    return add
}

var add3 = new addTo(3); //Closure will show `passed: 3`
var add7 = new addTo(7); //Closure will show `passed: 7`


// So I can create infinite functions, add8, add9 and so on of this flavor. 
// The important thing is that each function preserves its value, of 3 or 7, as a property of that function.
// That is Closure.

