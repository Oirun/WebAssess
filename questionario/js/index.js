document.onreadystatechange = function () {
    $("#menu").load(urlsFront("global") + "components/menu/menu.html", function () {
        $("#header").load(urlsFront("global") + "components/header/header.html", function () {
            $("#formulario_questionario_cadastro").load(urlsFront("questionario") + "components/form/criarQuestionario.html", function () {
                $("#div-modal-perguntas-questionario").load(urlsFront("questionario") + "components/modal/modalPerguntas.html", function () {
                    $("#imports").load(urlsFront("questionario") + "pages/imports.html", function () {
                   
                        verificandoUsuario()
                        getQuestionario()

                        document.getElementById("btnCadastrarQuestionario").onclick = function (e) {
                            validateForm(e)
                        }

                        // ------- liberando campos de pergunta para adicionar ao questionario
                        document.getElementById("liberarCamposPerguntas").onclick = function () {
                            // document.getElementById("liberarCamposPerguntas").disabled = true
                            let desabilitar
                            let questionario

                            if (document.getElementById("liberarCamposPerguntas").checked == true) {
                                desabilitar = false
                                questionario = true
                                document.getElementById("lbl_liberar_campo").innerHTML = "Liberar campos de questionário."
                                document.getElementById("adicionarPergunta").classList.remove("d-none")
                                document.getElementById("btnCadastrarQuestionario").disabled = true
                            } else {
                                desabilitar = true
                                questionario = false
                                document.getElementById("lbl_liberar_campo").innerHTML = "Liberar campos de pergunta."
                                document.getElementById("adicionarPergunta").classList.remove("add")
                                document.getElementById("btnCadastrarQuestionario").disabled = false
                            }

                            document.getElementById("principio").disabled = desabilitar
                            document.getElementById("pergunta").disabled = desabilitar
                            document.getElementById("justificativa").disabled = desabilitar

                            document.getElementById("codigo_questionario").disabled = questionario
                            document.getElementById("nome_questionario").disabled = questionario
                            document.getElementById("descricao_questionario").disabled = questionario
                        }
                        //------ adicionando novas perguntas ao questionário
                        document.getElementById("adicionarPergunta").onclick = function (e) {
                            validandoPerguntas(e)
                        }

                    })
                })
            })
        })
    })
}