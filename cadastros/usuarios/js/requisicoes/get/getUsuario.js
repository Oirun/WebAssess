async function getUsuario(ul) {
    let url = urlsBack("users")

    const resultado = await request(url, "GET")
// document.getElementById("body_consulta_usuario").innerHTML = ""
    if (resultado.error) {
        Swal.fire({
            title: "Erro!",
            text: resultado.error,
            icon: "error"
          }); 
    } else {
        document.getElementById("ul_usuarios").innerHTML = ""
        
        resultado.forEach(usuario => {
            if (ul == true) {
                let linha = liUsuario(usuario)
                document.getElementById("ul_usuarios").appendChild(linha)
            }else{
                let row = rowTable(usuario)
                console.log(row)
                document.getElementById("body_consulta_usuario").appendChild(row)
            }
        });
    }
}

function liUsuario(usuario) {
    let li = document.createElement("li")
    li.classList = "list-group-item"
    li.innerHTML = usuario.id_usuario +" : "+usuario.nome_usuario

    return li
}

function rowTable(usuario) {
    let row = document.createElement("tr")
    let tdCodigo = document.createElement("td")
    let tdNome = document.createElement("td")
    let tdEstadoCidade = document.createElement("td")
    let tdPermissao = document.createElement("td")

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
    
    return row
}