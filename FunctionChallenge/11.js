function composeb(func1, func2) {
    return function(a, b, c) {
        return func2(func1(a, b), c);
    };
}