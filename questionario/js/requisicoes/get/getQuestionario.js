async function getQuestionario() {
    const resultado = await request(urlsBack("questionario") + "doUsuario?tipo=Q", "GET")
    
    if (resultado.error) {
        mostrarAlerta("warning", "Sem resultados para a consulta de questionários.", "Questionario")
    } else {
        document.getElementById("listar-questionarios-cadastrados").innerHTML = ""
        resultado.forEach(questionario => {
            let li = criandoLi(questionario)
            // document.getElementById("listar-questionarios-cadastrados").appendChild(li)
        });
    }
}

function criandoLi(questionario) {
    let input = document.createElement("input")
    let label = document.createElement("label")
    let span = document.createElement("span")
    let div = document.createElement("div")
    let button = document.createElement("button")
    let ico = document.createElement("i")

    div.classList = "d-flex justify-content-md-end"
    button.classList = "btn btn-outline-purple me-md-2"
    button.setAttribute("data-bs-toggle", "modal")
    button.setAttribute("data-bs-target", "#modal_perguntas_questionario")
    button.setAttribute("data-bs-toll", "tooltip")
    button.setAttribute("data-bs-placement", "top")
    button.setAttribute("data-bs-title", "Ver perguntas adicionadas ao check-list.")
    ico.classList = "bi bi-search"

    button.appendChild(ico)
    div.appendChild(button)

    input.classList = "list-group-item-check pe-none"
    input.type = "radio"
    input.name = "radioCheckListaQuestionario"
    input.id = "questionario_radio_"+questionario.id_questionario
    
    label.classList = "list-group-item rounded-3 py-3"
    label.setAttribute("for", input.id)
    label.innerHTML = `<i class="bi bi-caret-right-fill"></i> ${questionario.id_questionario} - ${questionario.titulo}`

    let padrao = questionario.padrao == true ? "Questionário Padrão" : "Questionário não padrão"
    span.classList = "d-block small opacity-50"
    
    let descricao = questionario.descricao == null ? "Sem descrição" : questionario.descricao
    span.innerHTML = `${descricao} <br> ${padrao}`

    label.appendChild(span)
    label.appendChild(div)
    input.onclick = function () {
        preencheCamposAPartirDaPesquisa(questionario)
        document.getElementById("adicionarPergunta").classList.add("d-none")
    }

    button.onclick = function () {
        document.getElementById("span_id_questionario").innerHTML = questionario.id_questionario
        document.getElementById("span_nome_questionario").innerHTML = questionario.titulo
        getQuestionarioPerguntas(questionario.id_questionario,input)
    }

    if (sessionStorage.getItem("user_t") == "C") {
        input.click()
    }

    document.getElementById("listar-questionarios-cadastrados").appendChild(input)
    document.getElementById("listar-questionarios-cadastrados").appendChild(label)
    //document.getElementById("listar-questionarios-cadastrados").appendChild(div)
}
