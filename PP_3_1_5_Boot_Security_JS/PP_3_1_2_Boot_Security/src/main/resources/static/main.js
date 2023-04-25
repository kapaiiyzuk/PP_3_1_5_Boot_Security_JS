$(document).ready(function () {
    getAuthUser();
    getAllUsers();
});

const table = document.querySelector('#allUsersTable tbody');
const navEmailAdmin = document.querySelector('#navEmailAdmin');
const navRolesAdmin = document.querySelector('#navRolesAdmin');
const pillsAdmin = document.querySelector('#ifHasRoleAdmin');
const listSelectRoles = document.querySelector('#listRoles');
let temp = '';
let tempPills = '';
let tempListSelect = '';

async function getAuthUser() {
    await fetch('/api/admin')
        .then((response) => response.json())
        .then(user => {

            let allRoles = "";
            user.roles.forEach(role => allRoles += role.name.toString().substring(5) + " ");

            navEmailAdmin.innerHTML = user.email;
            navRolesAdmin.innerHTML = "with roles: " + allRoles;

            if ((allRoles.toString()).includes("ADMIN")) {
                tempPills = '';
                tempPills += "<li class=\"nav-item\">";
                tempPills += "<a href=\"/admin\" class=\"nav-link active\">Admin</a>";
                tempPills += "</li>";
                pillsAdmin.innerHTML = tempPills;
            }
        })
}


async function getAllUsers() {
    await fetch('/api/admin/list')
        .then((response) => response.json())
        .then((users) => {
            users.forEach(user => {

                let allRolesString = "";
                user.roles.forEach(role => allRolesString += role.name.toString().substring(5) + " ");


                temp += "<tr>"
                temp += "<td>" + user.id
                temp += "<td>" + user.username + "</td>"
                temp += "<td>" + user.name + "</td>"
                temp += "<td>" + user.lastname + "</td>"
                temp += "<td>" + user.email + "</td>"
                temp += "<td>" + allRolesString + "</td>"
                temp += "<td>"
                temp += "<button type='button' class='btn btn-info edit-btn'  " +
                    "onclick='getModalEdit(" + user.id + ")' data-toggle='modal'>Edit</button>"
                temp += "</td>"
                temp += "<td>"
                temp += "<button type='button' class='btn btn-danger' " +
                    "onclick='getModalDelete(" + user.id + ")' data-toggle='modal' >Delete</button>"
                temp += "</td>"

            });
            table.innerHTML = temp;
            tempListSelect += "<label for=\"newRole\" class=\"col-form-label\" >Roles</label>"
            tempListSelect += "<select multiple size=\"3\" class=\"custom-select\" id=\"newRole\" name=\"roles\" required>"
            tempListSelect += "<option value=\"ROLE_ADMIN\">ROLE_ADMIN</option>"
            tempListSelect += "<option value=\"ROLE_USER\">ROLE_USER</option>"
            tempListSelect += "<option value=\"ROLE_VIP\">ROLE_VIP</option>"
            tempListSelect += "</select>"
            listSelectRoles.innerHTML = tempListSelect;
            //navEmail.innerHTML = user.email;
        });
    $("#allUsersTable")
}
// list all users

// edit user



function editUser() {
    // await document.getElementById('edit').addEventListener('submit', e => {
    //     e.preventDefault()

    let id = document.getElementById('editID').value;
    let username = document.getElementById('editUserName').value;
    let name = document.getElementById('editFirstName').value;
    let lastname = document.getElementById('editLastName').value;
    let email = document.getElementById('editEmail').value;
    let password = document.getElementById('editPassword').value;

    let rolesDomElem1 = document.getElementById('editRole');
    let rol = [];

    for (let i = 0; i < rolesDomElem1.selectedOptions.length; i++) {
        console.log(rolesDomElem1.selectedOptions[i].value);
        if (rolesDomElem1.selectedOptions[i].value === "ROLE_ADMIN") {
            let role = {
                'id': 1,
                'role': 'ROLE_ADMIN'
            }
            rol.push(role)
        }
        if (rolesDomElem1.selectedOptions[i].value === "ROLE_USER") {
            let role = {
                'id': 2,
                'role': 'ROLE_USER'
            }
            rol.push(role)
        }
        if (rolesDomElem1.selectedOptions[i].value === "ROLE_VIP") {
            let role = {
                'id': 3,
                'role': 'ROLE_VIP'
            }
            rol.push(role)
        }

        if(rolesDomElem1.selectedOptions[i].value === "") {
            return false;
        }
    }

    console.log(rol)

    if (!name) {
        showError('Не заполнено поле firstName');
        return false;
    }
    if (!lastname) {
        showError('Не заполнено поле lastName');
        return false;
    }
    if (!email) {
        showError('Не заполнено поле email');
        return false;
    }
    if (!username) {
        showError('Не заполнено поле login');
        return false;
    }
    if (!password) {
        showError('Не заполнено поле password');
        return false;
    }



    fetch('/api/admin/update', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            id,
            username,
            name,
            lastname,
            email,
            password,
            'roles': rol
        })
    })
        .then(res => {
            console.log("Object for update ")
            console.log(res.json());
            location.assign('/admin')
        })


    // })

    $('#modalData').on("submit", function (e) {
        e.preventDefault();
        getModalEdit()
    });

}

