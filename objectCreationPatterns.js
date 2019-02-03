//In JS, there is no formal support of class, there is a lot of flexibility when it comes to object creation.

//Patterns:

//1. Factory Pattern:

var peopleFactory = (name, age) => {
    var temp = {};
    temp.name = name;
    temp.age = age;
    temp.printPerson = () => {
        console.log(this.name + " " + this.age)
    }
    return temp;
}

var John = peopleFactory('John', 21);
John.printPerson();

//Thus, I have a function (object) that can create a certain type of object with specific properties, which I can use
//an infinite number of times

//2. Constructor Pattern:
//Now we don't return any object, the `new` constructor builds one for us and then assigns it to whatever value
//we please

function peopleConstructor(name) {
    this.name = name;
    this.printPerson = () => {
        console.log(this.name)
    }
}
// var peopleConstructor = (name) => {
//     this.name = name;
//     this.printPerson = () => {
//         console.log(this.name)
//     }
// }

John = new peopleConstructor('John')
John.printPerson();

//Now recognize that if I can keep using my function above to create different people or whatever in the form of
//independent variables, they will each have their own unique printPerson function, which is redundant

//3. Prototype Pattern

//Instead of creating functions (objects) that have properties and functions, we shall create an empty object
// and add those properties to a shared space, under `Object.prototype`.

function peopleProto() {};
peopleProto.prototype.age = 1;
peopleProto.prototype.name = "default name";
peopleProto.prototype.printPerson = () => {
    console.log(this.name + " " + this.age);
}

//This way, we may assign certain methods and properties by default

var John = new peopleProto();

John.name = 'John';
John.printPerson(); // 'John 0'
John.age = 23;
John.printPerson(); // 'John 23'

//This way, we may override certain properties and choose to preserve other properties. 
// It is important to recognize that the function printPerson is in the shared space and will be the same for
// all objects created from `new peopleProto();`

//To check if a certain property exists in an object's direct space and its prototype space:

console.log('someKey' in John, 'name' in John) //return true or false

//To check if a certain property is directly attached to an object:

console.log(John.hasOwnProperty('someKey'));

//The disadvantage of this pattern is how we must first create an empty object, then construct new variables
// that we may choose to attach objects to. Additionally, when you have a property as an object, this pattern creates
// a 'confusion' when you create multiple objects from it. That brings us to...

//4. Dynamic Prototype Pattern

function peopleDynamicProto(name, age,) {
    this.age = age;
    this.name = name; //similar to Constructor pattern
    
    
    //this way, if any objects we create don't already have a printPerson function, in which case 
    // `typeof this.printPerson` will be undefined, the object creation pattern will create a new function for us
    //SO the this pattern allows us to create objects with default methods and values
    if(typeof this.printPerson !== 'function') {
        peopleDynamicProto.prototype.printPerson = () => {
            console.log(this.name + " " + this.age);
        };
    }
    
}

var John = new peopleDynamicProto('John', 23)
John.printPerson();
John.printPerson = "some string"; //if alive, I'd hard set a new value for print person.
console.log(John.printPerson); //function

//5. Durable constructor
//Now instance methods do not refer to `this` and we don't use to instantiate the constructor
//Used to hide data

function DurablePerson(name, age, job){
    //create the object to return
    var o = new Object();
    //optional: define private variables/functions here
    //attach methods
    o.sayName = function(){
    console.log(name);
    };
    //return the object
    return o;
}			

var person = DurablePerson("Nicholas", 29, "Software Engineer");
//person.sayName(); //"Nicholas"
            

//Prototype Chaining:
// ECMA - 262 describes prototype chaining as the primary method of inheritance in ECMAScript. 
// The basic idea is to use the concept of prototypes to inherit properties and methods between two reference types. 
// Recall the relationship between constructors, prototypes, and instances: 
// each constructor has a prototype object that points back to the constructor, and instances have an internal pointer 
// to the prototype. What if the prototype were actually an instance of another type? That would mean the prototype 
// itself would have a pointer to a different prototype that, in turn, would have a pointer to another constructor. 
// If that prototype were also an instance of another type, then the pattern would continue, forming a chain between 
// instances and prototypes. This is the basic idea behind prototype chaining.

// Implementing prototype chaining involves the following code pattern:

//1. Basic Inheritance
function SuperType(){
    this.property = true;
}
SuperType.prototype.getSuperValue = function(){
    return this.property;
};
function SubType(){
    this.subproperty = false;
}

SubType.prototype = new SuperType(); //inherit from SuperType
SubType.prototype.getSubValue = function (){
    return this.subproperty;
};
var instance = new SubType();
//console.log(instance.getSuperValue()); //true
//The above clg demonstrates the benefit of prototype chaining, when when a call is made to 
// instance.getSuperValue, it commences a 3 step search:
// 1. instance, 2. SubType.prototype, 3. SuperType.prototype

//2. Object Stealing/Classical Inheritance

//Since functions are just objects that execute code in a particular context, we may use `call` and `apply`
function SuperType() {
    this.colors = ["red", "blue", "green"];
}
function SubType() {

    //inherit from SuperType
    SuperType.call(this); //this way we steal from SuperType.

}
var instance1 = new SubType();
instance1.colors.push("black");
//console.log(instance1.colors); //"red,blue,green,black"
var instance2 = new SubType();
//console.log(instance2.colors); //"red,blue,green"

//3. 
