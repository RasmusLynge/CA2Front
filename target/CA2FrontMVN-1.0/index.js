const btnFindPersons = document.getElementById("btnfind");
const btnZip = document.getElementById("btnzip");
const btnFindCity = document.getElementById("btncity");
const btnMakePerson = document.getElementById("btnMakePerson");

const table = document.getElementById("tbl");

var urlHobby = "http://localhost:8084/CA2Final/api/person/hobby/";
var urlZip = "http://localhost:8084/CA2Final/api/person/city/";
var urlPost = "http://localhost:8084/CA2Final/api/person/";

const deployed = true;

if (deployed == true) {
    var urlHobby = "http://localhost:8084/CA2Final/api/person/hobby/";
    var urlZip = "http://localhost:8084/CA2Final/api/person/city/";
    var urlPost = "http://localhost:8084/CA2Final/api/person/";
}

btnFindPersons.onclick = () => {
    const hobby = document.getElementById("search").value;

    if (hobby == "") {
        table.innerHTML = "<h4>Søg på en hobby</h4>";
    } else {
        table.innerHTML = "<h4> Vent venligst </h4>"
        fetch(urlHobby + hobby)
                .then(res => res.json())
                .then((data) => {
                    if (data.length == 0) {
                        table.innerHTML = "ingen personer med " + hobby + " som hobby";
                    } else {
                        let mapData = data.map(function (element) {
                            return "<tr><td>" + element.personFirstName + "</td><td>" + element.personLastName + "</td><td>" + element.personEmail + "</td></tr>";
                        })
                        table.innerHTML = "<thead><th>Fornavn</th><th>Efternavn</th><th>Email</th></thead>";
                        table.innerHTML += mapData.join("");
                    }
                });
    }

}

btnZip.onclick = () => {
    table.innerHTML = "<h4> Vent venligst </h4>"
    fetch("http://localhost:8084/CA2Final/api/person/zip")
            .then(res => res.json())
            .then((data) => {
                let mapData = data.map(function (element) {
                    return "<tr><td>" + element.zip + "</td><td>" + element.cityname + "</td></tr>"
                })
                table.innerHTML = "<thead><th>Postnummer</th><th>By</th></thead>"
                table.innerHTML += mapData.join("");
            });
}

btnFindCity.onclick = () => {
    const zip = document.getElementById("search").value;

    if (zip == "") {
        table.innerHTML = "<h4>Søg på et postnummer</h4>";
    } else {
        table.innerHTML = "<h4> Vent venligst </h4>"
        fetch(urlZip + zip)
                .then(handleError)
                .then((data) => {
                    if (data.length == 0) {
                        table.innerHTML = "ingen personer med " + zip + " som postnummer";
                    } else {
                        let mapData = data.map(function (element) {
                            return "<tr><td>" + element.personFirstName + "</td><td>" + element.personLastName + "</td><td>" + element.personEmail + "</td></tr>";
                        })
                        table.innerHTML = "<thead><th>Fornavn</th><th>Efternavn</th><th>Email</th></thead>";
                        table.innerHTML += mapData.join("");
                    }

                })
                .catch(function (error) {
                    table.innerHTML = "ingen personer med " + zip + " som postnummer";
                })

    }

}

function handleError(res) {
    if (!res.ok) {
        return Promise.reject({
            status: res.status,
            fullError: res.json()
        })
    }
    return res.json();
}

btnMakePerson.onclick = (e) => {
    e.preventDefault();
    const fName = document.getElementById("fname").value;
    const lName = document.getElementById("lname").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;
    const addressDesc = document.getElementById("addressdesc").value;
    const zip = document.getElementById("zip").value;
    const phone = document.getElementById("phone").value;
    const phoneDesc = document.getElementById("phonedesc").value;
    const hobby = document.getElementById("hobby").value;
    const hobbyDesc = document.getElementById("hobbydesc").value;

    var json = "{\"street\":\"" + address + "\", \"additionalInfo\":\"" + addressDesc + "\", \"ZIP\":\"" + zip + "\", \"CITY\":\"" + "TEST" + "\", \"name\":\"" + hobby + "\", \"descriptionHobby\":\"" + hobbyDesc + "\", \"email\":\"" + email + "\", \"firstName\":\"" + fName + "\", \"lastName\":\"" + lName + "\", \"number\":\"" + phone + "\", \"descriptionPhone\":\"" + phoneDesc + "\" }"

    fetch(urlPost, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: json // body data type must match "Content-Type" header
    })
            .then((res) => res.json())
            .then((data) => {
                update();
            }).catch(error => console.log(error));
}
