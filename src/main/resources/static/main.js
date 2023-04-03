
let xttp = new XMLHttpRequest();

xttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        main(this.responseText)
        console.log("ajaxed")
    }
}

xttp.open("GET", "http://localhost:8080/people/list", true)
xttp.send();


const urlUsers = "http://localhost:8080/people/list";
const urlAuth = "http://localhost:8080/people/current"



function main(){
    currentUser();
    fetch(urlUsers).then(res => res.json())
        .then(data => {
            let json = data;
            let keys = Object.keys(json);
            console.log(keys);
            for (let k in keys) {
                console.log(json[k]);
                createTr(json[k]);
                let editButton = document.getElementsByClassName("btn-info")[k];
                modalEditFill(editButton);
            }

        });

}

function currentUser() {
    fetch(urlAuth).then(res => res.json())
        .then(data => {
            let json = data;
            document.getElementById('headerUser1').innerHTML = json.email;
            document.getElementById('headerUser2').innerHTML = json.role["name"];
        });
}

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
    setAttributes(editButton, {"type":"button", "class": "btn btn-info", "data-toggle":"modal", "data-whatever":"@userID", "data-target":`#modalForUser`});

    return divEdit;
}

function modalEditFill(editButton) {

    let userId = editButton.parentNode.parentNode.children[0].innerText;

    editButton.addEventListener("click", function() {
        fetch(urlUsers).then(res => res.json())
            .then(data => {
                let keys = Object.keys(data);
                for( let k in keys) {
                    if (data[k].id == userId) {
                        console.log("прогрузка модального окна")
                        fillUserEdit(data[k], editButton);
                    } else {
                        console.log("id не равно указаному")
                    }
                }
            })
    })


}



function fillUserEdit(json, editButton) {

                let jsonElement = json;

                let idEl = document.getElementById("id");

                setAttributes(idEl, {
                    "value": `${jsonElement.id}`,
                    "placeholder": `${jsonElement.id}`})
                let firstNameEl = document.getElementById("first_name");
                setAttributes(firstNameEl, {
                    "value": `${jsonElement.first_name}`,
                    "placeholder": `${jsonElement.first_name}`
                });
                let lastNameEl = document.getElementById("last_name");
                setAttributes(lastNameEl, {
                    "value": `${jsonElement.last_name}`,
                    "placeholder": `${jsonElement.last_name}`
                });
                let ageEl = document.getElementById("age");
                setAttributes(ageEl, {
                    "value": `${jsonElement.age}`,
                    "placeholder": `${jsonElement.age}`});
                let emailEl = document.getElementById("email");
                setAttributes(emailEl, {
                    "value": `${jsonElement.email}`,
                    "placeholder": `${jsonElement.email}`});
                let usernameEl = document.getElementById("username");
                setAttributes(usernameEl, {
                    "value": `${jsonElement.username}`,
                    "placeholder": `${jsonElement.username}`
                });
                let passwordEl = document.getElementById("password");
                setAttributes(passwordEl, {
                    "value": `${jsonElement.password}`,
                    "placeholder": `${jsonElement.password}`
                });
                let rolesEl = document.getElementById("roleSelection1");
                let roles;
                fetch(urlUsers).then(res => res.json())
                    .then(data => {
                        let keys = Object.keys(data);
                        for (let k in keys) {
                            roles += data[k].role;
                            console.log(`${roles}`)
                        }
                    })
    setAttributes(rolesEl, {})
}

function confirmCreate() {

}

function confirmEdit() {



}

const editForm = document.getElementById("userEditForm");
editForm.addEventListener('submit', handleFormSubmit);
function confirmDelete() {

}

function setAttributes(el, attrs) {
    for(let key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}