function showError(text) {
    $('#modal-error-text').text(text);
    $('#modal-error').modal();
}
// edit user
// modal for edit user
function getModalEdit(id) {
    fetch('/api/admin/' + id)
        .then(res => res.json())
        .then(user => {
            let modal = document.getElementById('modalData');
            modal.innerHTML = '<div class="modal fade"  id="modalEdit"  tabindex="-1" role="dialog" aria-hidden="true">\n' +
                '                            <div class="modal-dialog">\n' +
                '                                <div class="modal-content">\n' +
                '                                    <div class="modal-header">\n' +
                '                                        <h5 class="modal-title">Edit User</h5>\n' +
                '                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n' +
                '                                            <span aria-hidden="true">&times;</span>\n' +
                '                                        </button>\n' +
                '                                    </div>\n' +
                '                                    <div class="modal-body">\n' +
                '                                        <div class="row justify-content-center align-items-center">\n' +
                '                                            <form class="text-center" method="get" >\n' +
                '                                                <div class="modal-body col-md text-center">\n' +

                '                                        <label class="font-weight-bold">ID</label>\n' +
                '                                        <input type="number"\n' +
                '                                               class="form-control" \n' +
                '                                               name="id" \n' +
                '                                               id="editID" value="' + user.id + '" \n' +
                '                                               readonly> \n' +
                '                                        <br>\n' +

                '                                        <label class="font-weight-bold">User name</label>\n' +
                '                                        <input type="text"\n' +
                '                                               class="form-control"\n' +
                '                                               name="username"\n' +
                '                                               id="editUserName" value="' + user.username + '"\n' +
                '                                               required>\n' +
                '                                        <br>\n' +

                '                                        <label class="font-weight-bold">First name</label>\n' +
                '                                        <input type="text"\n' +
                '                                               class="form-control"\n' +
                '                                               name="firstname"\n' +
                '                                               id="editFirstName" value="' + user.name + '"\n' +
                '                                               required>\n' +
                '                                        <br>\n' +

                '                                        <label class="font-weight-bold">Last name</label>\n' +
                '                                        <input type="text"\n' +
                '                                               class="form-control"\n' +
                '                                               name="lastname"\n' +
                '                                               id="editLastName" value="' + user.lastname + '"\n' +
                '                                               required>\n' +
                '                                        <br>\n' +

                '                                        <label class="font-weight-bold">Email</label>\n' +
                '                                        <input type="text"\n' +
                '                                               class="form-control"\n' +
                '                                               name="email"\n' +
                '                                               id="editEmail" value="' + user.email + '"\n' +
                '                                               required>\n' +
                '                                        <br>\n' +

                '                                        <label class="font-weight-bold">Password</label>\n' +
                '                                        <input type="password"\n' +
                '                                               class="form-control"\n' +
                '                                               name="password"\n' +
                '                                               id="editPassword" value="' + user.password + '"\n' +
                '                                               required>\n' +
                '                                        <br>\n' +
                '                                                    <label class="font-weight-bold">Role</label>\n' +
                '                                                    <select multiple size="3" class="form-control"  id="editRole"\n' +
                '                                                            name="roles" required>\n' +
                '                                                        <option value="ROLE_ADMIN">ROLE_ADMIN</option>\n' +
                '                                                        <option value="ROLE_USER">ROLE_USER</option>\n' +
                '                                                        <option value="ROLE_VIP" >ROLE_VIP</option>\n' +
                '                                                    </select>\n' +
                '                                                </div>\n' +
                '                                            </form>\n' +
                '                                        </div>\n' +
                '                                    </div>\n' +
                '                                    <div class="modal-footer">\n' +
                '                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close\n' +
                '                                        </button>\n' +
                '                                        <button type="submit" data-dismiss="modal" class="btn btn-info" onclick="editUser()">Edit\n' +
                '                                        </button>\n' +
                '                                    </div>\n' +
                '                                </div>\n' +
                '                            </div>\n' +
                '                        </div>';
            $("#modalEdit").modal();
        });
}
// modal for edit user

// delete user
function deleteUser(id) {
    fetch('/api/admin/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Accept': 'application/json'
        }
    })
        .then(res => {
            $('#' + id).remove();
            console.log(res.json());
            location.assign('/admin')
        });
}

