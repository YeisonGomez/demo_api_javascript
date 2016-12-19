var code = getParameterByName("code"),
    error = getParameterByName("error");

if (code != null) {

    requestAccessToken(code, function(data) {
        if (data != "token_exist") {
            localStorage.setItem("token", data.access_token);
            localStorage.setItem("refresh", data.refresh_token);
            var user = JSON.parse(data.scope);
            for (var i = 1; i < user.length; i++) {
                user[0].ROL += ', ' + user[i].ROL;
            }
            getUser(user[0]);
        } else {
            requestResource("public_profile", function(data) {
                var user = JSON.parse(data.description);
                for (var i = 1; i < user.length; i++) {
                    user[0].ROL += ', ' + user[i].ROL;
                }
                getUser(user[0]);
            });
        }

    });
} else if (error != null && error == "access_denied") {
    getError('El usuario a rechazado los permisos solicitados por la aplicación.');
}

function getScope() {
    requestResource(document.getElementById("scopes").value, function(data) {
        data = JSON.parse(data.description);
        if (data.length > 0) {
            getInformation(data);
        } else {
            getErrorInformation("El usuario no cuenta con esta información.");
        }
    });
}

function logout(){
    requestLogout(function(data){
        localStorage.clear();
        clearElements("information");
        clearElements("most_information");
        getError('El usuario ha cerrado sesión.');
    });
}
