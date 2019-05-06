const appConfig = require('./app.config');
const JetpackService = require('./src/Service/Api/JetpackApi');
const HttpClient = require('./src/HttpClient');

const httpClient = new HttpClient(appConfig.apiUrl);
const jetpackService = new JetpackService(httpClient);


jetpackService.getJetpacks().then(jetpacks => {
    let html =  '';
    jetpacks.forEach((jetpack) => {
        html += getJetPackHtml(jetpack.id, jetpack.name, jetpack.image, false, true);
    });

    if(document.getElementById('jetpacks') !== null)
        document.getElementById('jetpacks').innerHTML = html;
});

createJetpack = function() {
    jetpackService.createJetPack(
        document.getElementById('name').value,
        document.getElementById('image').value,
    ).then(jetpack => {
        let html = document.getElementById('jetpacks').innerHTML;
        html += getJetPackHtml(jetpack.id, jetpack.name, jetpack.image, false, true);

        document.getElementById('jetpacks').innerHTML = html;
    });
    hideElement('jetpack-form');
    document.getElementById('name').value = '';
    document.getElementById('image').value ='';
};

editJetpack = function (id) {
    console.log(id);
    jetpackService.editJetPack(id,
        document.getElementById('name-modify-'+id).value,
        document.getElementById('image-modify-' + id).value,
    ).then(jetpack => {
        document.getElementById("card-title-" + id).textContent =jetpack.name;
        document.getElementById("img-" + id).src = jetpack.image;

        document.getElementById('name-modify-'+id).value = ""
        document.getElementById('image-modify-' + id).value = ""
    });
};

bookJetPack = function (id) {
    jetpackService.bookJetPack(id,
        document.getElementById('startDate').value,
        document.getElementById('endDate').value
    ).then(jetpack => {
        let html = document.getElementById("booking").innerHTML;

        html += getReservationsHtml(jetpack);

        document.getElementById("booking").innerHTML = html;
    });
};

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
                document.getElementById('jetpacksAvailable').innerHTML = "";
                jetpacks.forEach((jetpack) => {
                    document.getElementById('jetpacksAvailable').innerHTML +=
                        getJetPackHtml(jetpack.id, jetpack.name, jetpack.image, true, false);
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

getJetPackHtml = function(id,name, image, withBookButton, withEditButton) {
    let html =   '<div class="card" style="width: 18rem;">\n' +
        '  <img id="img-' + id + '" src="' + image + '" class="card-img-top" alt="...">\n' +
        '  <div class="card-body">\n' +
        '    <h5 id="card-title-' + id + '" class="card-title">' + name + '</h5>\n' +
        '<div id="' + id + '">';


    if (withEditButton) {
        html +=  `<label for="name"></label><input type="text" name="name" id="name-modify-${id}" />
            <label for="image"></label><input type="text" name="image" id="image-modify-${id}" />
            <button id ="edit-${id}" onclick="editJetpack('${id}')">Edit</button>`;
    }
    if (withBookButton){
        html +='<button onclick="bookJetPack(' + id.toString() + ')" id="reserve-' + id + '" class="btn btn-success"">Reserve</button>';
    }
    return html +
        '</div>' +
        '  </div>\n' +
        '</div>';
};

getReservationsHtml = function (jetPack){
    return  jetPack.name + " a été réservé du " + jetPack.booking[0] + " au "+ jetPack.booking[1] + "\n</p>";
};

isValidDate = function (date) {
    const regex = "^\\d{4}[\\-\\/\\s]?((((0[13578])|(1[02]))[\\-\\/\\s]?(([0-2][0-9])|(3[01])))|(((0[469])|(11))[\\-\\/\\s]?(([0-2][0-9])|(30)))|(02[\\-\\/\\s]?[0-2][0-9]))$";
    return date.search(regex);
};

isValidDates = function (startDate, endDate) {
    return new Date(startDate) <= new Date(endDate);
};