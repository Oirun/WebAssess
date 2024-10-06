document.onreadystatechange = function () {
    $("#menu").load(urlsFront("global") + "components/menu/menu.html", function () {
        $("#header").load(urlsFront("global") + "components/header/header.html", function () {
            $("#div_modal_profissoes").load(urlsFront("cadastros") + "parametros/components/modal/modalProfissoes.html", function () {
                $("#div_modal_escolaridade").load(urlsFront("cadastros") + "parametros/components/modal/modalEscolaridade.html", function () {
                    $("#div_modal_principio").load(urlsFront("cadastros") + "parametros/components/modal/modalPrincipio.html", function () {
                        $("#div_cards").load(urlsFront("cadastros") + "parametros/components/card/cardsCadastros.html", function () {
                            $("#imports").load(urlsFront("cadastros") + "parametros/pages/imports.html", function () {
                                document.getElementById("card_profissao").src = urlsFront("global") + "util/image/profissao.svg"
                                document.getElementById("card_escolaridade").src = urlsFront("global") + "util/image/escolaridade.svg"
                                document.getElementById("card_principio").src = urlsFront("global") + "util/image/principio.svg"
                                verificandoUsuario()
                                console.log(urlsFront("global") + "util/image/profissao.svg")

                                document.getElementById("btnConsultaProfissao").onclick = function () {
                                    getParametros("profissao")
                                }
                                document.getElementById("btnConsultaEscolaridade").onclick = function () {
                                    getParametros("escolaridade")
                                }
                            })
                        })
                    })
                })
            })
        })
    })
}