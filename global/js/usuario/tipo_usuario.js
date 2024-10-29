function verificandoUsuario() {
    let tipo_user = sessionStorage.getItem("user_t")

    if (tipo_user != "A") {
        document.querySelector("#notificacoes__usuarios") ? document.querySelector("#notificacoes__usuarios").innerHTML = "" : 0
        document.getElementById("li_cadastro_usuario") ? document.getElementById("li_cadastro_usuario").remove() : 0
        document.getElementById("li_cadastro_profissoes") ? document.getElementById("li_cadastro_profissoes").remove() : 0
        document.getElementById("li_questionario") ? document.getElementById("li_questionario").remove() : 0
        document.getElementById("li_checklist") ? document.getElementById("li_checklist").remove() : 0

        if (tipo_user == "U") {
            document.getElementById("li_cadastro_url") ? document.getElementById("li_cadastro_url").remove() : 0
            document.getElementById("li_cadastro").style.display = "none"
            document.getElementById("li_relatorios").style.display = "none"
            document.getElementById("titulo_inicio") ? document.getElementById("titulo_inicio").innerHTML = document.getElementById("titulo_inicio").innerHTML + " Avaliador!" : 0
            document.getElementById("div_urls_convidados") ? document.getElementById("div_urls_convidados").style.display = "block" : 0
        }else{
            document.getElementById("titulo_inicio") ? document.getElementById("titulo_inicio").innerHTML = document.getElementById("titulo_inicio").innerHTML + " Coordenador!" : 0
        }
    }else{
        document.getElementById("titulo_inicio") ? document.getElementById("titulo_inicio").innerHTML = document.getElementById("titulo_inicio").innerHTML + " Administrador!" : 0
        // document.getElementById("li_questionario_responder").style.display = "none"
        // document.getElementById("li_checklist_responder").style.display = "none"
    }
}