async function getCheckList() {
    const resultado = await request(urlsBack("questionario") + "doUsuario?tipo=C", "GET")
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
    let input = document.createElement("input")
    let label = document.createElement("label")
    let span = document.createElement("span")

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

    input.onclick = function () {
        preencheCamposAPartirDaPesquisa(checklist)
        document.getElementById("adicionarPergunta").classList.add("d-none")
    }

    document.getElementById("listar-checklist-cadastrados").appendChild(input)
    document.getElementById("listar-checklist-cadastrados").appendChild(label)
}