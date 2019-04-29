const JetpackApi = require('./JetpackApi');
const Jetpack = require('../../Entity/Jetpack');

describe('JetpackApi features', function () {
    test('Test get Jetpacks features', () => {

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
        jetpackApi.getJetpacks().then(resp => {
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
    })

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
        jetpackApi.editJetPack('x','y').then(
            function (resp) {
                expect(resp.id).toBe("a8019ec0-bfdc-4140-9dbb-4927e5ef5c8d");
                expect(resp.name).toBe("le jetpack de oufff2");
                expect(resp.image).toBe("base64...");
                expect(resp).toBeInstanceOf(Jetpack);
            }).catch((e) => {
            fail(e)
        });
    })
});