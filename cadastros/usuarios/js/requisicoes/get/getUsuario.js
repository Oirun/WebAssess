async function getUsuario(ul) {
    let url = urlsBack("users")

    const resultado = await request(url, "GET")

    if (resultado.error) {
        alert(resultado.error)
    } else {
        document.getElementById("ul_usuarios").innerHTML = ""

        resultado.forEach(usuario => {
            let linha = liUsuario(usuario)
            document.getElementById("ul_usuarios").appendChild(linha)
        });
    }
}

function liUsuario(usuario) {
    let li = document.createElement("li")
    li.classList = "list-group-item"
    li.innerHTML = usuario.id_usuario + " : " + usuario.nome_usuario

    return li
}

