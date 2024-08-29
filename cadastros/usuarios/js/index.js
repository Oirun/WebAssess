document.onreadystatechange = function () {
    $("#menu").load(urlsFront("global") + "components/menu/menu.html", function () {
        $("#header").load(urlsFront("global") + "components/header/header.html", function () {
            $("#div_cadastro_usuario").load(urlsFront("cadastros") + "usuarios/components/form/cadastroUsuario.html", function () {
                $("#table_consulta_usuario").load(urlsFront("cadastros") + "usuarios/components/table/tableUsuario.html", function () {
                    $("#imports").load(urlsFront("cadastros") + "usuarios/pages/importsJS.html", function () {
                        preencherProfissao("profissao")
                        preencherEscolaridade("escolaridade")

                        getUsuario(true)

                        document.getElementById("btnConsultarUsuario").onclick = function () {
                            getUsuario()
                        }

                        document.getElementById("btnCadastrar").onclick = function () {
                            postUsuarios()
                        }

                        document.getElementById("confirmar_senha").onblur = function () {
                            if (document.getElementById("confirmar_senha").value != document.getElementById("senha").value) {
                                document.getElementById("confirmar_senha").focus()
                                Swal.fire({
                                    title: "Erro!",
                                    text: "As senhas não são iguais, digite novamente!",
                                    icon: "error"
                                });

                            }
                        }
                    })
                })
            })
        })
    })
}