// delete user
// modal for delete user
function getModalDelete(id) {
    fetch('/api/admin/' + id)
        .then(res => res.json())
        .then(user => {
            let rolesString = "";
            user.roles.forEach(role => rolesString += role.name + " ");
            let modal = document.getElementById('modalData')
            modal.innerHTML = '<div class="modal fade"  id="delete"  tabindex="-1" role="dialog" aria-hidden="true">\n' +
                '                            <div class="modal-dialog">\n' +
                '                                <div class="modal-content">\n' +
                '                                    <div class="modal-header">\n' +
                '                                        <h5 class="modal-title">Delete User</h5>\n' +
                '                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n' +
                '                                            <span aria-hidden="true">&times;</span>\n' +
                '                                        </button>\n' +
                '                                    </div>\n' +
                '                                    <div class="modal-body">\n' +
                '                                        <div class="row justify-content-center align-items-center">\n' +
                '                                            <form class="text-center" method="get" >\n' +
                '                                                <div class="modal-body col-md text-cente">\n' +

                '                                        <label class="font-weight-bold">ID</label>\n' +
                '                                        <input type="number"\n' +
                '                                               class="form-control" \n' +
                '                                               name="id" \n' +
                '                                               value="' + user.id + '" \n' +
                '                                               readonly> \n' +
                '                                        <br>\n' +

                '                                        <label class="font-weight-bold">Username</label>\n' +
                '                                        <input type="text"\n' +
                '                                               class="form-control"\n' +
                '                                               name="username"\n' +
                '                                               value="' + user.username + '"\n' +
                '                                               readonly>\n' +
                '                                        <br>\n' +

                '                                        <label class="font-weight-bold">First name</label>\n' +
                '                                        <input type="text"\n' +
                '                                               class="form-control"\n' +
                '                                               name="firstname"\n' +
                '                                               value="' + user.name + '"\n' +
                '                                               readonly>\n' +
                '                                        <br>\n' +

                '                                        <label class="font-weight-bold">Last name</label>\n' +
                '                                        <input type="text"\n' +
                '                                               class="form-control"\n' +
                '                                               name="lastname"\n' +
                '                                               value="' + user.lastname + '"\n' +
                '                                               readonly>\n' +
                '                                        <br>\n' +

                '                                        <label class="font-weight-bold">Email</label>\n' +
                '                                        <input type="text"\n' +
                '                                               class="form-control"\n' +
                '                                               name="email"\n' +
                '                                               value="' + user.email + '"\n' +
                '                                               readonly>\n' +
                '                                        <br>\n' +

                '                                        <label class="font-weight-bold">Password</label>\n' +
                '                                        <input type="password"\n' +
                '                                               class="form-control"\n' +
                '                                               name="password"\n' +
                '                                               value="' + user.password + '"\n' +
                '                                               readonly>\n' +
                '                                        <br>\n' +

                '                                                    <label class="font-weight-bold">Role</label>\n' +
                '                                                     <input type="text"\n' +
                '                                                     class="form-control"\n' +
                '                                                     name="role"\n' +
                '                                                     value="' + rolesString + '"\n' +
                '                                                     readonly>\n' +
                '                                                </div>\n' +
                '                                            </form>\n' +
                '                                        </div>\n' +
                '                                    </div>\n' +
                '                                    <div class="modal-footer">\n' +
                '                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close\n' +
                '                                        </button>\n' +
                '                                        <button type="submit" data-dismiss="modal" class="btn btn-danger" onclick="deleteUser(' + user.id + ')">Delete\n' +
                '                                        </button>\n' +
                '                                    </div>\n' +
                '                                </div>\n' +
                '                            </div>\n' +
                '                        </div>';
            $("#delete").modal();
        });
}

// modal for delete user
// add new user
async function addNewUser() {
    await document.getElementById('new').addEventListener('submit', e => {
        e.preventDefault()


        let username = document.getElementById('newUserName').value;
        let name = document.getElementById('newFirstName').value;
        let lastname = document.getElementById('newLastName').value;
        let email = document.getElementById('newEmail').value;
        let password = document.getElementById('newPassword').value;

        let rolesDomElem = document.getElementById('newRole');
        let rol = [];
        for (let i = 0; i < rolesDomElem.selectedOptions.length; i++) {
            console.log(rolesDomElem.selectedOptions[i].value);
            if (rolesDomElem.selectedOptions[i].value === "ROLE_ADMIN") {
                let role = {
                    'id': 1,
                    'role': 'ROLE_ADMIN'
                }
                rol.push(role)
            }
            if (rolesDomElem.selectedOptions[i].value === "ROLE_USER") {
                let role = {
                    'id': 2,
                    'role': 'ROLE_USER'
                }
                rol.push(role)
            }
            if (rolesDomElem.selectedOptions[i].value === "ROLE_VIP") {
                let role = {
                    'id': 3,
                    'role': 'ROLE_VIP'
                }
                rol.push(role)
            }
        }
        console.log(rol);

        fetch('/api/admin/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                username,
                name,
                lastname,
                email,
                password,
                'roles': rol
            })
        })
            .then(res =>
                console.log(res.json()))
            .then(data => location.assign('/admin'))
        //return false;
    })
}