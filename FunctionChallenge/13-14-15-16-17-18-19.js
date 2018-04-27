/**
 * 
 * 
 * @param {any} start 
 * @returns 
 */
// Write a from function that produces a generator that will produce a series of values.
function from(start) {
    return function() {
        let next = start;
        start += 1;
        return next;
    };
}

// Write a to function that takes a generator and an end value, and returns a generator that will produce numbers up to that limit.
function to(gen, end) {
    return function() {
        let value = gen();
        if (value < end) {
            return value;
        }
        return undefined;
    };
}
//Write a fromTo function that return a generator that produce values in a range
function fromTo(start, end) {
    return to(from(start), end);
}
//Write an element function that takes an array and a generator and returns a generator that will produce elements from the array
function element(arr, gen) {
    return function() {
        let index = gen();
        if (index !== undefined) {
            return arr[index];
        }
    };
}
//Modify the element function so that the generator argument is optionl. If a generator is not provided, then each of the elements of the array will be produced
function element() {
    // new code========================
    if (gen === undefined) {
        gen = fromTo(0, arr.length);
        // end new code========================
        return function() {
            let index = gen();
            if (index !== undefined) {
                return arr[index];
            }
        };
    }
}
//Write a collect function that takes a generator and array and produces a function that will collect the results in the array
function collect(gen, arr) {
    return function() {
        let value = gen();
        if (value !== undefined) {
            arr.push(value);
        }
        return value;
    };
}
//Write a filter function that takes a generator and a predicate and produces a generator that produces only the values approved by the predicate
function filter(gen, predicate) {
    return function() {
        let value;
        do {
            value = gen();
        } while (
            value !== undefined && !predicate(value)
        );
        return value;
    };
}