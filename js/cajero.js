//login en jv
function login (params) {
    var pass;
    pass = document.getElementById("Password").value;

    if (pass == "123") {
        window.location= "Menu.html"
        
    } else {
        alert("Error de pin")
        
    }

}