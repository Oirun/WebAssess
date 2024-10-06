function construindoLinha(elemento, parametro) {
    let row = document.createElement("tr")
    let tdId = document.createElement("td")
    let tdDescricao = document.createElement("td")
    let tdAcao = document.createElement("td")
    let div = document.createElement("div")
    let buttonEditar = document.createElement("button")
    let icoEditar = document.createElement("i")
    let buttonDeletar = document.createElement("button")
    let icoDeletar = document.createElement("i")

    let id = ""
    let descricao = ""

    if (parametro == "profissao") {
        id = elemento.id_profissao
        descricao = elemento.nome_profissao
    } else  if (parametro == "escolaridade") {
        id = elemento.id_escolaridade
        descricao = elemento.nome_escolaridade
    }else{
        
    }

    tdId.innerHTML = id
    tdDescricao.innerHTML = descricao 

    div.classList = "d-flex gap-2"
    buttonEditar.classList = "btn btn-outline-dark"
    buttonDeletar.classList = "btn btn-outline-dark"

    icoEditar.classList = "bi bi-pencil"
    icoDeletar.classList = "bi bi-trash"

    row.appendChild(tdId)
    row.appendChild(tdDescricao)
    buttonEditar.appendChild(icoEditar)
    buttonDeletar.appendChild(icoDeletar)
    div.appendChild(buttonEditar)
    div.appendChild(buttonDeletar)
    tdAcao.appendChild(div)
    row.appendChild(tdAcao)

    return row
}