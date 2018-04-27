/**
 * 
 * 
 * @param {any} func 
 * @param {any} count 
 * @returns 
 */
function limit(func, count) {
    return function(a, b) {
        if (count >= 1) {
            count -= 1;
            return func(a, b);
        }
        return undefined;
    };
}