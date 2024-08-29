function verificandoUsuario() {
    let tipo_user = sessionStorage.getItem("user_t")

    if (tipo_user != "A") {
        document.querySelector(".div-lista-notificacoes").innerHTML = ""
        document.getElementById("li_cadastro_usuario").remove()
        document.getElementById("li_cadastro_profissoes").remove()

        if (tipo_user == "U") {
            document.getElementById("li_cadastro_url").remove()
        }
    }
}