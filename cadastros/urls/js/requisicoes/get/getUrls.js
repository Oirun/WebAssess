document.getElementById("btnConsultaUrls").onclick = async function () {
   await getUrls()
}

async function getUrls() {
    const resultado = await request(urlsBack("url"), "GET")
    console.log(resultado)
    if (resultado.error) {
        console.log("erro ao consultar urls")
    } else {
        document.getElementById("body_consulta_urls").innerHTML = ""
        resultado.forEach(async url =>  {
            console.log(url.questionario == null || url.checklist == null)
            if (url.questionario == null || url.checklist == null) {
                await vinculandoUrlAUmQuestionarioEChecklist(url.id)
            }

            let linha = await criandoLinhaParaTabelaUrl(url)
            document.getElementById("body_consulta_urls").appendChild(linha)
        });
    }
}

async function criandoLinhaParaTabelaUrl(url) {
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

    let quantidadeDeConvidados = await verificandoQuantidadeDeUsuarios(url.id) 

    divConvidado.innerHTML = quantidadeDeConvidados+" Convidados"

    divConvidado.classList = "div-convidado"
    divConvidado.setAttribute("data-bs-toggle", "modal")
    divConvidado.setAttribute("data-bs-target", "#modal-convidar")

    divConvidado.onclick = async function () {
        await getAvaliadoresIncluidos(url.id)
        await pesquisandoAvaliadores(url.id_questionario, url.id_checklist)

        document.getElementById("btnAdicionarAvaliadores").setAttribute("data-idUrl", url.id)
    }

    btnQuestionario.onclick = function () {
        sessionStorage.setItem("id_questionario", url.questionario)
        window.location.replace(urlsFront("questionario")+"pages/index.html") 
    }    

    btnChecklist.onclick = function () {
        sessionStorage.setItem("id_checklist", url.checklist)
        window.location.replace(urlsFront("checklist")+"pages/index.html") 
    }    

    tdConvidados.appendChild(divConvidado)

    row.appendChild(tdUrl)
    row.appendChild(tdDatas)
    row.appendChild(tdStatus)
    row.appendChild(tdConvidados)
    row.appendChild(tdQuestoes)
    row.appendChild(divAcao)

    return row
}

async function verificandoQuantidadeDeUsuarios(id_url) {
    
    let url = urlsBack("questionarioCoordenador")+ "usuariosVinculadosAoQuestinario/"+id_url
    const resultado = await request(url, "GET")

    console.log(resultado)

    if (resultado.error) {
        return 0
    }else{
        return resultado[0].usuarios.length
    }
}