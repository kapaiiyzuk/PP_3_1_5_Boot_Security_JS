$(document).ready(function () {
    getUser();
});

const navEmail = document.querySelector('#navEmail');
const navRoles = document.querySelector('#navRoles');
const pillsAdmin = document.querySelector('#ifHasRoleAdmin');

const table = document.querySelector('#userTable tbody');
let temp = '';
let tempPills = '';

async function getUser() {
    await fetch('/api/user/')
        .then((response) => response.json())
        .then(user => {

            let allRoles = "";
            user.roles.forEach(role => allRoles += role.name.toString().substring(5) + " ");

            temp += "<tr>";
            temp += "<td>" + user.id;
            temp += "<td>" + user.username + "</td>";
            temp += "<td>" + user.name + "</td>";
            temp += "<td>" + user.lastname + "</td>";
            temp += "<td>" + user.email + "</td>";
            temp += "<td>" + allRoles + "</td>";
            temp += "<tr>";
            table.innerHTML = temp;
            navEmail.innerHTML = user.email;
            navRoles.innerHTML = "with roles: " + allRoles;

            if((allRoles.toString()).includes("ADMIN")) {
                tempPills = '';
                tempPills += "<li class=\"nav-item\">";
                tempPills += "<a href=\"/admin\" class=\"nav-link\">Admin</a>";
                tempPills += "</li>";
                pillsAdmin.innerHTML = tempPills;
            }

            console.log(allRoles.toString());
        });
    $("#userTable")
}