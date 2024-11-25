function validandoPerguntas(e) {
    e.preventDefault()
    let form = document.getElementById("form_responder_questionario")
    let retorno
    
    if (form.checkValidity()) {
        retorno = enviandoResposta()
    }else{
        retorno = false
    }

    form.classList.add('was-validated')

    return retorno
}

async function enviandoResposta() {

    let resposta = document.querySelector(".txtpadraoResposta").value
    let id_pergunta = document.querySelector(".txtpadraoResposta").id.replace("pergunta_", "")

    let radios = document.querySelector(`input[name="radioRes_${id_pergunta}"]:checked`).id.replace("_"+id_pergunta, "")
    let radioRes = ""

    switch (radios) {
        case "radioRuim":
            radioRes = 1
            break;
        case "radioRegular":
            radioRes = 2
            break;
        case "radioBom":
            radioRes = 3
            break;
        case "radioMuitoBom":
            radioRes = 4
            break;
        case "radioOtimo":
            radioRes = 4
            break;
        case "radioSim":
            radioRes = 1
            break;      
        case "radioNao":
            radioRes = 2
            break;      
        case "radioNaoAplica":
            radioRes = 3
            break;      
        default:
            break;
    }

    let jsonResposta = {
        "id_pergunta" : parseInt(id_pergunta),
        "descricao" : resposta,
        "resposta" : radioRes
    }
    let url = urlsBack("questionarioAvaliador")+"respondePergunta"
    const resultado = await request(url, "POST", jsonResposta)
  
    if (resultado.error) {
        mostrarAlerta("error", resultado.error, "Respostas")
    } else {
        
        setTimeout(() => {
            document.getElementById("form_responder_questionario").classList.remove("was-validated")
            document.getElementById("descricao_questionario").classList.add("d-none")
        }, 1000);
       
        mostrarAlerta("success", "Resposta Enviada", "Respostas")
        return true
    }
}