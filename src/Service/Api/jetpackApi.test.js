const JetpackApi = require('./JetpackApi');
const Jetpack = require('../../Entity/Jetpack');
describe('JetpackApi  get Jetpacks', function () {

    test('Test JetPack features', () => {
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
            expect(resp[0]).toBeInstanceOf(Jetpack)
        });
    });

    test('Test Create Jetpack',() =>{
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
        jetpackApi.createJetPack('x','y').then(resp => {
            expect(resp).toBeInstanceOf(Jetpack);
        });
    })
});