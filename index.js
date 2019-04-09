const appConfig = require('./app.config');
const JetpackService = require('./src/Service/Api/JetpackApi');
const HttpClient = require('./src/HttpClient');

const httpClient = new HttpClient(appConfig.apiUrl);
const jetpackService = new JetpackService(httpClient);


jetpackService.getJetpacks().then(jetpacks => {
    let html =  '';
    jetpacks.forEach((jetpack) => {
        html +=
            '<div class="card" style="width: 18rem;">\n' +
            '  <img src="'+ jetpack.image +'" class="card-img-top" alt="...">\n' +
            '  <div class="card-body">\n' +
            '    <h5 class="card-title">' + jetpack.name + '</h5>\n' +
            '    <a href="#" class="btn btn-primary">Edit</a>\n' +
            '  </div>\n' +
            '</div>'

    });

    document.getElementById('jetpacks').innerHTML = html;
});
createJetpack = function() {
    jetpackService.createJetPack(
        document.getElementById('name'),
        document.getElementById('image'),
    ).then(jetpack => {
        let html = document.getElementById('jetpacks').innerHTML;
         html +=
            '<div class="card" style="width: 18rem;">\n' +
            '  <img src="'+ jetpack.image +'" class="card-img-top" alt="...">\n' +
            '  <div class="card-body">\n' +
            '    <h5 class="card-title">' + jetpack.name + '</h5>\n' +
            '    <a href="#" class="btn btn-primary">Edit</a>\n' +
            '  </div>\n' +
            '</div>';

        document.getElementById('jetpacks').innerHTML = html;
    });
};
hideElement = function(x) {
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
};