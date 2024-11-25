async function getQuestionarioPerguntas(id_questionario, input) {
    let url = ""
    if (sessionStorage.getItem("user_t") == "C") {
        url = urlsBack("questionarioCoordenador") + "consultaPerguntas/"+id_questionario
    } else {
        url = urlsBack("questionario") + "perguntas/"+id_questionario+"?tipo=Q"
    }

    const resultado = await request(url, "GET")
    
    document.getElementById("body_consulta_perguntas_questionario").innerHTML = ""
    if (resultado.error) {
        // alert(resultado.error)
        mostrarAlerta("warning", "Sem resultados para a consulta de perguntas.", "Questionario")
    } else {
        resultado.perguntas.forEach(pergunta => {
            
            let li = criandoLiPerguntas(pergunta, input)
            document.getElementById("body_consulta_perguntas_questionario").appendChild(li)
        });
    }

    const tooltipTriggerList = document.querySelectorAll('[data-bs-tool="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
}

function criandoLiPerguntas(pergunta, input) {

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
    tdPergunta.innerHTML = pergunta.pergunta

    div.classList = "d-flex gap-2"
    buttonEditar.classList = "btn btn-outline-dark"
    buttonEditar.setAttribute("data-bs-tool", "tooltip")
    buttonEditar.setAttribute("data-bs-placement", "top")
    buttonEditar.setAttribute("data-bs-title", "Editar pergunta.")
    buttonDeletar.classList = "btn btn-outline-dark"

    icoEditar.classList = "bi bi-pencil"
    icoDeletar.classList = "bi bi-trash"

    buttonEditar.appendChild(icoEditar)
    buttonDeletar.appendChild(icoDeletar)
    div.appendChild(buttonEditar)
    // div.appendChild(buttonDeletar)
    tdAcoes.appendChild(div)

    row.appendChild(tdId)
    row.appendChild(tdPergunta)
    row.appendChild(tdAcoes)

    buttonEditar.onclick = function () {
        input.click()
        preencheCamposAPartirDaPesquisaDasPerguntas(pergunta)
        document.getElementById("adicionarPergunta").classList.remove("d-none")
        document.getElementById("fecharModalPerguntas").click()
    }

    return row
}