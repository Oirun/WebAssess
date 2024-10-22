document.onreadystatechange = function () {
    $("#menu").load(urlsFront("global") + "components/menu/menu.html", function () {
        $("#header").load(urlsFront("global") + "components/header/header.html", function () {
            $("#div_cadastro_usuario").load(urlsFront("cadastros") + "usuarios/components/form/cadastroUsuario.html", function () {
                $("#table_consulta_usuario").load(urlsFront("cadastros") + "usuarios/components/table/tableUsuario.html", function () {
                    $("#imports").load(urlsFront("cadastros") + "usuarios/pages/importsJS.html", function () {
                        verificandoUsuario()
                        preencherProfissao("profissao")
                        preencherEscolaridade("escolaridade")

                        getUsuario(true)
                        let idUsuarioPermitir = JSON.parse(sessionStorage.getItem("jsonUsuarioPermitir"))
                      
                        if (idUsuarioPermitir != null && idUsuarioPermitir.id_usuario > 0) {
                            getUsuario(true, idUsuarioPermitir.id_usuario)
                            sessionStorage.removeItem("jsonUsuarioPermitir")
                        }

                        document.getElementById("btnConsultarUsuario").onclick = function () {
                            getUsuarioTabela()
                        }

                        document.getElementById("btnCadastrar").onclick = function (e) {
                            validateForm(e)
                        }
                    })
                })
            })
        })
    })
}