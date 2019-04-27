const appConfig = require('./app.config');
const JetpackService = require('./src/Service/Api/JetpackApi');
const HttpClient = require('./src/HttpClient');

const httpClient = new HttpClient(appConfig.apiUrl);
const jetpackService = new JetpackService(httpClient);


jetpackService.getJetpacks().then(jetpacks => {
    let html =  '';
    jetpacks.forEach((jetpack) => {
        html += getJetPackHtml(jetpack.id, jetpack.name, jetpack.image);
    });

    document.getElementById('jetpacks').innerHTML = html;
});

createJetpack = function() {
    jetpackService.createJetPack(
        document.getElementById('name').value,
        document.getElementById('image').value,
    ).then(jetpack => {
        let html = document.getElementById('jetpacks').innerHTML;
        html += getJetPackHtml(jetpack.id, jetpack.name, jetpack.image);

        document.getElementById('jetpacks').innerHTML = html;
    });
    hideElement('jetpack-form');
    document.getElementById('name').value = '';
    document.getElementById('image').value ='';
};

hideElement = function(id) {
    document.getElementById(id).className = "invisible";
};

showElement = function(id) {
    document.getElementById(id).className = "visible";
};

getJetPackHtml = function(id,name, image) {
    return  '<div class="card" style="width: 18rem;">\n' +
        '  <img src="'+ image +'" class="card-img-top" alt="...">\n' +
        '  <div class="card-body">\n' +
        '    <h5 class="card-title">' + name + '</h5>\n' +
        '    <a href="#" class="btn btn-primary">Edit</a>\n' +
        '  </div>\n' +
        '</div>';
};