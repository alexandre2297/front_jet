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

    if(document.getElementById('jetpacks') !== null)
        document.getElementById('jetpacks').innerHTML = html;
});

createJetpack = function() {
    console.log(    jetpackService.createJetPack(
        document.getElementById('name').value,
        document.getElementById('image').value,
    ));

    console.log( jetpackService.createJetPack(
        document.getElementById('name').value,
        document.getElementById('image').value,
    ).toArray());


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

search = function() {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const validStartDate = ~isValidDate(startDate);
    const validEndDate   = ~isValidDate(endDate);

    let backgroundColorStartDate="white";
    let backgroundColorEndDate="white";

    if (validStartDate && validEndDate){
        if(isValidDates(startDate, endDate)) {
            jetpackService.searchJetpack(startDate, endDate).then(jetpacks => {
                document.getElementById('jetpacks Available').innerHTML = "";
                jetpacks.forEach((jetpack) => {
                    document.getElementById('jetpacks Available').innerHTML += getJetPackHtml(jetpack.id, jetpack.name, jetpack.image);
                    showElement("reserve_" + jetpack.id)
                });
            });
        }else{
            backgroundColorStartDate = "red";
            backgroundColorEndDate = "red";
        }
    }else {
        if (!validStartDate) {
            backgroundColorStartDate = "red";
        }
        if (!validEndDate){
            backgroundColorEndDate = "red";
        }
    }

    document.getElementById('startDate').style.backgroundColor = backgroundColorStartDate;
    document.getElementById('endDate').style.backgroundColor = backgroundColorEndDate;
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
        '</div>';
};

isValidDate = function (date) {
    const regex = "^\\d{4}[\\-\\/\\s]?((((0[13578])|(1[02]))[\\-\\/\\s]?(([0-2][0-9])|(3[01])))|(((0[469])|(11))[\\-\\/\\s]?(([0-2][0-9])|(30)))|(02[\\-\\/\\s]?[0-2][0-9]))$";
    return date.search(regex);
};

isValidDates = function (startDate, endDate) {
    const today  = new Date();
    const startD = new Date(startDate);
    const endD   = new Date(endDate);

    return startD >= today && startD <= endD;
};