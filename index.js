const appConfig = require('./app.config');
const JetpackService = require('./src/Service/Api/JetpackApi');
const HttpClient = require('./src/HttpClient');

const httpClient = new HttpClient(appConfig.apiUrl);
const jetpackService = new JetpackService(httpClient);


jetpackService.getJetpacks().then(jetpacks => {
    let html =  '';
    jetpacks.forEach((jetpack) => {
        html +=
            '<div class="card-' + jetpack.id +'" style="width: 18rem;">\n' +
        '  <img id="img-' + jetpack.id+'" src="'+ jetpack.image +'" class="card-img-top" alt="...">\n' +
            '  <div class="card-body">\n' +
        '    <h5 id="card-title-' + jetpack.id +'" class="card-title">' + jetpack.name + '</h5>\n' +
                '<div id="'+jetpack.id+'">' +
        '<label for="name"></label><input type="text" name="name" id="name-modify-' + jetpack.id +'" />' +
        '<label for="image"></label><input type="text" name="image" id="image-modify-' + jetpack.id +'" />' +
        '<button id ="edit-' + jetpack.id+'" onclick="editJetpack('+jetpack.id.toString()+')">Edit</button>' +
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
             '<div class="card-' + jetpack.id + '" style="width: 18rem;">\n' +
             '  <img id="img-' + jetpack.id + '" src="' + jetpack.image + '" class="card-img-top" alt="...">\n' +
             '  <div class="card-body">\n' +
             '    <h5 id="card-title-' + jetpack.id + '" class="card-title">' + jetpack.name + '</h5>\n' +
             '<div id="' + jetpack.id + '">' +
             '<label for="name"></label><input type="text" name="name" id="name-modify-' + jetpack.id + '" />' +
             '<label for="image"></label><input type="text" name="image" id="image-modify-' + jetpack.id + '" />' +
             '<button id ="edit-' + jetpack.id + '" onclick="editJetpack(' + jetpack.id.toString() + ')">Edit</button>' +
             '</div>' +
             '  </div>\n' +
             '</div>'

        document.getElementById('jetpacks').innerHTML = html;
    });
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
    document.getElementById(id).style.display = "none";
};

showElement = function(id) {
    document.getElementById(id).style.display = "block";
};