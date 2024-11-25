async function getUsuarioTabela(solicitacaoUsuario) {
    
    let nome_usuario = document.getElementById("c_nome_usuario").value
    let login = document.getElementById("c_nome_user").value
    let combo_profissao = document.getElementById("c_profissao")
    let id_profissao = combo_profissao.options[combo_profissao.selectedIndex].dataset.idProfissao;
    let combo_escolaridade = document.getElementById("c_escolaridade")
    let id_escolaridade = combo_escolaridade.options[combo_escolaridade.selectedIndex].dataset.idEscolaridade;
    
    let jsonParams = {
        "nome_usuario" : nome_usuario,
        "id_profissao" : id_profissao,
        "id_escolaridade" : id_escolaridade,
        "login" : login
    }

    let url = gerarUrlComParametros(urlsBack("users"), jsonParams)
    console.log(url)
    
    document.getElementById("body_consulta_usuario").innerHTML = ""
    const resultado = await request(url, "GET")
    console.log(url, resultado)
    if (resultado.error) {
        mostrarAlerta("error", resultado.error, "Usuarios")
        alert(resultado.error)
    } else {

        console.log(document.getElementById("body_consulta_usuario"))
        resultado.forEach(usuario => {
            let linha = rowTable(usuario, solicitacaoUsuario)
            document.getElementById("body_consulta_usuario").appendChild(linha)
        });
    }
}

function rowTable(usuario, solicitacaoUsuario) {
    console.log(solicitacaoUsuario)
    let row = document.createElement("tr")
    let tdCodigo = document.createElement("td")
    let tdNome = document.createElement("td")
    let tdEstadoCidade = document.createElement("td")
    let tdPermissao = document.createElement("td")
    let tdStatus = document.createElement("td")
    let divAcao = document.createElement("div")
    let btnEditar = document.createElement("button")
    let ico = document.createElement("i")

    btnEditar.classList = "btn btn-outline-dark"
    ico.classList = "bi bi-pencil"

    btnEditar.appendChild(ico)
    divAcao.appendChild(btnEditar)

    tdCodigo.innerHTML = usuario.id_usuario
    tdNome.innerHTML = usuario.nome_usuario
    tdEstadoCidade.innerHTML = "MS/Dourados"

    if (usuario.status_usuario == "A") {
        tdStatus.innerHTML = "Ativo"
    } else {
        tdStatus.innerHTML = "Inativo"
    }

    if (usuario.permissao == "A") {
        tdPermissao.innerHTML = "Administrador"
    } else if (usuario.permissao == "C") {
        tdPermissao.innerHTML = "Coordenador"
    } else {
        tdPermissao.innerHTML = "Avaliador"
    }

    btnEditar.onclick = function () {
        preencherCamposParaEdicaoDeUsuario(usuario)
    }

    if (solicitacaoUsuario == usuario.id_usuario) {
        btnEditar.click()
    }

    row.appendChild(tdCodigo)
    row.appendChild(tdNome)
    row.appendChild(tdEstadoCidade)
    row.appendChild(tdStatus)
    row.appendChild(tdPermissao)
    row.appendChild(divAcao)

    return row
}