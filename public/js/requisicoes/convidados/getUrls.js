async function getUrlsConvidados() {
    const resultado = await request(urlsBack("questionarioAvaliador") + "urlQueOUsuarioTemAcesso", "GET")
    //const resultado = await request("http://127.0.0.1:5501/jsonUrlsConvidados.json", "GET")

    console.log(resultado, "OI")

    if (resultado.error) {
        console.log("erro ao consultar urls")
    } else {
        document.getElementById("body_consulta_urls_avaliação").innerHTML = ""
        resultado.forEach(url => {
            let linha = criandoLinhaParaTabelaUrlConvidados(url)
            document.getElementById("body_consulta_urls_avaliação").appendChild(linha)
        });
    }
}

function criandoLinhaParaTabelaUrlConvidados(url) {
    let row = document.createElement("tr")
    let tdUrl = document.createElement("td")
    let tdDatas = document.createElement("td")
    let tdStatus = document.createElement("td")
    let tdQuestoes = document.createElement("td")
    let tdSituacao = document.createElement("td")

    let divQuestionario = document.createElement("div")
    let btnQuestionario = document.createElement("button")
    let icoQuestionario = document.createElement("i")

    let divCheckList = document.createElement("div")
    let btnChecklist = document.createElement("button")
    let icoCheckList = document.createElement("i")

    btnQuestionario.id = "btnQuestionario_" + 1
    btnQuestionario.setAttribute("data-bs-placement", "top");
    btnQuestionario.setAttribute("data-bs-title", "Editar check-list.");
    btnChecklist.id = "btnChecklist_" + 1
    btnChecklist.setAttribute("data-bs-placement", "top");
    btnChecklist.setAttribute("data-bs-title", "Editar check-list.");
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

    tdUrl.innerHTML = url.url
    tdDatas.innerHTML = url.data_inicio == null ? 0 : url.data_inicio.split("-")[2] + "/" + url.data_inicio.split("-")[1] + "/" + url.data_inicio.split("-")[0]
    tdStatus.innerHTML = url.data_fim == null ? 0 : url.data_fim.split("-")[2] + "/" + url.data_fim.split("-")[1] + "/" + url.data_fim.split("-")[0]

    let dataHoje = new Date()
    let dataFim = new Date(url.data_fim)

    if (dataHoje < dataFim) {
        tdSituacao.innerHTML = "Disponível"
    } else {
        tdSituacao.innerHTML = "Indisponível"
    }

    if (url.respondeu_questionario == true || url.respondeu_questionario == 1 || dataHoje > dataFim) {
        btnQuestionario.disabled = true
        btnQuestionario.classList = "btn btn-success"

        btnQuestionario.onclick = function () {
            alert("Esse questionário já está concluido.")
        }
    } else {
        btnQuestionario.onclick = function () {
            console.log(url.id_questionario)
            sessionStorage.setItem("id_questionario", url.id_questionario) //sessionStorage.setItem("id_questionario", url.id_questionario)
            window.location.replace(urlsFront("responderQuestionario") + "pages/index.html")
        }
    }

    if (url.respondeu_checklist == true || url.respondeu_checklist == 1 || dataHoje > dataFim) {
        btnChecklist.disabled = true
        btnChecklist.classList = "btn btn-primary"

        btnChecklist.onclick = function () {
            alert("Esse checklist já está concluido.")
        }
    } else {
        btnChecklist.onclick = function () {
            sessionStorage.setItem("id_checklist", url.id_checklist) //sessionStorage.setItem("id_checklist", url.id_checklist)
            window.location.replace(urlsFront("responderQuestionario") + "pages/index.html")
        }
    }

    row.appendChild(tdUrl)
    row.appendChild(tdDatas)
    row.appendChild(tdStatus)
    row.appendChild(tdQuestoes)
    row.appendChild(tdSituacao)

    // Aqui, inicializamos os tooltips manualmente
    const tooltipTriggerList = row.querySelectorAll('[data-bs-title]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

    return row
}