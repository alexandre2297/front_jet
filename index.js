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
            '  <div id="'+jetpack.id+'" class="card-body">\n' +
            '    <h5 class="card-title">' + jetpack.name + '</h5>\n' +
                '<div id="jetpack-form-edit-'+jetpack.id+'">' +
               '<label for="name"></label><input type="text" name="name" id="name-modify" />' +
                '<label for="image"></label><input type="text" name="image" id="image-modify" />' +
                '<button id ="edit" onclick="editJetpack('+jetpack.id.toString()+')">Edit</button>' +
            '</div>' +
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

editJetpack = function (jetPack) {

    // console.log(e.parent.className);
    console.log(jetPack);

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
}

hideElement = function(id) {
    document.getElementById(id).style.display = "none";
};

showElement = function(id) {
    document.getElementById(id).style.display = "block";
};