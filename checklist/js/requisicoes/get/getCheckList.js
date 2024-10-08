async function getCheckList() {
    const resultado = await request(urlsBack("questionario") + "checklist/doUsuario", "GET")
    document.getElementById("listar-checklist-cadastrados").innerHTML = ""
    if (resultado.error) {
        document.getElementById("listar-checklist-cadastrados").innerHTML = `<input class="list-group-item-check pe-none" type="radio" name="listGroupCheckableRadios" id="listGroupCheckableRadios1" value="" checked="">
                    <label class="list-group-item rounded-3 py-3" for="listGroupCheckableRadios1">
                      Sem resultado
                      <span class="d-block small opacity-50">Nenhum check-list cadastrado.</span>
                    </label>`
    } else {
        resultado.forEach(checklist => {
            let li = criandoLi(checklist)
            // document.getElementById("listar-checklist-cadastrados").appendChild(li)
        });
    }
}

function criandoLi(checklist) {
    console.log(checklist)
    let input = document.createElement("input")
    let label = document.createElement("label")
    let span = document.createElement("span")
    let div = document.createElement("div")
    let button = document.createElement("button")
    let ico = document.createElement("i")

    div.classList = "d-flex justify-content-md-end"
    button.classList = "btn btn-outline-purple me-md-2"
    button.setAttribute("data-bs-toggle", "modal")
    button.setAttribute("data-bs-target", "#modal_perguntas_checklist")
    ico.classList = "bi bi-search"

    button.appendChild(ico)
    div.appendChild(button)

    input.classList = "list-group-item-check pe-none"
    input.type = "radio"
    input.name = "radioCheckListaCheckList"
    input.id = "checklist_radio_"+checklist.id_questionario
    
    label.classList = "list-group-item rounded-3 py-3"
    label.setAttribute("for", input.id)
    label.innerHTML = `<i class="bi bi-caret-right-fill"></i> ${checklist.id_questionario} - ${checklist.titulo}`

    let padrao = checklist.padrao == true ? "Check-List Padrão" : "Check-List não padrão"
    span.classList = "d-block small opacity-50"
    span.innerHTML = `${checklist.descricao} <br> ${padrao}`

    label.appendChild(span)
    label.appendChild(div)
    input.onclick = function () {
        preencheCamposAPartirDaPesquisa(checklist)
        document.getElementById("adicionarPergunta").classList.add("d-none")
    }

    button.onclick = function () {
        document.getElementById("span_id_checklist").innerHTML = checklist.id_questionario
        document.getElementById("span_nome_checklist").innerHTML = checklist.titulo
        getCheckListPerguntas(checklist.id_questionario, input)
    }

    document.getElementById("listar-checklist-cadastrados").appendChild(input)
    document.getElementById("listar-checklist-cadastrados").appendChild(label)
}