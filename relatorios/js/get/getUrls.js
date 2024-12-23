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

    btnQuestionario.onclick = function () {
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
    document.getElementById("url_descricao").value = url.descricao

}

async function preencheInfosInicio(url, quantidadeDeConvidados, id_ques_check, questionario) {
    document.getElementById("dados_relatorio_inicio_url").innerHTML = `<strong>URL: </strong>${url.url}`
    document.getElementById("dados_relatorio_inicio_coordenador").innerHTML = `<strong>Período de Avaliação :</strong> ${url.data_inicio.split("-")[2]}/${url.data_inicio.split("-")[1]}/${url.data_inicio.split("-")[0]} à ${url.data_fim.split("-")[2]}/${url.data_fim.split("-")[1]}/${url.data_fim.split("-")[0]}`
    document.getElementById("dados_relatorio_inicio_total_avaliadores").innerHTML = `<strong> Total de Avaliadores:</strong> ${quantidadeDeConvidados}`

    let urlReq = urlsBack("relatorios") + "porPerguntas/" + id_ques_check

    const resultado = await request(urlReq, "GET")
    // http://localhost/tcc/api/v1/relatorios/porPerguntas/49
    console.log(JSON.stringify(resultado))

    if (resultado.error) {
        if (questionario == true) {
            mostrarAlerta("error", "Nenhum avaliador respondeu a este questionário", "PorPerguntas")
        }else{
            mostrarAlerta("error", "Nenhum avaliador respondeu a este check-list", "PorPerguntas")
        }
    } else {
        document.getElementById("chartdiv").innerHTML = ""
        document.getElementById("body_relatorio_questionario_perguntas").innerHTML = ""
        document.querySelector(".dados_relatorio_inicio").classList.remove("d-none")
        resultado.perguntas.forEach(element => {
            let linha = criaLinhaRelatorio(element, questionario)
        });

        criaLinhaRelatorioTotal(resultado, questionario)
        criaLinhaRelatorioTotalPercentual(resultado, questionario)
        document.getElementById("pills-relatorio-tab").click()
    }

}


function criaLinhaRelatorio(pergunta, questionario) {
    console.log(pergunta)
    let row = document.createElement("tr")
    let tdPergunta = document.createElement("td")
    let tdRuim = document.createElement("td")
    let tdRegular = document.createElement("td")
    let tdBom = document.createElement("td")
    let tdMuitoBom = document.createElement("td")
    let tdOtimo = document.createElement("td")

    let tdSim = document.createElement("td")
    let tdNao = document.createElement("td")
    let tdNaoAplica = document.createElement("td")

    tdPergunta.innerHTML = pergunta.pergunta
    tdRuim.innerHTML = "0"
    tdRegular.innerHTML = "0"
    tdBom.innerHTML = "0"
    tdMuitoBom.innerHTML = "0"
    tdOtimo.innerHTML = "0"

    tdSim.innerHTML = "0"
    tdNao.innerHTML = "0"
    tdNaoAplica.innerHTML = "0"

    pergunta.respostas.forEach(resposta => {
        if (questionario == true) {
            if (resposta.resposta == "1") {
                tdRuim.innerHTML = resposta.quantidade
            } else if (resposta.resposta == "2") {
                tdRegular.innerHTML = resposta.quantidade
            } else if (resposta.resposta == "3") {
                tdBom.innerHTML = resposta.quantidade
            } else if (resposta.resposta == "4") {
                tdMuitoBom.innerHTML = resposta.quantidade
            } else if (resposta.resposta == "5") {
                tdOtimo.innerHTML = resposta.quantidade
            }
        } else {
            if (resposta.resposta == "1") {
                tdSim.innerHTML = resposta.quantidade
            } else if (resposta.resposta == "2") {
                tdNao.innerHTML = resposta.quantidade
            } else if (resposta.resposta == "3") {
                tdNaoAplica.innerHTML = resposta.quantidade
            }
        }

    });

    row.appendChild(tdPergunta)
    if (questionario == true) {
        row.appendChild(tdRuim)
        row.appendChild(tdRegular)
        row.appendChild(tdBom)
        row.appendChild(tdMuitoBom)
        row.appendChild(tdOtimo)

        document.getElementById("thRuim").classList.remove("d-none")
        document.getElementById("thRegular").classList.remove("d-none")
        document.getElementById("thBom").classList.remove("d-none")
        document.getElementById("thMuitoBom").classList.remove("d-none")
        document.getElementById("thOtimo").classList.remove("d-none")
        document.getElementById("thSim").classList.add("d-none")
        document.getElementById("thNao").classList.add("d-none")
        document.getElementById("thNaoAplica").classList.add("d-none")
    } else {
        row.appendChild(tdSim)
        row.appendChild(tdNao)
        row.appendChild(tdNaoAplica)

        document.getElementById("thRuim").classList.add("d-none")
        document.getElementById("thRegular").classList.add("d-none")
        document.getElementById("thBom").classList.add("d-none")
        document.getElementById("thMuitoBom").classList.add("d-none")
        document.getElementById("thOtimo").classList.add("d-none")
        document.getElementById("thSim").classList.remove("d-none")
        document.getElementById("thNao").classList.remove("d-none")
        document.getElementById("thNaoAplica").classList.remove("d-none")
    }


    document.getElementById("body_relatorio_questionario_perguntas").appendChild(row)
}

