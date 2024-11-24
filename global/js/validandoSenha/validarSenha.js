function validandoSenha(campo_senha, idConfirmarSenha, idForm) {
    document.getElementById("div-senha").classList.remove("d-none")
    let senha = campo_senha.value 
    let regex = ""
    
    regex = /(?=.*[a-z])/g //verifica se tem pelo menos uma letra minuscula

    if (regex.test(senha)) { 
        document.getElementById("um_minusculo").classList.add("certo")
        document.getElementById("um_minusculo").classList.add("bi-check2")
        document.getElementById("um_minusculo").classList.remove("errado")
        document.getElementById("um_minusculo").classList.remove("bi-x")
    }else{
        document.getElementById("um_minusculo").classList.remove("certo")
        document.getElementById("um_minusculo").classList.remove("bi-check2")
        document.getElementById("um_minusculo").classList.add("errado")
        document.getElementById("um_minusculo").classList.add("bi-x")
    }

    regex = /.{8,}/g // verifica se tem 8 digitos

    if (regex.test(senha)) { 
        document.getElementById("oito_caractere").classList.add("certo")
        document.getElementById("oito_caractere").classList.add("bi-check2")
        document.getElementById("oito_caractere").classList.remove("errado")
        document.getElementById("oito_caractere").classList.remove("bi-x")
    }else{
        document.getElementById("oito_caractere").classList.remove("certo")
        document.getElementById("oito_caractere").classList.remove("bi-check2")
        document.getElementById("oito_caractere").classList.add("errado")
        document.getElementById("oito_caractere").classList.add("bi-x")
    }


    regex = /(?=.*[A-Z])/g //verifica se tem pelo menos uma letra maiuscula

    if (regex.test(senha)) { 
        document.getElementById("um_maiusculo").classList.add("certo")
        document.getElementById("um_maiusculo").classList.add("bi-check2")
        document.getElementById("um_maiusculo").classList.remove("errado")
        document.getElementById("um_maiusculo").classList.remove("bi-x")
    }else{
        document.getElementById("um_maiusculo").classList.remove("certo")
        document.getElementById("um_maiusculo").classList.remove("bi-check2")
        document.getElementById("um_maiusculo").classList.add("errado")
        document.getElementById("um_maiusculo").classList.add("bi-x")
    }

    regex = /(?=.*[0-9])/g //verifica se tem pelo menos um numero

    if (regex.test(senha)) { 
        document.getElementById("um_numero").classList.add("certo")
        document.getElementById("um_numero").classList.add("bi-check2")
        document.getElementById("um_numero").classList.remove("errado")
        document.getElementById("um_numero").classList.remove("bi-x")
    }else{
        document.getElementById("um_numero").classList.remove("certo")
        document.getElementById("um_numero").classList.remove("bi-check2")
        document.getElementById("um_numero").classList.add("errado")
        document.getElementById("um_numero").classList.add("bi-x")
    }

    regex = /([!@#$%*()_+^&}{:;?.])/g //verifica se tem pelo menos um caractere especial

    if (regex.test(senha)) { 
        document.getElementById("um_especial").classList.add("certo")
        document.getElementById("um_especial").classList.add("bi-check2")
        document.getElementById("um_especial").classList.remove("errado")
        document.getElementById("um_especial").classList.remove("bi-x")
    }else{
        document.getElementById("um_especial").classList.remove("certo")
        document.getElementById("um_especial").classList.remove("bi-check2")
        document.getElementById("um_especial").classList.add("errado")
        document.getElementById("um_especial").classList.add("bi-x")
    }

    validandoSenhaConfirmar(document.getElementById(idConfirmarSenha), "senha", campo_senha.id, idForm)
}

function validandoSenhaConfirmar(confirmarSenha, senhaOninput, idCampoSenha, idForm) {
    console.log("oi")

    let campoSenha = document.getElementById(idCampoSenha)
    let form = document.getElementById(idForm)
    console.log(document.getElementById(idCampoSenha), idCampoSenha)
    if (campoSenha.value != "" && campoSenha.value != " " && campoSenha.value != null && campoSenha.value != undefined) {        
        if ( campoSenha.value != confirmarSenha.value) {
            form.querySelector(".senhaInvalida").style.display = "block"
            form.querySelector(".senhaValida").style.display = "none"
            if (senhaOninput != "senha") {
                // confirmarSenha.focus()
            }
        }else{
            form.querySelector(".senhaValida").style.display = "block"
            form.querySelector(".senhaInvalida").style.display = "none"
        }
    }
}