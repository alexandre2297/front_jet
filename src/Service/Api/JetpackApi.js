const Jetpack = require('../../Entity/Jetpack');
module.exports = class  {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }

    getJetpacks() {
        return this.httpClient.fetch('/jetpacks', {}).then(rows => {

            return rows.map(row => {
                let jetpack = new Jetpack();
                jetpack.id      = row.id;
                jetpack.name    = row.name;
                jetpack.image   = row.image;

                return jetpack
            });
        });
    }

    createJetPack(){
        return this.httpClient.fetch('/jetpacks', {method: 'POST'}).then(row => {
                let jetpack = new Jetpack();
                jetpack.id      = row.id;
                jetpack.name    = row.name;
                jetpack.image   = row.image;

                return jetpack
        });
    }

    editJetPack() {
        return this.httpClient.fetch('/jetpacks/edit', { method: 'POST' }).then(row => {
            let jetpack = new Jetpack();
            jetpack.id = row.id;
            jetpack.name = row.name;
            jetpack.image = row.image;

            return jetpack
        });
    }
};