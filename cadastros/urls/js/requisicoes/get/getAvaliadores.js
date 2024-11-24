async function pesquisandoAvaliadores(id_url) {

    let profissao = document.getElementById("profissao").dataset.idprofissao == undefined ? "" : document.getElementById("profissao").dataset.idprofissao
    const resultado = await request(urlsBack("questionarioCoordenador")+"consultaAvaliadores/"+id_url+"?profissao="+profissao, "GET")
 
    if (resultado.error) {
        console.log("erro ao pesquisar avaliadores")
    } else {
        document.getElementById("body_consulta_convidados").innerHTML = ""
       
        resultado.forEach(avaliador => {
            let linha = criandoLinhaParaTabelaAvaliadores(avaliador)
            document.getElementById("body_consulta_convidados").appendChild(linha)
        });
    }
}

function criandoLinhaParaTabelaAvaliadores(avaliador) {
    let row = document.createElement("tr")
    let tdCodigo = document.createElement("td")
    let tdNome = document.createElement("td")
    let tdCidade = document.createElement("td")
    let tdEstado = document.createElement("td")

    tdCodigo.innerHTML = avaliador.id_usuario 
    tdCodigo.setAttribute("data-idavaliador", avaliador.id_usuario)
    tdNome.innerHTML = avaliador.nome_usuario
    tdCidade.innerHTML = `Dourados`
    tdEstado.innerHTML = `MS`

    row.onclick = function () {
        selecionandoAvaliadores(row)
        
    }

    row.appendChild(tdCodigo)
    row.appendChild(tdNome)
    row.appendChild(tdCidade)
    row.appendChild(tdEstado)

    return row
}

function selecionandoAvaliadores(row) {
    if (row.classList.contains("linha-selecionada")) {
        row.classList.remove("linha-selecionada")
    }else{
        row.classList.add("linha-selecionada")
    }
}