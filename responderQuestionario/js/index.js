document.onreadystatechange = function () {
    $("#menu").load(urlsFront("global") + "components/menu/menu.html", function () {
        $("#header").load(urlsFront("global") + "components/header/header.html", function () {
            $("#formulario_questionario_convidados").load(urlsFront("responderQuestionario") + "components/form/criarQuestionario.html", function () {
                $("#imports").load(urlsFront("responderQuestionario") + "pages/imports.html", function () {

                    verificandoUsuario()
                    console.log("to no responder")
                    getQuestionarioPerguntasConvidados()

                    document.getElementById("btnSalvarResposta").onclick = async function (e) {
                        let deuCerto = await validandoPerguntas(e)
                        if (deuCerto == true) {
                            rotacionandoPergunta()
                        }else{
                            alert("deu problema")
                        }
                    }
                    
                    document.getElementById("btnVoltar").onclick = function () {
                        document.getElementById("btnVoltar").classList.add("d-none")
                        window.location.replace(urlsFront("public")+"pages/principal.html")
                    }
                   
                })
            })
        })
    })
}