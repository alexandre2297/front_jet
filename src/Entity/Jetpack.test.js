const Jetpack = require('./Jetpack');
describe('Jetpack  Constructor', function () {

    test('Test Jetpack constructor', () => {
        let jetpack = new Jetpack();
        expect(jetpack).not.toBe(undefined);
        expect(jetpack).not.toBeNull();
        expect(jetpack.id).not.toBe(undefined);
        expect(jetpack.name).not.toBe(undefined);
        expect(jetpack.image).not.toBe(undefined);
        expect(jetpack.bookings).not.toBe(undefined);
        expect(jetpack.id).toBeNull();
        expect(jetpack.name).toBeNull();
        expect(jetpack.image).toBeNull();
        expect(jetpack.bookings).not.toBeNull();
        expect(jetpack.bookings.length).toBe(0);

        jetpack.addBooking("2019/06/05", "2019/06/08");
        expect(jetpack.bookings.length).toBe(1);
        expect(jetpack.bookings[0]).toEqual(["2019/06/05", "2019/06/08"]);
    });
});