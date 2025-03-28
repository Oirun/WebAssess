document.getElementById("profissao").onchange = function () {
    pesquisandoAvaliadores(document.getElementById("btnAdicionarAvaliadores").dataset.idurl)
}

async function pesquisandoAvaliadores(id_url) {

    let combo_profissao = document.getElementById("profissao")
    let id_profissao = combo_profissao.options[combo_profissao.selectedIndex].dataset.idProfissao;

    let params = {
        "id_profissao" : id_profissao
    }

    let url = gerarUrlComParametros(urlsBack("questionarioCoordenador")+"consultaAvaliadores/"+id_url, params)
    const resultado = await request(url, "GET")
    console.log(resultado)
 
    if (resultado.error) {
        console.log("erro ao pesquisar avaliadores")
        document.getElementById("body_consulta_convidados").innerHTML = ""
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
    tdCidade.innerHTML = avaliador.cidade
    tdEstado.innerHTML = avaliador.estado

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