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


editJetpack = function (id) {
    jetpackService.editJetPack(id,
        document.getElementById('name-modify-'+id),
        document.getElementById('image-modify-' + id),
    ).then(jetpack => {
        document.getElementById("card-title-" + id).textContent =jetpack.name
        document.getElementById("img-" + id).src = jetpack.image
    });
}

hideElement = function(id) {
    document.getElementById(id).className = "invisible";
};

showElement = function(id) {
    document.getElementById(id).className = "visible";
};

getJetPackHtml = function(id,name, image) {
    return    '<div class="card-' + id + '" style="width: 18rem;">\n' +
        '  <img id="img-' + id + '" src="' + image + '" class="card-img-top" alt="...">\n' +
        '  <div class="card-body">\n' +
        '    <h5 id="card-title-' + id + '" class="card-title">' + name + '</h5>\n' +
        '<div id="' + id + '">' +
        '<label for="name"></label><input type="text" name="name" id="name-modify-' + id + '" />' +
        '<label for="image"></label><input type="text" name="image" id="image-modify-' + id + '" />' +
        '<button id ="edit-' + id + '" onclick="editJetpack(' + id.toString() + ')">Edit</button>' +
        '</div>' +
        '  </div>\n' +
        '</div>'
};