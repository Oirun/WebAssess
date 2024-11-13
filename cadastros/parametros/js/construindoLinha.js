function construindoLinha(elemento, parametro) {
    let row = document.createElement("tr")
    let tdId = document.createElement("td")
    let tdDescricao = document.createElement("td")
    let tdStatus = document.createElement("td")
    let tdAcao = document.createElement("td")
    let div = document.createElement("div")
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
    }

    tdId.innerHTML = id
    tdDescricao.innerHTML = descricao
    tdStatus.innerHTML = elemento.ativa == true ? "Ativo" : "Inativo"

    div.classList = "d-flex gap-2"
    buttonDeletar.classList = "btn btn-outline-dark"

    buttonDeletar.onclick = async function () {
        let url = urlsBack("users")+parametro+"/delete/"+id
        const resultado = await request(url, "DELETE")

        if (resultado.error) {
            alert(resultado.error)
        }else{
            alert("Item deletado.")
            getParametros(parametro)
        }
    }

    icoDeletar.classList = "bi bi-trash"

    row.appendChild(tdId)
    row.appendChild(tdDescricao)
    row.appendChild(tdStatus)
    buttonDeletar.appendChild(icoDeletar)
    div.appendChild(buttonDeletar)
    tdAcao.appendChild(div)
    row.appendChild(tdAcao)

    return row
}