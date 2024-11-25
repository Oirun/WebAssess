async function getAvaliadoresIncluidos(id_url) {

    let url = urlsBack("questionarioCoordenador")+ "usuariosVinculadosAoQuestinario/"+id_url
    const resultado = await request(url, "GET")
    
    if (resultado.error) {
        console.log(resultado.error)
        document.getElementById("listar-avaliadores-cadastrados").innerHTML = ""
    } else {
        document.getElementById("listar-avaliadores-cadastrados").innerHTML = ""
        resultado[0].usuarios.forEach(avaliador => {
            let li = criandoLi(avaliador)
        });
    }
}

function criandoLi(avaliador) {

    let input = document.createElement("input")
    let label = document.createElement("label")
    let span = document.createElement("span")
    let div = document.createElement("div")
    let button = document.createElement("button")
    let ico = document.createElement("i")

    input.classList = "list-group-item-check pe-none"
    input.type = "radio"
    input.name = "radioAvaliador"
    input.id = "avaliador_radio_"+avaliador.id_usuario
    
    label.classList = "list-group-item rounded-3 py-3"
    label.setAttribute("for", input.id)
    label.innerHTML = `<i class="bi bi-caret-right-fill"></i> ${avaliador.id_usuario} - ${avaliador.nome_usuario}`

    span.classList = "d-block small opacity-50"
    span.innerHTML = `${avaliador.cidade} - ${avaliador.estado}`
    //`${avaliador.cidade} / ${avaliador.estado}`

    label.appendChild(span)
    label.appendChild(div)

    document.getElementById("listar-avaliadores-cadastrados").appendChild(input)
    document.getElementById("listar-avaliadores-cadastrados").appendChild(label)
    //document.getElementById("listar-questionarios-cadastrados").appendChild(div)
}