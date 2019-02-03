//1. Difference between let and var;
// `let` has block scope, which it means it will die at the end of the code block its defined in.
// `var` has functional scope: it will die
// at the end of the function it's defined in.
// `var` variables are hoisted, whereas `let`
// variables are not
//  The following illustrates these differences and
// how JS performs garbage collection

let x = () => {

    if(true) {
        var v = 2;
        let l = 1;
        //definition of `let` ends in this block
    }
    

    console.log(v, l) //will yield `2, undefined`

    //`var` destroyed here
}

x()

//Now, this is very important. If we moved the console logs
// above to the `if` block, then `var` value will not print, and `let`
// value will be undefined. Why is this? Because `var` gets hoisted within 
// the function and therefore its defined, yet has no value
//  assigned to it. `let` variables are not hoisted.

//2. == vs. === . Simple, == only checks for value, whereas === compares both value and type
// Therefore == performs type coercion in scenarios like ` "1" == 1 ` so it yields true.

//3. clg(2 + '2') --> string '22', the plus operator concatenates strings together because this operator is designed to work with either strings or numbers.
// since JS sees a string and a number, it converts the number to a string, and then concatenates them together
// However, clg(2 - '2') --> number 0 because the minus operator is designed to work exclusively with numbers

