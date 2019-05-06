const Jetpack = require('../../Entity/Jetpack');
module.exports = class  {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }

    getJetpacks() {
        return this.httpClient.fetch('/jetpacks', {}).then(rows => {

            return rows.map(row => {
                let jetpack = new Jetpack();
                jetpack.id = row.id;
                jetpack.name = row.name;
                jetpack.image = row.image;

                return jetpack
            });
        });
    }

    createJetPack(name, image){
        return this.httpClient.fetch('/jetpacks',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: "name=" + name + "&image=" + image
            }

        ).then(row => {
            let jetpack = new Jetpack();
            jetpack.id      = row.id;
            jetpack.name    = row.name;
            jetpack.image   = row.image;

            return jetpack
        });
    }

    editJetPack(id, name, image) {
        return this.httpClient.fetch('/jetpacks/edit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: "id=" + id + "&name=" + name + "&image=" + image

        }).then(row => {
            let jetpack = new Jetpack();
            jetpack.id = row.id;
            jetpack.name = row.name;
            jetpack.image = row.image;

            return jetpack
        });
    }

    searchJetpack(startDate, endDate){
        return this.httpClient.fetch('/jetpacks/search',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: "startDate=" + startDate + "&endDate=" + endDate
            }

        ).then(rows => {
            return rows.map(row => {
                let jetpack = new Jetpack();
                jetpack.id      = row.id;
                jetpack.name    = row.name;
                jetpack.image   = row.image;
                jetpack.bookings = row.bookings;

                return jetpack
            });
        });
    }

    bookJetPack (id, startDate, endDate){
        return this.httpClient.fetch('/jetpacks/book', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: "id=" + id + "&startDate=" + startDate + "&endDate=" + endDate
        }).then(row => {
            let jetpack = new Jetpack();
            jetpack.id = row.id;
            jetpack.name = row.name;
            jetpack.image = row.image;
            jetpack.booking = row.booking;

            return jetpack
        });
    }

};