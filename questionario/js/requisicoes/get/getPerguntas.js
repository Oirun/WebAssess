async function getQuestionario() {
    const resultado = await request(urlsBack("questionario") + "doUsuario", "GET")
    document.getElementById("body_consulta_perguntas_questionario").innerHTML = ""
    if (resultado.error) {
        alert(resultado.error)
    } else {
        resultado.forEach(pergunta => {
            let li = criandoLi(pergunta)
            document.getElementById("body_consulta_perguntas_questionario").appendChild(li)
        });
    }
}

function criandoLi(pergunta) {
    let row = document.createElement("tr")
    let tdId = document.createElement("td")
    let tdPergunta = document.createElement("td")
    let tdAcoes = document.createElement("td")
    let div = document.createElement("div")
    let buttonEditar = document.createElement("button")
    let buttonDeletar = document.createElement("button")
    let icoEditar = document.createElement("i")
    let icoDeletar = document.createElement("i")

    tdId.innerHTML = pergunta.id_pergunta
    tdPergunta.innerHTML = pergunta.descricao

    div.classList = "d-flex gap-2"
    buttonEditar.classList = "btn btn-outline-dark"
    buttonDeletar.classList = "btn btn-outline-dark"

    icoEditar.classList = "bi bi-pencil"
    icoDeletar.classList = "bi bi-pencil"

    buttonEditar.appendChild(icoEditar)
    buttonDeletar.appendChild(icoDeletar)
    div.appendChild(buttonEditar)
    div.appendChild(buttonDeletar)
    tdAcoes.appendChild(div)

    row.appendChild(tdId)
    row.appendChild(tdPergunta)
    row.appendChild(tdAcoes)

    buttonEditar.onclick = function () {
        preencheCamposAPartirDaPesquisaDasPerguntas(pergunta)
        document.getElementById("adicionarPergunta").classList.add("d-none")
    }

    return row
}