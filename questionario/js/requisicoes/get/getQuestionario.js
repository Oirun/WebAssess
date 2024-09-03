async function getQuestionario() {
    const resultado = await request(urlsBack("questionario") + "doUsuario", "GET")
    document.getElementById("listar-questionarios-cadastrados").innerHTML = ""
    if (resultado.error) {
        alert(resultado.error)
    } else {
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

    input.classList = "list-group-item-check pe-none"
    input.type = "radio"
    input.name = "radioCheckListaQuestionario"
    input.id = "questionario_radio_"+questionario.id_questionario
    
    label.classList = "list-group-item rounded-3 py-3"
    label.setAttribute("for", input.id)
    label.innerHTML = `<i class="bi bi-caret-right-fill"></i> ${questionario.id_questionario} - ${questionario.titulo}`

    let padrao = questionario.padrao == true ? "Questionário Padrão" : "Questionário não padrão"
    span.classList = "d-block small opacity-50"
    span.innerHTML = `${questionario.descricao} <br> ${padrao}`

    label.appendChild(span)

    input.onclick = function () {
        preencheCamposAPartirDaPesquisa(questionario)
        document.getElementById("adicionarPergunta").classList.add("d-none")
    }

    document.getElementById("listar-questionarios-cadastrados").appendChild(input)
    document.getElementById("listar-questionarios-cadastrados").appendChild(label)
}