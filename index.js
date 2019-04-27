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

search = function() {
    jetpackService.searchJetpack(
        document.getElementById('startDate').value,
        document.getElementById('endDate').value,
    ).then(jetpacks => {
        document.getElementById('jetpacks').innerHTML = "";
        jetpacks.forEach((jetpack) => {
            document.getElementById('jetpacks').innerHTML += getJetPackHtml(jetpack.id, jetpack.name, jetpack.image);
            showElement("reserve_" + jetpack.id)
        });
    });
};

hideElement = function(id) {
    const classElement = document.getElementById(id).className;

    if (~classElement.indexOf("invisible")) return;
    if (~classElement.indexOf("visible")) {
        document.getElementById(id).className = classElement.replace("visible", "invisible")
    }else{
        document.getElementById(id).className += "invisble"
    }
};

showElement = function(id) {
    const classElement = document.getElementById(id).className;
    if (~classElement.indexOf("invisible")){
        document.getElementById(id).className = classElement.replace("invisible", "visible")
    }
};

getJetPackHtml = function(id,name, image) {
    return  '<div class="card" style="width: 18rem;">\n' +
        '  <img src="'+ image +'" class="card-img-top" alt="...">\n' +
        '  <div class="card-body">\n' +
        '    <h5 class="card-title">' + name + '</h5>\n' +
        '    <a href="#" class="btn btn-primary">Edit</a>\n' +
        '    <a href="#" id="reserve_' + id + '" class="invisible btn btn-success"">Reserve</a>\n' +
        '  </div>\n' +
        '</div>';
};