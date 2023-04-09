
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
let rolesFromUrl;



function main(){
    currentUser();
    fetch(urlUsers).then(res => res.json())
        .then(data => {
            let json = data;
            let keys = Object.keys(json);
            for (let k in keys) {
                createTr(json[k]);

            }
        });
    roleSelection();

}


function roleSelection() {
    let selectEl1 = document.getElementById("roleSelection1");
    let selectEl = document.getElementById("roleSelection");
    let selectEl2 = document.getElementById("roleSelection2");

    let roles;
    fetch(urlRoles).then(res => res.json())
        .then(data => {
            roles = data;
            let keys = Object.keys(roles);
            for (let k in keys) {
                rolesFromUrl = roles[k];
                console.log(rolesFromUrl);

                let optEl1 = document.createElement("option");
                optEl1.innerText = roles[k].name;
                setAttributes(optEl1, {"value": `${roles[k].id}`, "name": "roles", "type":"number"});
                selectEl1.appendChild(optEl1);

                let optEl = document.createElement("option");
                optEl.innerText = roles[k].name;
                setAttributes(optEl, {"value": `${roles[k].id}`, "name": "roles", "type":"number"});
                selectEl.appendChild(optEl);

                let optEl2 = document.createElement("option");
                optEl2.innerText = roles[k].name;
                setAttributes(optEl2, {"value": `${roles[k].id}`, "name": "roles", "type":"number"});
                selectEl2.appendChild(optEl2);
            }
        });

}

// auth user
function currentUser() {
    fetch(urlAuth).then(res => res.json())
        .then(data => {
            let json = data;
            document.getElementById('headerUser1').innerHTML = json.email;
            document.getElementById('headerUser2').innerHTML = json.role["name"];
            createCurrentUserTr(json)

        });
}

// создание/обновление таблицы
function createTr(jsonElement) {
    let createRow = document.createElement("tr");
    let newRow = document.getElementById("userList").appendChild(createRow);
    let keys = Object.keys(jsonElement.authority);
    let allRoles = "";
    for (let k in keys) {
        allRoles += jsonElement.authority[k]["name"] + " ";
    }

    createRow.setAttribute("id", `user${jsonElement.id}`)
    let propArray = [jsonElement.id, jsonElement.first_name, jsonElement.last_name, jsonElement.age,
        jsonElement.email, allRoles]


    for (let i = 0; i < 6; i++) {
        newRow.insertCell(i).innerHTML = propArray[i];

    }
    newRow.insertCell(6).innerHTML = createEditButton(jsonElement.id).innerHTML;
    newRow.insertCell(7).innerHTML = createDeleteButton(jsonElement.id).innerHTML;

    let editButton = document.getElementById(`edit${jsonElement.id}`);
    let deleteButton = document.getElementById(`del${jsonElement.id}`);

    modalFill(editButton, 1);
    modalFill(deleteButton, 2);
}

function createCurrentUserTr(jsonElement) {
    let createRow = document.createElement("tr");
    let newRow = document.getElementById("authUser").appendChild(createRow);
    let keys = Object.keys(jsonElement.authority);
    let allRoles = "";
    for (let k in keys) {
        allRoles += jsonElement.authority[k]["name"] + " ";
    }

    createRow.setAttribute("id", `user${jsonElement.id}`)
    let propArray = [jsonElement.id, jsonElement.first_name, jsonElement.last_name, jsonElement.age,
        jsonElement.email, allRoles]


    for (let i = 0; i < 6; i++) {
        newRow.insertCell(i).innerHTML = propArray[i];

    }

}

function deleteTr(id) {
    let delRow = document.getElementById(`user${id}`);
    let userTable = document.getElementById("userTable");
    let i = delRow.rowIndex;
    userTable.deleteRow(i)

}

function updateTr(jsonElement, roleNum) {
    let changeRow = document.getElementById(`user${jsonElement.id}`);
    let keys = Object.keys(jsonElement.authority);
    let allRoles = "";
    for (let k in keys) {
        allRoles += jsonElement.authority[k]["name"] + " ";
    }
    let propArray = [jsonElement.id, jsonElement.first_name, jsonElement.last_name, jsonElement.age,
        jsonElement.email, allRoles]


    for (let i = 0; i < 7; i++) {
        if (i == 6) {

        } else {
            changeRow.children[i].innerText = propArray[i];
        }

    }

}

//создание кнопок
function createEditButton(userId) {
    const divEdit = document.createElement("div");
    const editButton = document.createElement("button");
    editButton.innerHTML = "Edit";
    divEdit.appendChild(editButton);
    setAttributes(editButton, {"id":`edit${userId}`, "type":"button", "class": "btn btn-info", "data-toggle":"modal", "data-whatever":"@userID", "data-target":`#modalForUser`});

    return divEdit;
}
function createDeleteButton(userId) {
    const divDelete = document.createElement("div");
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    divDelete.appendChild(deleteButton);
    setAttributes(deleteButton, {"id":`del${userId}`, "type":"button", "class": "btn btn-danger", "data-toggle":"modal", "data-whatever":"@userID2", "data-target":`#modalDeleteForUser`});

    return divDelete;
}

