function reverse(func) {
    return function(a, b) {
        return func(b, a);
    };
}