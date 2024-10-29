document.onreadystatechange = function () {
    $("#menu").load(urlsFront("global") + "components/menu/menu.html", function () {
        $("#header").load(urlsFront("global") + "components/header/header.html", function () {
            $("#formulario_questionario_cadastro").load(urlsFront("questionario") + "components/form/criarQuestionario.html", function () {
                $("#div-modal-perguntas-questionario").load(urlsFront("questionario") + "components/modal/modalPerguntas.html", function () {
                    $("#imports").load(urlsFront("questionario") + "pages/imports.html", async function () {
                        console.log("index")
                        verificandoUsuario()
                        await preencherPrincipio("principio")
                        
                        if (sessionStorage.getItem("id_questionario") && (sessionStorage.getItem("id_questionario") != undefined || sessionStorage.getItem("id_questionario") != "undefined" || sessionStorage.getItem("id_questionario") != "" || sessionStorage.getItem("id_questionario") != null)) {
                            await getQuestionarioCoordenador(sessionStorage.getItem("id_questionario"))
                            document.getElementById("container_radios").classList.add("d-none")
                            sessionStorage.getItem("id_questionario") ? sessionStorage.removeItem("id_questionario") : 0
                        }else{
                            if (sessionStorage.getItem("user_t") == "C") {
                                alert("Usuário Coordenador sem questionário próprio cadastrado, retorne a tela de urls para obter um novo questionário, refaça a consulta.")
                                window.location.replace(urlsFront("public")+"pages/principal.html") 
                            }else if (sessionStorage.getItem("user_t") == "A") {
                                await getQuestionario()
                            }else{
                                alert("Usuário sem permissão para acessar está tela.")
                                window.location.replace(urlsFront("public")+"pages/principal.html") 
                            }
                        }

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