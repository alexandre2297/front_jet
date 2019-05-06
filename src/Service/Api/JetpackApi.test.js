const JetpackApi = require('./JetpackApi');
const Jetpack = require('../../Entity/Jetpack');

describe('JetpackApi features', function () {

    test('Test constructor feature', () => {

        let httpClientMock = {
            fetch: jest.fn()
        };

        httpClientMock.fetch.mockResolvedValue([
            {
                id: "123",
                name: "The Jetpack",
                image: "base64...",
            }
        ]);

        let jetpackApi = new JetpackApi(httpClientMock);

        expect(jetpackApi.httpClient).not.toBe(undefined);
        expect(jetpackApi.httpClient).not.toBe(null);
    });

    test('Test get Jetpacks features', async () => {

        let httpClientMock = {
            fetch: jest.fn()
        };

        httpClientMock.fetch.mockResolvedValue([
            {
                id: "123",
                name: "The Jetpack",
                image: "base64...",
            }
        ]);

        expect.assertions(7);

        let jetpackApi = new JetpackApi(httpClientMock);



        const toto = jetpackApi.getJetpacks().then(resp => {
            expect(Array.isArray(resp)).toBe(true);
            expect(resp.length).toBe(1);
            expect(resp[0].id).toBe("123");
            expect(resp[0].name).toBe("The Jetpack");
            expect(resp[0].image).toBe("base64...");
            expect(resp[0]).toBeInstanceOf(Jetpack);
        }).catch((e) => {
            fail(e);
        });
        expect(httpClientMock.fetch).toHaveBeenCalledTimes(1);
    });

    test('Test Create Jetpack',() =>{
        let httpClientMock = {
            fetch: jest.fn()
        };

        httpClientMock.fetch.mockResolvedValue(
            {
                id: "124",
                name: "My Jetpack",
                image: "base64..."
            }
        );

        expect.assertions(4);

        let jetpackApi = new JetpackApi(httpClientMock);
        jetpackApi.createJetPack('x','y').then(
            function (resp) {
                expect(resp.id).toBe("124");
                expect(resp.name).toBe("My Jetpack");
                expect(resp.image).toBe("base64...");
                expect(resp).toBeInstanceOf(Jetpack);
            }).catch((e) => {
            fail(e)
        });
    });

    test('Test Edit Jetpack',() =>{
        let httpClientMock = {
            fetch: jest.fn()
        };

        httpClientMock.fetch.mockResolvedValue(
            {
                id: "a8019ec0-bfdc-4140-9dbb-4927e5ef5c8d",
                name: "le jetpack de oufff2",
                image: "base64..."
            }
        );

        expect.assertions(4);

        let jetpackApi = new JetpackApi(httpClientMock);
        jetpackApi.editJetPack('a8019ec0-bfdc-4140-9dbb-4927e5ef5c8d','le jetpack de oufff2', 'base64...').then(
            function (resp) {
                expect(resp.id).toBe("a8019ec0-bfdc-4140-9dbb-4927e5ef5c8d");
                expect(resp.name).toBe("le jetpack de oufff2");
                expect(resp.image).toBe("base64...");
                expect(resp).toBeInstanceOf(Jetpack);
            }).catch((e) => {
            fail(e)
        });
    });

    test('Test search Jetpacks features', () => {

        let httpClientMock = {
            fetch: jest.fn()
        };

        httpClientMock.fetch.mockResolvedValue([
            {
                id: "123",
                name: "The Jetpack",
                image: "base64...",
            }
        ]);

        expect.assertions(6);

        let jetpackApi = new JetpackApi(httpClientMock);
        jetpackApi.searchJetpack("2019-05-04", "2019-06-10").then(resp => {
            expect(Array.isArray(resp)).toBe(true);
            expect(resp.length).toBe(1);
            expect(resp[0].id).toBe("123");
            expect(resp[0].name).toBe("The Jetpack");
            expect(resp[0].image).toBe("base64...");
            expect(resp[0]).toBeInstanceOf(Jetpack);
        }).catch( (e) => {
            fail(e);
        });
    });

    test('Test Book Jetpack',() =>{
        let httpClientMock = {
            fetch: jest.fn()
        };

        httpClientMock.fetch.mockResolvedValue(
            {
                id: "1",
                name: "le jetpack de ouf",
                image: "base64...",
                booking :["2019/06/05", "2019/07/03"]
            }
        );

        let jetpackApi = new JetpackApi(httpClientMock);
        jetpackApi.bookJetPack("a8019ec0-bfdc-4140-9dbb-4927e5ef5c8d", "2019-05-04", "2019-06-10").then(
            function (resp) {
                expect(resp.id).toBe("1");
                expect(resp.name).toBe("le jetpack de ouf");
                expect(resp.image).toBe("base64...");
                expect(Array.isArray(resp.booking)).toBe(true);
                expect(resp.booking.length).toBe(2);
                expect(resp.booking[0]).toEqual("2019/06/05");
                expect(resp.booking[1]).toEqual("2019/07/03");
                expect(resp).toBeInstanceOf(Jetpack);
            }).catch((e) => {
            fail(e)
        });
    });
});