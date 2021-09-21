//login en jv
function login (params) {
    var user, pass;
    user = document.getElementById("Usuario").value;
    pass = document.getElementById("Password").value;

    if (user == "Imer" && pass == "123") {
        window.location= "Menu.html"
        
    } else {
        alert("Error de usuario o pin")
        
    }

}