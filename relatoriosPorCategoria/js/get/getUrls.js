document.getElementById("btnConsultaUrls").onclick = async function () {
    await getUrls()
}

async function getUrls() {
    const resultado = await request(urlsBack("url"), "GET")
    
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

    btnQuestionario.onclick = async function () {
       preencheInfosInicio(url, quantidadeDeConvidados, url.questionario, true)
    }

    btnChecklist.onclick = function () {
        preencheInfosInicio(url, quantidadeDeConvidados, url.checklist, false)
    }

    btnEditar.onclick = function () {
        preencheCamposUrls(url)
        document.getElementById("pills-profile-tab").innerHTML = "Editar"
        document.getElementById("titulo_cad_urls").innerHTML = "Editando Urls"
        document.getElementById("pills-profile-tab").click()
    }

    tdConvidados.appendChild(divConvidado)

    row.appendChild(tdUrl)
    row.appendChild(tdDatas)
    // row.appendChild(tdStatus)
    // row.appendChild(tdConvidados)
    row.appendChild(tdQuestoes)
    // row.appendChild(divAcao)

    return row
}

async function preencheInfosInicio(url, quantidadeDeConvidados, id_questionario_checklist, questionario) {
    document.getElementById("dados_relatorio_inicio_url").innerHTML = `<strong>URL: </strong>${url.url}`
    document.getElementById("dados_relatorio_inicio_coordenador").innerHTML = `<strong>Período de Avaliação :</strong> ${url.data_inicio.split("-")[2]}/${url.data_inicio.split("-")[1]}/${url.data_inicio.split("-")[0]} à ${url.data_fim.split("-")[2]}/${url.data_fim.split("-")[1]}/${url.data_fim.split("-")[0]}`
    document.getElementById("dados_relatorio_inicio_total_avaliadores").innerHTML = `<strong> Total de Avaliadores:</strong> ${quantidadeDeConvidados}`

    let urlReq = urlsBack("relatorios") + "porProfissao/" + id_questionario_checklist

    const resultado = await request(urlReq, "GET")
    // http://localhost/tcc/api/v1/relatorios/porPerguntas/49
    console.log(resultado)

    if (resultado.error) {
        if (questionario == true) {
            mostrarAlerta("error", "Nenhum avaliador respondeu a este questionário", "PorProfissao")
        }else{
            mostrarAlerta("error", "Nenhum avaliador respondeu a este check-list", "PorProfissao")
        }
        return resultado.error
    } else {
        chartdiv.innerHTML = ""
        document.getElementById("body_relatorio_questionario_profissao").innerHTML = ""
        document.querySelector(".dados_relatorio_inicio").classList.remove("d-none")
        let dataGrafico = []
        resultado.forEach(element => {
            let linha = criaLinhaRelatorio(element)
            dataGrafico.push({"value": element.total_perguntas_respondidas, "category" : element.nome_profissao})
        });

        criarGrafico(dataGrafico) 

        document.getElementById("pills-relatorio-tab").click()
    }
}

function criaLinhaRelatorio(profissao) {
    let row = document.createElement("tr")
    let tdProfissao = document.createElement("td")
    let tdRespostas = document.createElement("td")

    tdProfissao.innerHTML = profissao.nome_profissao
    tdRespostas.innerHTML = profissao.total_perguntas_respondidas

    row.appendChild(tdProfissao)
    row.appendChild(tdRespostas)

    document.getElementById("body_relatorio_questionario_profissao").appendChild(row)
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