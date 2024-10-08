document.getElementById("btnConsultaUrls").onclick = function () {
    getUrls()
}

async function getUrls() {
    const resultado = await request(urlsBack("url"), "GET")

    if (resultado.error) {
        console.log("erro ao consultar urls")
    } else {
        document.getElementById("body_consulta_urls").innerHTML = ""
        resultado.forEach(url => {
            let linha = criandoLinhaParaTabelaUrl(url)
            document.getElementById("body_consulta_urls").appendChild(linha)
        });
    }
}

function criandoLinhaParaTabelaUrl(url) {
    let row = document.createElement("tr")
    let tdUrl = document.createElement("td")
    let tdDatas = document.createElement("td")
    let tdStatus = document.createElement("td")
    let tdConvidados = document.createElement("td")
    let tdQuestoes = document.createElement("td")
    let divAcao = document.createElement("td")
    let btnEditar = document.createElement("button")
    let ico = document.createElement("i")
    let divConvidado = document.createElement("div")
    
    let divQuestionario = document.createElement("div")
    let btnQuestionario = document.createElement("button")
    let icoQuestionario = document.createElement("i")
    
    let divCheckList = document.createElement("div")
    let btnChecklist = document.createElement("button")
    let icoCheckList = document.createElement("i")

    btnEditar.classList = "btn btn-outline-dark"
    ico.classList = "bi bi-pencil"

    btnQuestionario.classList = "btn btn-outline-success"
    btnChecklist.classList = "btn btn-outline-primary"
    icoQuestionario.classList = "bi bi-journal-text"
    icoCheckList.classList = "bi bi-ui-checks"

    tdQuestoes.classList = "d-flex gap-1"

    btnQuestionario.appendChild(icoQuestionario)
    btnChecklist.appendChild(icoCheckList)
    divQuestionario.appendChild(btnQuestionario)
    divCheckList.appendChild(btnChecklist)
    tdQuestoes.appendChild(divQuestionario)
    tdQuestoes.appendChild(divCheckList)

    btnEditar.appendChild(ico)
    divAcao.appendChild(btnEditar)

    tdUrl.innerHTML = url.url
    tdDatas.innerHTML = ""
    tdStatus.innerHTML = ""
    divConvidado.innerHTML = "0 Convidados"

    divConvidado.classList = "div-convidado"
    tdConvidados.appendChild(divConvidado)

    row.appendChild(tdUrl)
    row.appendChild(tdDatas)
    row.appendChild(tdStatus)
    row.appendChild(tdConvidados)
    row.appendChild(tdQuestoes)
    row.appendChild(divAcao)

    return row
}