
let xttp = new XMLHttpRequest();

xttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        main(this.responseText)
        console.log("list for table loaded")
    }
}

xttp.open("GET", "http://localhost:8080/people/list", true, "admin", "admin")
xttp.send();


const urlUsers = "http://localhost:8080/people/list";
const urlAuth = "http://localhost:8080/people/current";
const urlRoles ="http://localhost:8080/people/roles";



function main(){
    currentUser();
    fetch(urlUsers).then(res => res.json())
        .then(data => {
            let json = data;
            let keys = Object.keys(json);
            for (let k in keys) {
                createTr(json[k]);
                let editButton = document.getElementsByClassName("btn-info")[k];
                modalEditFill(editButton);
            }

        });
    roleSelection();

}

function roleSelection() {
    let selectEl1 = document.getElementById("roleSelection1");
    let selectEl = document.getElementById("roleSelection");
    // let selectEl2 = document.getElementById("roleSelection2");

    let roles;
    fetch(urlRoles).then(res => res.json())
        .then(data => {
            roles = data;
            let keys = Object.keys(roles);
            for (let k in keys) {
                let optEl1 = document.createElement("option");
                optEl1.innerText = roles[k].name;
                setAttributes(optEl1, {"value": `${roles[k].id}`, "name": "rol", "type": "number"});
                selectEl1.appendChild(optEl1);

                let optEl = document.createElement("option");
                optEl.innerText = roles[k].name;
                setAttributes(optEl, {"value": `${roles[k].id}`, "name": "rol", "type": "number"});
                selectEl.appendChild(optEl);
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
    let newText = newCell.innerText;
    let keys = Object.keys(jsonElement.authority);
    let allRoles = "";
    for (let k in keys) {
        allRoles += jsonElement.authority[k]["name"] + " ";
    }


    let propArray = [jsonElement.id, jsonElement.first_name, jsonElement.last_name, jsonElement.age,
        jsonElement.email, allRoles]


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

}

function confirmCreate() {

}

function confirmEdit() {



}

const addForm = document.getElementById("userEditForm");
addForm.addEventListener('submit', handleFormSubmit);
function confirmDelete() {

}

function serializeForm(formNode) {

    return new FormData(formNode);
}

async function sendData(data) {
    console.log("sendData" + data)
    return await fetch('/people/update/', {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: data,
    }).catch((error) => {
        console.log(`error ${error}`);
    })
}

function onSuccess() {
    alert("Commited");
}

function submitForm(event) {
    return new Promise((resolve, reject) => {

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            alert(xhr.responseText);
        } else {
            alert(`trouble :( ${xhr.responseText}`)
        }
    }
    xhr.open("PATCH", "http://localhost:8080/people/update", true, "admin", "admin")
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        xhr.onload = () => {
        if (xhr.status >= 400) {
            reject(xhr.response);
        } else {
            resolve(xhr.response);
        }
    }
    xhr.onerror = () => {
        reject(xhr.response);
    }
    let role = event.target.children(9).id
    console.log(role);
    xhr.send(JSON.stringify(event.target))
    })
}
async function handleFormSubmit(event) {
    event.preventDefault()
    console.log(event)

    submitForm(event)
        .then(data => console.log(data))
        .catch(err => console.log(err));
    // const data = serializeForm(event.target);
    // const { status, error } = await sendData(data);
    //
    // if (status === 200) {
    //     onSuccess();
    // }
    // else {
    //     onError(error);
    // }
}

function onError(error) {
    alert(error.message);
}

function setAttributes(el, attrs) {
    for(let key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}