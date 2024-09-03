document.onreadystatechange = function () {
    $("#menu").load(urlsFront("global") + "components/menu/menu.html", function () {
        $("#header").load(urlsFront("global") + "components/header/header.html", function () {
            $("#imports").load(urlsFront("public") + "pages/imports.html", function () {
                verificandoUsuario()
                getSolicitacoesPermitir()

                document.getElementById("aceitarCadastro").onclick = function () {
                    console.log("AAAAAAAAAAA")
                    permitindoNovosUsuarios()
                }
            })
        })
    })
}