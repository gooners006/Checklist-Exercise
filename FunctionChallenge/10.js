function composeu(func1, func2) {
    return function(a) {
        return func2(func1(a));
    };
}