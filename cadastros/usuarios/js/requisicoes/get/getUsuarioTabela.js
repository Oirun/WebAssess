async function getUsuarioTabela(ul) {
    let url = urlsBack("users")
    document.getElementById("body_consulta_usuario").innerHTML = ""
    const resultado = await request(url, "GET")

    if (resultado.error) {
        alert(resultado.error)
    } else {
        
        console.log(document.getElementById("body_consulta_usuario"))
        resultado.forEach(usuario => {
            let linha = rowTable(usuario)
            document.getElementById("body_consulta_usuario").appendChild(linha)
        });
    }
}

function rowTable(usuario) {
    let row = document.createElement("tr")
    let tdCodigo = document.createElement("td")
    let tdNome = document.createElement("td")
    let tdEstadoCidade = document.createElement("td")
    let tdPermissao = document.createElement("td")
    let divAcao = document.createElement("div")
    let btnEditar = document.createElement("button")
    let ico = document.createElement("i")

    btnEditar.classList = "btn btn-outline-dark"
    ico.classList = "bi bi-pencil"

    btnEditar.appendChild(ico)
    divAcao.appendChild(btnEditar)

    console.log(usuario.id_usuario)
    
    tdCodigo.innerHTML = usuario.id_usuario
    tdNome.innerHTML = usuario.nome_usuario
    tdEstadoCidade.innerHTML = "MS/Dourados"
    
    if (usuario.status_usuario == "A") {
        tdPermissao.innerHTML = "Ativo"
    } else {
        tdPermissao.innerHTML = "Inativo"
    }

    row.appendChild(tdCodigo)
    row.appendChild(tdNome)
    row.appendChild(tdEstadoCidade)
    row.appendChild(tdPermissao)
    row.appendChild(divAcao)
    
    return row
}