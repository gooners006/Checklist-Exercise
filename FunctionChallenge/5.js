function liftf(func) {
    return function(a) {
        return function(b) {
            return func(a, b);
        };
    };
}