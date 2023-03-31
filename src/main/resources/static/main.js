
let xttp = new XMLHttpRequest();

xttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        main(this.responseText)
    }
}

xttp.open("GET", "http://localhost:8080/people/list", true)
xttp.send();


const urlUsers = "http://localhost:8080/people/list";
const urlAuth = "http://localhost:8080/people/current"



function main(){
    fetch(urlAuth).then(res => res.json())
        .then(data => {
            let json = data;
            document.getElementById('headerUser1').innerHTML = json.email;
            document.getElementById('headerUser2').innerHTML = json.role["name"];
        });
    fetch(urlUsers).then(res => res.json())
        .then(data => {
            let json = data;
            let keys  = Object.keys(json);
            console.log(keys);
            for(let k in keys) {
                console.log(json[k]);

                createTr(json[k]);
            }
            })
};

function createTr(jsonElement) {
    let createRow = document.createElement("tr");
    let newRow = document.getElementById("userList").appendChild(createRow);
    let newCell = newRow.insertCell();
    // let newSpan = newCell.appendChild(document.createElement("span"))
    let newText = newCell.innerText;

    let propArray = [jsonElement.id, jsonElement.first_name, jsonElement.last_name, jsonElement.age,
        jsonElement.email, jsonElement.role["name"]]

    for (let i = 0; i < 7; i++) {
        newRow.insertCell(i).innerHTML = propArray[i];

    }
    newRow.insertCell(6).innerHTML = createEditButton(jsonElement.id).innerHTML;

}

function createEditButton(userId) {
    const divEdit = document.createElement("div");
    const editButton = document.createElement("button");
    editButton.innerHTML = "Edit";
    divEdit.appendChild(editButton);
    setAttributes(editButton, {"type":"button", "class": "btn btn-info", "data-toggle":"modal", "data-whatever":"@userID", "data-target":`edit${userId.toString()}`});

    document.getElementById("modalForUser").id = `edit${userId.toString()}`

    // document.getElementById("userList").addEventListener('click', function (e) {
    //     if (e.target.type == "button") {
    //         $("#edit" + e.target).modal();
    //     }
    // }, false);
    // modalE.setAttribute("id", `edit${userId.toString()}`);
    // editButton.onclick()
    return divEdit;
}

//на потом
function createModalEdit(jsonElement) {
    let modalId = `Modal ${jsonElement.id}`
    document.getElementById("editModal").setAttribute("data-target", "modalForUser");
    document.getElementById("modalForUser");
    $("modalForUser").modal("show")
}



function fillUserEdit(jsonElement) {
    let idEl = document.getElementById("id");
    setAttributes(idEl, {"value": `${jsonElement.id}`, "placeholder": `${jsonElement.id}`})
    let firstNameEl = document.getElementById("first_name");
    setAttributes(firstNameEl, {"value": `${jsonElement.first_name}`, "placeholder": `${jsonElement.first_name}`});
    let lastNameEl = document.getElementById("last_name");
    setAttributes(lastNameEl, {"value": `${jsonElement.last_name}`, "placeholder": `${jsonElement.last_name}`});
    let ageEl = document.getElementById("age");
    setAttributes(ageEl, {"value": `${jsonElement.age}`, "placeholder": `${jsonElement.age}`});
    let emailEl = document.getElementById("email");
    setAttributes(emailEl, {"value": `${jsonElement.email}`, "placeholder": `${jsonElement.email}`});
    let usernameEl = document.getElementById("username");
    setAttributes(usernameEl, {"value": `${jsonElement.username}`, "placeholder": `${jsonElement.username}`});
    let passwordEl = document.getElementById("password");
    setAttributes(passwordEl, {"value": `${jsonElement.password}`, "placeholder": `${jsonElement.password}`});
    selectRole();
}



function confirmEdit() {
    let selectedValue = document.getElementById("roleSelection1").value;
    window.location.href = /*[[@{/admin/update/}]]*/ + selectedValue;
}

function setAttributes(el, attrs) {
    for(let key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}