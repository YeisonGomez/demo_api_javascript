var api_url = "http://chaira.udla.edu.co/api/v0.1";

function requestAccessToken(code, callback) {
    var http = new XMLHttpRequest();
    var params = {
        grant_type: "authorization_code",
        code: code,
        redirect_uri: "http://localhost:3000",
        client_id: "919207462918",
        client_secret: "l31dj7e645jww7po9xe42gymr0oxkn",
        state: "xyz"
    };

    http.open('POST', api_url + '/oauth2/authorize.asmx/token', true);
    http.setRequestHeader("Content-type", "application/json");
    http.send(JSON.stringify(params));

    http.onreadystatechange = function(e) {
        if (http.readyState == 4) {
            if (http.status == 200) {
                var res = JSON.parse(this.response.replace('{"d":null}', ''));
                if (res.state == "xyz") {
                    callback(res);
                } else if (res.type == "invalid_grant") {
                    if (localStorage.getItem("token") != null) {
                        callback("token_exist");
                    } else {
                        getError('El codigo es invalido.');
                    }
                }
            }
        }
    };
}

function requestResource(scope, callback) {
    var http = new XMLHttpRequest();
    var params = {
        access_token: localStorage.getItem("token"),
        scope: scope
    };

    http.open('POST', api_url + '/oauth2/resource.asmx/scope', true);
    http.setRequestHeader("Content-type", "application/json");
    http.send(JSON.stringify(params));

    http.onreadystatechange = function(e) {
        if (http.readyState == 4) {
            if (http.status == 200) {
                var res = JSON.parse(this.response.replace('{"d":null}', ''));
                if (res.state == "OK") {
                    callback(res);
                } else if (res.type == "invalid_scope") {
                    getErrorInformation("La aplicación no tiene permisos necesarios para esta información.");
                } else {
                    getErrorInformation(res.description);
                }
            }
        }
    };
}

function requestLogout(callback) {
    var http = new XMLHttpRequest();
    var params = {
        access_token: localStorage.getItem("token")
    };

    http.open('POST', api_url + '/oauth2/resource.asmx/logout', true);
    http.setRequestHeader("Content-type", "application/json");
    http.send(JSON.stringify(params));

    http.onreadystatechange = function(e) {
        if (http.readyState == 4) {
            if (http.status == 200) {
                var res = JSON.parse(this.response.replace('{"d":null}', ''));
                if (res.state == "OK") {
                    callback(res);
                }
            }
        }
    };
}
