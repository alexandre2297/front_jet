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

    createJetPack(name, image){
        return this.httpClient.fetch('/jetpacks',
            {
                method: 'POST',
                body: JSON.stringify({name: name, image: image})
            }

        ).then(row => {
            let jetpack = new Jetpack();
            jetpack.id      = row.id;
            jetpack.name    = row.name;
            jetpack.image   = row.image;

            return jetpack
        });
    }
};