document.onreadystatechange = function () {
    $("#menu").load(urlsFront("global") + "components/menu/menu.html", function () {
        $("#header").load(urlsFront("global") + "components/header/header.html", function () {
            $("#formulario_checklist_cadastro").load(urlsFront("checklist") + "components/form/formCheckList.html", function () {
                $("#div-modal-perguntas-checklist").load(urlsFront("checklist") + "components/modal/modalPerguntas.html", function () {
                    $("#imports").load(urlsFront("checklist") + "pages/imports.html", async function () {
                        verificandoUsuario()
                        
                        if (sessionStorage.getItem("id_checklist") && (sessionStorage.getItem("id_checklist") != undefined || sessionStorage.getItem("id_checklist") != "undefined" || sessionStorage.getItem("id_checklist") != "" || sessionStorage.getItem("id_checklist") != null)) {
                            await getChecklistCoordenador(sessionStorage.getItem("id_checklist"))
                            document.getElementById("container_radios").classList.add("d-none")
                            // sessionStorage.getItem("id_checklist") ? sessionStorage.removeItem("id_checklist") : 0
                        }else{
                            if (sessionStorage.getItem("user_t") == "C") {
                                alert("Usuário Coordenador sem questionário próprio cadastrado, retorne a tela de urls para obter um novo questionário, refaça a consulta.")
                                window.location.replace(urlsFront("public")+"pages/principal.html") 
                            }else if (sessionStorage.getItem("user_t") == "A") {
                                await getCheckList()
                            }else{
                                alert("Usuário sem permissão para acessar está tela.")
                                window.location.replace(urlsFront("public")+"pages/principal.html") 
                            }
                        }

                        document.getElementById("btnCadastrarCheckList").onclick = function (e) {
                            validateForm(e)
                        }

                        // ------- liberando campos de pergunta para adicionar ao checklist
                        document.getElementById("liberarCamposPerguntas").onclick = function () {
                            // document.getElementById("liberarCamposPerguntas").disabled = true
                            let desabilitar
                            let checklist

                            if (document.getElementById("liberarCamposPerguntas").checked == true) {
                                desabilitar = false
                                checklist = true
                                document.getElementById("lbl_liberar_campo").innerHTML = "Liberar campos de questionário."
                                document.getElementById("adicionarPergunta").classList.remove("d-none")
                                document.getElementById("btnCadastrarCheckList").disabled = true
                            } else {
                                desabilitar = true
                                checklist = false
                                document.getElementById("lbl_liberar_campo").innerHTML = "Liberar campos de pergunta."
                                document.getElementById("adicionarPergunta").classList.remove("add")
                                document.getElementById("btnCadastrarCheckList").disabled = false
                            }

                            document.getElementById("pergunta").disabled = desabilitar
                            document.getElementById("justificativa").disabled = desabilitar

                            document.getElementById("codigo_checklist").disabled = checklist
                            document.getElementById("nome_checklist").disabled = checklist
                            document.getElementById("descricao_checklist").disabled = checklist
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