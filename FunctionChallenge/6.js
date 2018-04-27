function curry(func, a) {
    return function(b) {
        return binary(a, b);
    };
}