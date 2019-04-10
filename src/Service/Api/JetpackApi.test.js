const JetpackApi = require('./JetpackApi');
const Jetpack = require('../../Entity/Jetpack');

describe('JetpackApi  get Jetpacks', function () {

    test('Test JetPack features', () => {

        expect.assertions(6);

        let httpClientMock = {
            fetch: jest.fn()
        };

        httpClientMock.fetch.mockResolvedValue([
            {
                id: "123",
                name: "The Jetpack",
                image: "base64 ..."
            }
        ]);

        let jetpackApi = new JetpackApi(httpClientMock);
        jetpackApi.getJetpacks().then(resp => {
            expect(Array.isArray(resp)).toBe(true);
            expect(resp.length).toBe(1);
            expect(resp[0]).toBeInstanceOf(Jetpack);
            expect(resp[0].id).toBe("123");
            expect(resp[0].name).toBe("The Jetpack");
            expect(resp[0].image).toBe("base64 ...");
        });
    });

    test('Test Create Jetpack',() =>{

        expect.assertions(4);

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

        let jetpackApi = new JetpackApi(httpClientMock);
        jetpackApi.createJetPack('x','y').then(resp => {
            expect(resp).toBeInstanceOf(Jetpack);
            expect(resp.id).toBe("124");
            expect(resp.name).toBe("My Jetpack");
            expect(resp.image).toBe("base64...");
        });
    });
});