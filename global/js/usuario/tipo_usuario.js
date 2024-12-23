function verificandoUsuario() {
    let tipo_user = sessionStorage.getItem("user_t")

    if (tipo_user != "A") {
        
        document.getElementById("li_cadastro_usuario") ? document.getElementById("li_cadastro_usuario").remove() : 0
        document.getElementById("li_cadastro_profissoes") ? document.getElementById("li_cadastro_profissoes").remove() : 0
        document.getElementById("li_questionario") ? document.getElementById("li_questionario").remove() : 0
        document.getElementById("li_checklist") ? document.getElementById("li_checklist").remove() : 0

        if (tipo_user == "U") {
            document.querySelector("#notificacoes__usuarios") ? document.querySelector("#notificacoes__usuarios").innerHTML = "" : 0
            document.querySelector("#notificacoes__usuarios_avaliador") ? document.querySelector("#notificacoes__usuarios_avaliador").innerHTML = "" : 0
            document.getElementById("li_cadastro_url") ? document.getElementById("li_cadastro_url").remove() : 0
            document.getElementById("li_cadastro").style.display = "none"
            document.getElementById("li_relatorios").style.display = "none"
            document.getElementById("titulo_inicio") ? document.getElementById("titulo_inicio").innerHTML = document.getElementById("titulo_inicio").innerHTML + " Avaliador!" : 0
            document.getElementById("div_urls_convidados") ? document.getElementById("div_urls_convidados").style.display = "block" : 0

            let menu_icon_fechado = document.querySelector(".menu-curto")
            let button_menu = menu_icon_fechado.querySelectorAll("div.menu-curto-buttons-icon")
            button_menu[1].classList.add("d-none")
            button_menu[2].classList.add("d-none")
            button_menu[3].classList.add("d-none")
            button_menu[4].classList.add("d-none")
        
        }else{
            document.getElementById("titulo_inicio") ? document.getElementById("titulo_inicio").innerHTML = document.getElementById("titulo_inicio").innerHTML + " Coordenador!" : 0
            document.querySelector("#notificacoes__usuarios") ? document.querySelector("#notificacoes__usuarios").querySelector("h2").innerHTML = "Atalho URLs" : 0
            document.querySelector("#notificacoes__usuarios") ? document.querySelector("#notificacoes__usuarios").querySelector("#aceitarCadastro").classList.add("d-none") : 0
            document.querySelector("#irUrl") ? document.querySelector("#irUrl").classList.remove("d-none") : 0
            document.querySelector("#urls_cadastradas") ? document.querySelector("#urls_cadastradas").classList.remove("d-none") : 0

            let menu_icon_fechado = document.querySelector(".menu-curto")
            let button_menu = menu_icon_fechado.querySelectorAll("div.menu-curto-buttons-icon")
            // button_menu[1].classList.add("d-none")
            button_menu[2].classList.add("d-none")
            button_menu[3].classList.add("d-none")
            button_menu[1].querySelectorAll("div.div-menu-curto ul li")[0].classList.add("d-none")
            button_menu[1].querySelectorAll("div.div-menu-curto ul li")[2].classList.add("d-none")
         
            // button_menu[0].querySelectorAll("div.div-menu-curto")[2].classList.add("d-none")
        }
    }else{
        document.getElementById("titulo_inicio") ? document.getElementById("titulo_inicio").innerHTML = document.getElementById("titulo_inicio").innerHTML + " Administrador!" : 0
    }
}