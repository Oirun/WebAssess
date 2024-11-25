function validandoPerguntas(e) {
    e.preventDefault()
    let form = document.getElementById("form_cadastro_checklist")

    if (form.checkValidity()) {
        let metodo
        let url
        console.log(document.getElementById("pergunta").dataset.idPergunta)

        if (sessionStorage.getItem("user_t") == "C") {
            
            if (document.getElementById("pergunta").dataset.idPergunta != null && document.getElementById("pergunta").dataset.idPergunta != "") {
                metodo = "PATCH"
                url = urlsBack("questionarioCoordenador") + "pergunta/update"
            } else {
    
                metodo = "POST"
                url = urlsBack("questionarioCoordenador") + "cadastroPerguntas"
            }
        }else{
            if (document.getElementById("pergunta").dataset.idPergunta != null && document.getElementById("pergunta").dataset.idPergunta != "") {
                metodo = "PATCH"
                url = urlsBack("questionario") + "pergunta/"
            } else {
    
                metodo = "POST"
                url = urlsBack("questionario") + "pergunta"
            }
        }
        adicionarNovaPerguntaAoCheckListSelecionado(metodo, url)
    }

    form.classList.add('was-validated')
}

async function adicionarNovaPerguntaAoCheckListSelecionado(metodo, url) {

    let codigo = document.getElementById("codigo_checklist").value.trim()
    let pergunta = document.getElementById("pergunta").value
    let justificativa = document.getElementById("justificativa").value
    let resultado

    if (metodo == "PATCH") {
        let json = {
            "pergunta": pergunta,
            "justificativa": justificativa,
            "id_pergunta": parseInt(document.getElementById("pergunta").dataset.idPergunta),
        }
        resultado = await request(url, metodo, json)
    } else {
        let json = {
            "pergunta": pergunta,
            "justificativa": justificativa,
            "id_questionario": parseInt(codigo),
        }
        resultado = await request(url, metodo, json)
    }

    // let url = urlsBack("checklist") + "pergunta"
    // console.log(json, url)

    // const resultado = await request(url, "POST", json)

    if (resultado.error) {
        alert(resultado.error)
    } else {
        document.getElementById("pergunta").value = ""
        document.getElementById("justificativa").value = ""
        document.getElementById("form_cadastro_checklist").classList.remove("was-validated")

        if (metodo == "PATCH") {
            Swal.fire({
                title: "Sucesso!",
                text: "Pergunta alterada!",
                icon: "success"
            });
        } else {
            Swal.fire({
                title: "Sucesso!",
                text: "Pergunta adicionada ao check-list!",
                icon: "success"
            });
        }
    }
}