function criaLinhaRelatorioTotal(total, questionario) {
    console.log(total)
    let row = document.createElement("tr")
    let tdPergunta = document.createElement("td")
    let tdRuim = document.createElement("td")
    let tdRegular = document.createElement("td")
    let tdBom = document.createElement("td")
    let tdMuitoBom = document.createElement("td")
    let tdOtimo = document.createElement("td")

    let tdSim = document.createElement("td")
    let tdNao = document.createElement("td")
    let tdNaoAplica = document.createElement("td")

    tdPergunta.innerHTML = "Total"
    tdPergunta.classList = "d-flex justify-content-md-center"
    tdRuim.innerHTML = "0"
    tdRegular.innerHTML = "0"
    tdBom.innerHTML = "0"
    tdMuitoBom.innerHTML = "0"
    tdOtimo.innerHTML = "0"

    tdSim.innerHTML = "0"
    tdNao.innerHTML = "0"
    tdNaoAplica.innerHTML = "0"

    total.geral.forEach(resposta => {
        if (questionario == true) {
            if (resposta.resposta == "1") {
                tdRuim.innerHTML = resposta.quantidade
            } else if (resposta.resposta == "2") {
                tdRegular.innerHTML = resposta.quantidade
            } else if (resposta.resposta == "3") {
                tdBom.innerHTML = resposta.quantidade
            } else if (resposta.resposta == "4") {
                tdMuitoBom.innerHTML = resposta.quantidade
            } else if (resposta.resposta == "5") {
                tdOtimo.innerHTML = resposta.quantidade
            }
        } else {
            if (resposta.resposta == "1") {
                tdSim.innerHTML = resposta.quantidade
            } else if (resposta.resposta == "2") {
                tdNao.innerHTML = resposta.quantidade
            } else if (resposta.resposta == "3") {
                tdNaoAplica.innerHTML = resposta.quantidade
            }
        }
    });

    row.appendChild(tdPergunta)
    if (questionario == true) {
        row.appendChild(tdRuim)
        row.appendChild(tdRegular)
        row.appendChild(tdBom)
        row.appendChild(tdMuitoBom)
        row.appendChild(tdOtimo)

        document.getElementById("thRuim").classList.remove("d-none")
        document.getElementById("thRegular").classList.remove("d-none")
        document.getElementById("thBom").classList.remove("d-none")
        document.getElementById("thMuitoBom").classList.remove("d-none")
        document.getElementById("thOtimo").classList.remove("d-none")
        document.getElementById("thSim").classList.add("d-none")
        document.getElementById("thNao").classList.add("d-none")
        document.getElementById("thNaoAplica").classList.add("d-none")
    } else {
        row.appendChild(tdSim)
        row.appendChild(tdNao)
        row.appendChild(tdNaoAplica)

        document.getElementById("thRuim").classList.add("d-none")
        document.getElementById("thRegular").classList.add("d-none")
        document.getElementById("thBom").classList.add("d-none")
        document.getElementById("thMuitoBom").classList.add("d-none")
        document.getElementById("thOtimo").classList.add("d-none")
        document.getElementById("thSim").classList.remove("d-none")
        document.getElementById("thNao").classList.remove("d-none")
        document.getElementById("thNaoAplica").classList.remove("d-none")
    }



    document.getElementById("body_relatorio_questionario_perguntas").appendChild(row)
}

