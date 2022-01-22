
let roleList = [
    {id: 1, role: "ROLE_USER"},
    {id: 2, role: "ROLE_ADMIN"}
]

let isUser = true;

const userFetch = {
    head: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=UTF-8',
        'Referer': null
    },
    getAllUsers: async () => await fetch('api/users'),
    getUserByUsername: async () => await fetch(`api/users/name`),
    getUserById: async (id) => await fetch(`api/users/${id}`),
    addUser: (user) => fetch('api/users', {method: "POST", headers: userFetch.head, body: JSON.stringify(user)}),
    updateUser: async (user, id) => await fetch(`api/users/${id}`, {method: 'PUT', headers: userFetch.head, body: JSON.stringify(user)}),
    deleteUser: async (id) => await fetch(`api/users/${id}`, {method: 'DELETE', headers: userFetch.head})
}

allFunctions()

function allFunctions() {
    infoUser();
    getUsers();
}

function infoUser() {
    userFetch.getUserByUsername()
        .then(res => res.json())
        .then(user => {
            console.log(user);
            let stringRoles = getRoles(user.roles);
            document.querySelector('#infoUser').innerHTML = `
                ${user.username} with roles:  ${stringRoles}
            `
        });
}

function getUsers() {
    userFetch.getAllUsers()
        .then(res => res.json())
        .then(users => {users.forEach((user) => {
            let stringRoles = getRoles(user.roles);
            document.querySelector('#tableUsers').insertAdjacentHTML('beforeend',
                `<tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.age}</td>
                <td>${user.surname}</td>
                <td>${user.username}</td>
                <td>${stringRoles}</td>
                <td>
                <button type="button" onclick="editUser(${user.id})"
                class="btn btn-info edit-btn" data-toggle="modal" data-target="#edit" id="editUser">Edit</button>
                </td>
                <td>
                <button type="button" onclick="deleteUserById(${user.id})" 
                class="btn btn-danger" data-toggle="modal" data-target="#delete">Delete</button>
                </td>
                </tr>`);
        })
        });
}

function addUserData() {
    document.addEventListener('DOMContentLoaded', addUserData);
        console.log("add3");
        let name = document.getElementById('addName').value;
        console.log(name);
        let age = document.getElementById('addAge').value;
        let surname = document.getElementById('addSurname').value;
        let username = document.getElementById('addUsername').value;
        let password = document.getElementById('addPassword').value;
        let roles = document.getElementById('addRoles').value;
        let user = {
            name:name,
            age:age,
            surname:surname,
            username:username,
            password:password,
            roles:roles
        };
        userFetch.addUser(user);
        // let stringRoles = getRoles(user.roles);
        document.querySelector('#tableUsers').insertAdjacentHTML('beforeend',
            `<tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.age}</td>
                <td>${user.surname}</td>
                <td>${user.username}</td>
                <td>${roles}</td>
                <td>
                <button type="button" onclick="editUser(${user.id})"
                class="btn btn-info edit-btn" data-toggle="modal" data-target="#edit" id="editUser">Edit</button>
                </td>
                <td>
                <button type="button" onclick="deleteUserById(${user.id})" 
                class="btn btn-danger" data-toggle="modal" data-target="#delete">Delete</button>
                </td>
                </tr>`);
    }

    // function addUserData() {
    //     let name = document.getElementById('addName');
    //     let age = document.getElementById('addAge');
    //     let surname = document.getElementById('addSurname');
    //     let username = document.getElementById('addUsername');
    //     let password = document.getElementById('addPassword');
    //     let roles = addRoles(document.getElementById('addRoles'));
    //     let user = {
    //         name:name,
    //         age:age,
    //         surname:surname,
    //         username:username,
    //         password:password,
    //         roles:roles
    //     };
    //     console.log(user)
    //     userFetch.addUser(user);
    //     let stringRoles = getRoles(user.roles);
    //     document.querySelector('#tableUsers').insertAdjacentHTML('beforeend',
    //         `<tr>
    //             <td>${user.id}</td>
    //             <td>${user.name}</td>
    //             <td>${user.age}</td>
    //             <td>${user.surname}</td>
    //             <td>${user.username}</td>
    //             <td>${stringRoles}</td>
    //             <td>
    //             <button type="button" onclick="editUser(${user.id})"
    //             class="btn btn-info edit-btn" data-toggle="modal" data-target="#edit" id="editUser">Edit</button>
    //             </td>
    //             <td>
    //             <button type="button" onclick="deleteUserById(${user.id})"
    //             class="btn btn-danger" data-toggle="modal" data-target="#delete">Delete</button>
    //             </td>
    //             </tr>`);
    // }


function editUser(id) {
    fetch("/api/users/" + id, {method: 'GET', dataType: 'json',})
        .then(res => {
            res.json().then(user => {
                $('#name').val(user.name)
                $('#age').val(user.age)
                $('#surname').val(user.surname)
                $('#username').val(user.username)
                $('#password').val(user.password)
                $('#roles').val(user.roles)
            })
        })
}

function updateUser() {
    let name =  document.getElementById('name').value;
    let age = document.getElementById('age').value;
    let surname = document.getElementById('surname').value;
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let roles = getRoles(Array.from(document.getElementById('roles').selectedOptions)
        .map(role => role.value));
    fetch("/api/users/" + id, {
        method: "PATCH",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify({
            name: name,
            age: age,
            surname: surname,
            username: username,
            password: password,
            roles: roles
        })
    })
        .then(() => {
            userInfo.empty();
            getUsers();
            closeForm();
        })
}

function deleteUserById(id) {
    fetch("/api/users/" + id, {method: 'GET', dataType: 'json',})
        .then(res => {
            res.json().then(user => {
                $('#name').val(user.name)
                $('#age').val(user.age)
                $('#surname').val(user.surname)
                $('#username').val(user.username)
                $('#password').val(user.password)
                $('#roles').val(user.roles)
            })
        })
}

function deleteUser() {
    fetch("/api/users/" + ($('#deleteId').val()), {method: "DELETE"})
        .then(() => {
            userInfo.empty();
            getUsers();
            closeForm();
        })
}

function closeForm() {
    $("#edit .close").click();
    document.getElementById("editUserForm").reset();
    $("#delete .close").click();
    document.getElementById("deleteUserForm").reset();
    $('#deleteRole > option').remove();
}

function getRoles(list) {
    let userRoles = [];
    list.forEach((role) => {
        if (String(role.name).indexOf("USER") >= 0) {
            userRoles.push(" USER");
        }
        if (String(role.name).indexOf("ADMIN") >= 0) {
            userRoles.push(" ADMIN");
        }
    })
    let stringRoles = userRoles.join("  ");
    return stringRoles;
}

function addRoles(role) {
    let roles = [];
    if (String(role).indexOf("ADMIN") >= 0) {
        roles.push("ROLE_ADMIN");
    }
    roles.push("ROLE_USER");
    return roles;
}