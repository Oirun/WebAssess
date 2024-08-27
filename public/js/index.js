document.onreadystatechange = function () {
    $("#menu").load(urlsFront("global") + "components/menu/menu.html", function () {
        $("#header").load(urlsFront("global") + "components/header/header.html", function () {
            $("#imports").load(urlsFront("cadastros") + "usuarios/pages/importsJS.html", function () {
                verificandoUsuario()
            })
        })
    })
}