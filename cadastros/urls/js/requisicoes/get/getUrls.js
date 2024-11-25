document.getElementById("btnConsultaUrls").onclick = async function () {
    await getUrls()

}

async function getUrls() {

    let url_extenso = document.getElementById("c_url").value
    let data_inicio = document.getElementById("c_data_inicio").value
    let data_fim = document.getElementById("c_data_fim").value

    let jsonParams = {
        "url": url_extenso,
        "data_inicio": data_inicio,
        "data_fim": data_fim
    }

    let url_request = gerarUrlComParametros(urlsBack("url"), jsonParams)
    const resultado = await request(url_request, "GET")
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

}

async function criandoLinhaParaTabelaUrl(url) {
    let row = document.createElement("tr");
    let tdUrl = document.createElement("td");
    let tdDatas = document.createElement("td");
    let tdStatus = document.createElement("td");
    let tdConvidados = document.createElement("td");
    let tdQuestoes = document.createElement("td");
    let divAcao = document.createElement("td");
    let btnEditar = document.createElement("button");
    let ico = document.createElement("i");
    let divConvidado = document.createElement("div");

    let divQuestionario = document.createElement("div");
    let btnQuestionario = document.createElement("button");
    btnQuestionario.setAttribute("data-bs-placement", "top");
    btnQuestionario.setAttribute("data-bs-title", "Editar questionário.");
    let icoQuestionario = document.createElement("i");

    let divCheckList = document.createElement("div");
    let btnChecklist = document.createElement("button");
    btnChecklist.setAttribute("data-bs-placement", "top");
    btnChecklist.setAttribute("data-bs-title", "Editar check-list.");
    let icoCheckList = document.createElement("i");

    btnEditar.classList = "btn btn-outline-dark";
    btnEditar.setAttribute("data-bs-placement", "top");
    btnEditar.setAttribute("data-bs-title", "Editar check-list.");
    ico.classList = "bi bi-pencil";

    btnQuestionario.classList = "btn btn-outline-success";
    btnChecklist.classList = "btn btn-outline-primary";
    icoQuestionario.classList = "bi bi-journal-text";
    icoCheckList.classList = "bi bi-ui-checks";

    tdQuestoes.classList = "d-flex gap-1";

    btnQuestionario.appendChild(icoQuestionario);
    btnChecklist.appendChild(icoCheckList);
    divQuestionario.appendChild(btnQuestionario);
    divCheckList.appendChild(btnChecklist);
    tdQuestoes.appendChild(divQuestionario);
    tdQuestoes.appendChild(divCheckList);

    btnEditar.appendChild(ico);
    divAcao.appendChild(btnEditar);

    tdUrl.innerHTML = url.url;
    tdDatas.innerHTML = `${url.data_inicio.split("-")[2]}/${url.data_inicio.split("-")[1]}/${url.data_inicio.split("-")[0]} <br>${url.data_fim.split("-")[2]}/${url.data_fim.split("-")[1]}/${url.data_fim.split("-")[0]}`;
    // tdStatus.innerHTML = ""

    let quantidadeDeConvidados = await verificandoQuantidadeDeUsuarios(url.id);

    divConvidado.innerHTML = quantidadeDeConvidados + " Convidados";

    divConvidado.classList = "div-convidado";
    divConvidado.setAttribute("data-bs-toggle", "modal");
    divConvidado.setAttribute("data-bs-target", "#modal-convidar");
    divConvidado.setAttribute("data-bs-placement", "top");
    divConvidado.setAttribute("data-bs-title", "Ver convidados.");

    divConvidado.onclick = async function () {
        await getAvaliadoresIncluidos(url.id);
        await pesquisandoAvaliadores(url.id);

        document.getElementById("btnAdicionarAvaliadores").setAttribute("data-idUrl", url.id);
    }

    btnQuestionario.onclick = function () {
        sessionStorage.setItem("id_questionario", url.questionario);
        window.location.replace(urlsFront("questionario") + "pages/index.html");
    }

    btnChecklist.onclick = function () {
        sessionStorage.setItem("id_checklist", url.checklist);
        window.location.replace(urlsFront("checklist") + "pages/index.html");
    }

    btnEditar.onclick = function () {
        preencheCamposUrls(url);
        document.getElementById("pills-profile-tab").innerHTML = "Editar";
        document.getElementById("titulo_cad_urls").innerHTML = "Editando Urls";
        document.getElementById("pills-profile-tab").click();
    }

    if (sessionStorage.getItem("user_t") == "A") {
        btnChecklist.disabled = true;
        btnQuestionario.disabled = true;
    }

    if (quantidadeDeConvidados > 0) {
        btnQuestionario.disabled = true;
        btnChecklist.disabled = true;
        btnEditar.disabled = true;

        btnQuestionario.setAttribute("data-bs-placement", "top");
        btnQuestionario.setAttribute("data-bs-title", "Após incluir convidados a essa url, o questionário não pode ser alterado.");
    }

    tdConvidados.appendChild(divConvidado);

    row.appendChild(tdUrl);
    row.appendChild(tdDatas);
    // row.appendChild(tdStatus)
    row.appendChild(tdConvidados);
    row.appendChild(tdQuestoes);
    row.appendChild(divAcao);

    // Aqui, inicializamos os tooltips manualmente
    const tooltipTriggerList = row.querySelectorAll('[data-bs-title]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

    return row;
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
    document.getElementById("url_data_inicio").value = url.data_inicio
    document.getElementById("url_data_fim").value = url.data_fim
    document.getElementById("url_descricao").value = url.descricao
    // if (url.ativo == "A") {
    //     document.getElementById("url_ativo").click() 
    // }else{
    //     document.getElementById("url_inativo").click() 
    // }

}

function limparCampos() {
    document.getElementById("url_codigo").value = ""
    document.getElementById("url_codigo").value = ""
    document.getElementById("url_website").value = ""
    document.getElementById("url_data_inicio").value = ""
    document.getElementById("url_data_fim").value = ""
    document.getElementById("url_descricao").value = ""

    document.getElementById("pills-profile-tab").innerHTML = "Cadastrar"
    document.getElementById("titulo_cad_urls").innerHTML = "Cadastro de Urls"
}