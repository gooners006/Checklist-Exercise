const identify = require('./1');
const twice = require('./8');
// test identify =======================================================================================
describe('test identify', () => {
    it('should return 3', () => {
        expect(identify(3)).toBe(3);
    });
    it(`should return "It's-a me, Mario!"`, () => {
        expect(identify(`It's-a me, Mario!`)).toBe(`It's-a me, Mario!`);
    });
    it(`should return the function`, () => {
        expect(identify(identify)).toBe(identify);
    });
});
//test twice=============================================================================================
describe('test twice', () => {
    it('should return 22', () => {
        expect(twice.twice(twice.add)(11)).toBe(22);
    });
    it('should return 121', () => {
        expect(twice.twice(twice.mul)(11)).toBe(121);
    });
});