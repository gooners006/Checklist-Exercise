/**
 * 
 * 
 * @param {any} func 
 * @returns 
 */
function twice(func) {
    return function(x) {
        return func(x, x);
    }
}

function add(a, b) {
    return a + b;
}

function mul(a, b) {
    return a * b;
}
// console.log(twice(mul)(10));
module.exports = { twice, add, mul };