function criaLinhaRelatorioTotalPercentual(total, questionario) {
    console.log(total, "TOTAL")
    let row = document.createElement("tr")
    let tdPergunta = document.createElement("td")
    let tdRuim = document.createElement("td")
    let tdRegular = document.createElement("td")
    let tdBom = document.createElement("td")
    let tdMuitoBom = document.createElement("td")
    let tdOtimo = document.createElement("td")

    let tdSim = document.createElement("td")
    let tdNao = document.createElement("td")
    let tdNaoAplica = document.createElement("td")

    tdPergunta.innerHTML = "Total de Respostas em Percentual"
    tdPergunta.classList = "d-flex justify-content-md-center"
    tdRuim.innerHTML = "0"
    tdRegular.innerHTML = "0"
    tdBom.innerHTML = "0"
    tdMuitoBom.innerHTML = "0"
    tdOtimo.innerHTML = "0"

    tdSim.innerHTML = "0"
    tdNao.innerHTML = "0"
    tdNaoAplica.innerHTML = "0"
    let dados = [];
    let dataGrafico = []

    total.geral.forEach(resposta => {
        dados.push(resposta.percentual_geral)
        let categoria = ""
        if (questionario == true) {
            switch (resposta.resposta) {
                case 1:
                    categoria = "Ruim"
                    break;
                case 2:
                    categoria = "Regular"
                    break;
                case 3:
                    categoria = "Bom"
                    break;
                case 4:
                    categoria = "Muito bom"
                    break;
                case 5:
                    categoria = "Ótimo"
                    break;
            
                default:
                    break;
            }
        }else{
            switch (resposta.resposta) {
                case 1:
                    categoria = "Sim"
                    break;
                case 2:
                    categoria = "Não"
                    break;
                case 3:
                    categoria = "Não se aplica"
                    break;
                default:
                    break;
            }
        }
       
        dataGrafico.push({"value": resposta.percentual_geral, "category" : categoria})
        if (questionario == true) {
            if (total.resposta == "1") {
                tdRuim.innerHTML = resposta.percentual_geral + "%"
            } else if (resposta.resposta == "2") {
                tdRegular.innerHTML = resposta.percentual_geral + "%"
            } else if (resposta.resposta == "3") {
                tdBom.innerHTML = resposta.percentual_geral + "%"
            } else if (resposta.resposta == "4") {
                tdMuitoBom.innerHTML = resposta.percentual_geral + "%"
            } else if (resposta.resposta == "5") {
                tdOtimo.innerHTML = resposta.percentual_geral + "%"
            }
        } else {
            if (resposta.resposta == "1") {
                tdSim.innerHTML = resposta.percentual_geral + "%"
            } else if (resposta.resposta == "2") {
                tdNao.innerHTML = resposta.percentual_geral + "%"
            } else if (resposta.resposta == "3") {
                tdNaoAplica.innerHTML = resposta.percentual_geral + "%"
            }
        }

    });

    if (dados.length < 5) {
        for (let i = dados.length; i < 5; i++) {
            dados.push(0)
        }
    }
    row.appendChild(tdPergunta)
    if (questionario == true) {
        row.appendChild(tdRuim)
        row.appendChild(tdRegular)
        row.appendChild(tdBom)
        row.appendChild(tdMuitoBom)
        row.appendChild(tdOtimo)

        document.getElementById("thRuim").classList.remove("d-none")
        document.getElementById("thRegular").classList.remove("d-none")
        document.getElementById("thBom").classList.remove("d-none")
        document.getElementById("thMuitoBom").classList.remove("d-none")
        document.getElementById("thOtimo").classList.remove("d-none")
        document.getElementById("thSim").classList.add("d-none")
        document.getElementById("thNao").classList.add("d-none")
        document.getElementById("thNaoAplica").classList.add("d-none")
    } else {
        row.appendChild(tdSim)
        row.appendChild(tdNao)
        row.appendChild(tdNaoAplica)

        document.getElementById("thRuim").classList.add("d-none")
        document.getElementById("thRegular").classList.add("d-none")
        document.getElementById("thBom").classList.add("d-none")
        document.getElementById("thMuitoBom").classList.add("d-none")
        document.getElementById("thOtimo").classList.add("d-none")
        document.getElementById("thSim").classList.remove("d-none")
        document.getElementById("thNao").classList.remove("d-none")
        document.getElementById("thNaoAplica").classList.remove("d-none")
    }

    document.getElementById("body_relatorio_questionario_perguntas").appendChild(row)
    console.log(document.getElementById("chartdiv"))
    if (document.getElementById("chartdiv")) {
        criarGrafico(dataGrafico)
    }
    console.log(dataGrafico, "DADOS")

}