function modalFill(button, editOrDel) {
    let userId = button.parentNode.parentNode.children[0].innerText;
    button.addEventListener("click", function() {
        fetch(urlUsers).then(res => res.json())
            .then(data => {
                let keys = Object.keys(data);
                for( let k in keys) {
                    if (data[k].id == userId) {
                        console.log("прогрузка модального окна")
                        fillUserModal(data[k], editOrDel);
                    }
                }
            })
    })


}



function fillUserModal(json, editOrDel) {

    let jsonElement = json;

    let idEl = document.getElementById(`id${editOrDel}`);

    setAttributes(idEl, {
        "value": `${jsonElement.id}`,
        "placeholder": `${jsonElement.id}`})
    let firstNameEl = document.getElementById(`first_name${editOrDel}`);
    setAttributes(firstNameEl, {
        "value": `${jsonElement.first_name}`,
        "placeholder": `${jsonElement.first_name}`
    });
    let lastNameEl = document.getElementById(`last_name${editOrDel}`);
    setAttributes(lastNameEl, {
        "value": `${jsonElement.last_name}`,
        "placeholder": `${jsonElement.last_name}`
    });
    let ageEl = document.getElementById(`age${editOrDel}`);
    setAttributes(ageEl, {
        "value": `${jsonElement.age}`,
        "placeholder": `${jsonElement.age}`});
    let emailEl = document.getElementById(`email${editOrDel}`);
    setAttributes(emailEl, {
        "value": `${jsonElement.email}`,
        "placeholder": `${jsonElement.email}`});
    let usernameEl = document.getElementById(`username${editOrDel}`);
    setAttributes(usernameEl, {
        "value": `${jsonElement.username}`,
        "placeholder": `${jsonElement.username}`
    });
    let passwordEl = document.getElementById(`password${editOrDel}`);
    setAttributes(passwordEl, {
        "value": `${jsonElement.password}`,
        "placeholder": `${jsonElement.password}`
    });

}

const postForm = document.getElementById("userAddForm");
postForm.addEventListener('submit', handleFormSubmit);

const addForm = document.getElementById("userEditForm");
addForm.addEventListener('submit', handleFormSubmit);

const delForm = document.getElementById("userDeleteForm");
delForm.addEventListener('submit', handleFormSubmit);



function serializeForm(formNode) {

    return new FormData(formNode);
}

function submitUpdForm(event) {
    return new Promise((resolve, reject) => {
        let data = serializeForm(event.target);

        const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let jsonResponse = JSON.parse(xhr.responseText);
            console.log(jsonResponse)
            updateTr(jsonResponse, event.target[8].value)
        } else {
            console.log(xhr.responseText)
        }
    }
    xhr.open("PATCH", "http://localhost:8080/people/update", true, "admin", "admin")
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
        xhr.send(data)
    })
}

function submitDelForm(event) {
    return new Promise((resolve, reject) => {
        let data = serializeForm(event.target);
        let userId = event.target[1].value;
        console.log(event.target[1].value);
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 204) {
                console.log("success")
                deleteTr(userId)
            } else {
                console.log(xhr.responseText)
            }
        }
        xhr.open("DELETE", "http://localhost:8080/people/delete", true, "admin", "admin")
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
        xhr.send(data)
    })
}

function submitPostForm(event) {
    return new Promise((resolve, reject) => {
        let data = serializeForm(event.target);
        data.set('first_name', event.target[0].value)
        data.set('last_name', event.target[1].value)

        console.log(data.get('first_name'));
        console.log(data.get('last_name'))

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log("success")
                let json = JSON.parse(xhr.responseText);
                console.log(json)
                createTr(json)
                updateTr(json)
            } else {
            }
        }
        xhr.open("POST", "http://localhost:8080/people/create", true, "admin", "admin")
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
        xhr.send(data)
    })
}
async function handleFormSubmit(event) {
    event.preventDefault()
    let call = event.target.action;
    if (call == "http://localhost:8080/people/update") {
        submitUpdForm(event)
            .then(data => console.log(data))
            .catch(err => console.log(err));
    } else if (call == "http://localhost:8080/admin/delete") {
        submitDelForm(event)
            .then(data => console.log(data))
            .catch(err => console.log(err));
    } else if (call == "http://localhost:8080/people/create") {
        submitPostForm(event)
            .then(data => console.log(data))
            .catch(err => console.log(err));
    }

}

function setAttributes(el, attrs) {
    for(let key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}