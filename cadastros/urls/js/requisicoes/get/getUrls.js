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
        resultado.forEach(async url => {
            console.log(url.questionario == null || url.checklist == null)

            if (url.questionario == null || url.checklist == null) {
                await vinculandoUrlAUmQuestionarioEChecklist(url.id)
            }

            let linha = await criandoLinhaParaTabelaUrl(url)
            document.getElementById("body_consulta_urls").appendChild(linha)
        });
    }
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toll="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

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
    tdDatas.innerHTML = `${url.data_inicio.split("-")[2]}/${url.data_inicio.split("-")[1]}/${url.data_inicio.split("-")[0]} <br>${url.data_fim.split("-")[2]}/${url.data_fim.split("-")[1]}/${url.data_fim.split("-")[0]}`
    // tdStatus.innerHTML = ""

    let quantidadeDeConvidados = await verificandoQuantidadeDeUsuarios(url.id)

    divConvidado.innerHTML = quantidadeDeConvidados + " Convidados"

    divConvidado.classList = "div-convidado"
    divConvidado.setAttribute("data-bs-toggle", "modal")
    divConvidado.setAttribute("data-bs-target", "#modal-convidar")

    divConvidado.onclick = async function () {
        await getAvaliadoresIncluidos(url.id)
        await pesquisandoAvaliadores(url.id)

        document.getElementById("btnAdicionarAvaliadores").setAttribute("data-idUrl", url.id)
    }

    btnQuestionario.onclick = function () {
        sessionStorage.setItem("id_questionario", url.questionario)
        window.location.replace(urlsFront("questionario") + "pages/index.html")
    }

    btnChecklist.onclick = function () {
        sessionStorage.setItem("id_checklist", url.checklist)
        window.location.replace(urlsFront("checklist") + "pages/index.html")
    }

    btnEditar.onclick = function () {
        preencheCamposUrls(url)
        document.getElementById("pills-profile-tab").innerHTML = "Editar"
        document.getElementById("titulo_cad_urls").innerHTML = "Editando Urls"
        document.getElementById("pills-profile-tab").click()
    }

    if (sessionStorage.getItem("user_t") == "A") {
        btnChecklist.disabled = true
        btnQuestionario.disabled = true
    }

    if (quantidadeDeConvidados > 0) {
        btnQuestionario.disabled = true
        btnChecklist.disabled = true
        btnEditar.disabled = true

        btnQuestionario.setAttribute("data-bs-toll", "tooltip")
        btnQuestionario.setAttribute("data-bs-placement", "top")
        btnQuestionario.setAttribute("data-bs-custom-class", "custom-tooltip")
        btnQuestionario.setAttribute("data-bs-title", "Após incluir convidados a essa url, o questionário não pode ser alterado.")

    }

    tdConvidados.appendChild(divConvidado)

    row.appendChild(tdUrl)
    row.appendChild(tdDatas)
    // row.appendChild(tdStatus)
    row.appendChild(tdConvidados)
    row.appendChild(tdQuestoes)
    row.appendChild(divAcao)

    return row
}

async function verificandoQuantidadeDeUsuarios(id_url) {

    let url = urlsBack("questionarioCoordenador") + "usuariosVinculadosAoQuestinario/" + id_url
    const resultado = await request(url, "GET")

    console.log(resultado)

    if (resultado.error) {
        return 0
    } else {
        return resultado[0].usuarios.length
    }
}

function preencheCamposUrls(url) {

    document.getElementById("url_codigo").value = url.id
    document.getElementById("url_website").value = url.url
    // document.getElementById("url_data_inicio").value = url.data_inicio
    // document.getElementById("url_data_fim").value = url.data_fim
    document.getElementById("url_descricao").value = url.descricao
    // if (url.ativo == "A") {
    //     document.getElementById("url_ativo").click() 
    // }else{
    //     document.getElementById("url_inativo").click() 
    // }

}