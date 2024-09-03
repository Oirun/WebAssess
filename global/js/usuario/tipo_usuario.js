function verificandoUsuario() {
    let tipo_user = sessionStorage.getItem("user_t")

    if (tipo_user != "A") {
        document.querySelector(".div-lista-notificacoes").innerHTML = ""
        document.getElementById("li_cadastro_usuario").remove()
        document.getElementById("li_cadastro_profissoes").remove()
        

        if (tipo_user == "U") {
            document.getElementById("li_cadastro_url").remove()
            document.getElementById("li_cadastro").style.display = "none"
            document.getElementById("li_questionario").style.display = "none"
            document.getElementById("li_checklist").style.display = "none"
            document.getElementById("li_relatorios").style.display = "none"
            document.getElementById("titulo_inicio") ? document.getElementById("titulo_inicio").innerHTML = document.getElementById("titulo_inicio").innerHTML + " Avaliador!" : 0
        }else{
            document.getElementById("titulo_inicio") ? document.getElementById("titulo_inicio").innerHTML = document.getElementById("titulo_inicio").innerHTML + " Coordenador!" : 0
        }
    }else{
        document.getElementById("titulo_inicio") ? document.getElementById("titulo_inicio").innerHTML = document.getElementById("titulo_inicio").innerHTML + " Administrador!" : 0
        document.getElementById("li_questionario_responder").style.display = "none"
    }
}