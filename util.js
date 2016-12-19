function getParameterByName(name, url) {
    if (!url) {
        url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function getError(error) {
    document.getElementById("error").innerHTML =
        '<div style="width:60%; margin-left:25%;">\n' +
        '<div class="panel panel-danger">\n' +
        '<div class="panel-heading">\n' +
        '<h3 class="panel-title">Error</h3>\n' +
        '</div>\n' +
        '<div class="panel-body">\n' +
        error +
        '</div>\n' +
        '</div>\n' +
        '</div>';
}

function getUser(user) {
    document.getElementById("avatar").src = user.FOTO;
    document.getElementById("nombres").innerHTML = user.NOMBRES + " " + user.APELLIDOS;
    document.getElementById("correo").innerHTML = user.CORREO;
    document.getElementById("genero").innerHTML = user.GENERO;
    document.getElementById("rh").innerHTML = user.RH;
    document.getElementById("departamento").innerHTML = user.DEPARTAMENTO;
    document.getElementById("municipio").innerHTML = user.MUNICIPIO;
    document.getElementById("rol").innerHTML = user.ROL;
    document.getElementById("estado").innerHTML = user.ESTADO;
    document.getElementById('information').style.display = 'block';

    document.getElementById('most_information').style.display = 'block';
}

function getErrorInformation(error) {
    document.getElementById("information-body").innerHTML = error;
}

function getInformation(data) {
    var information = "";
    for (var i = 0; i < data.length; i++) {
        information += '-------------------------------------------------VALOR ' + (i + 1) + '---------------------------------------------<br/>';
        var obj = data[i];
        for (var key in obj) {
            var attrName = key;
            var attrValue = obj[key];
            information += '<strong>' + attrName + ':</strong><span>  ' + attrValue + '</span><br/>'
        }
    }
    document.getElementById("information-body").innerHTML = information;   
}

function clearElements(id){
    document.getElementById(id).style.display = 'none';
}
