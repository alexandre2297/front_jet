const Jetpack = require('./Jetpack');
describe('Jetpack  Constructor', function () {

    test('Test Jetpack constructor', () => {
        let jetpack = new Jetpack();
        expect(jetpack).not.toBe(undefined);
        expect(jetpack).not.toBeNull();
        expect(jetpack.id).not.toBe(undefined);
        expect(jetpack.name).not.toBe(undefined);
        expect(jetpack.image).not.toBe(undefined);
        expect(jetpack.id).toBeNull();
        expect(jetpack.name).toBeNull();
        expect(jetpack.image).toBeNull();
    });
});