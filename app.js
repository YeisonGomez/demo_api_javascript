var code = getParameterByName("code"),
    error = getParameterByName("error");

if (code != null) {

	requestAccessToken(code, function(data){
		localStorage.setItem("token", data.access_token);
		localStorage.setItem("refresh", data.refresh_token);
		var user = JSON.parse(data.scope);
		for (var i = 1; i < user.length; i++) {
			user[0].ROL += ', ' + user[i].ROL;
		}
		getUser(user[0]);
	});

} else if (error != null && error == "access_denied") {

    getError('El usuario a rechazado los permisos solicitados por la aplicaciòn.');
}
