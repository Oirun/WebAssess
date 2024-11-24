document.getElementById("btnAdicionarAvaliadores").onclick = async function () {
    await adicionandoAvaliadores()
}

async function adicionandoAvaliadores() {

    //post para convidar avaliadores para um questionario e checklist
    //precisa dos avaliadores
    //precisa do id do questionario e do checklist

    let listaAvaliadores = document.getElementById("body_consulta_convidados").querySelectorAll("td[data-idavaliador]")
    
    let listaCodigoAvaliadores = []
    listaAvaliadores.forEach(avaliador => {
        let classeTr = avaliador.parentNode
        
        if (classeTr.classList.contains("linha-selecionada")) {
            listaCodigoAvaliadores.push(parseInt(avaliador.dataset.idavaliador))
        }
    });

    //tenho o id da url, a partir desse id, recuperar o id do questionario e do checklist
    let id_url = document.getElementById("btnAdicionarAvaliadores").dataset.idurl
    let jsonIncluiAvaliadores = {
        "id_url": parseInt(id_url),
        "usuarios": listaCodigoAvaliadores
    }
 
    const resultado = await request(urlsBack("questionarioCoordenador")+"vinculaUsuario", "POST",jsonIncluiAvaliadores)
    console.log(resultado, jsonIncluiAvaliadores)

    if (resultado.error) {
        console.log("erro ao pesquisar avaliadores")
    } else {

        await getAvaliadoresIncluidos(id_url)
        await pesquisandoAvaliadores(document.getElementById("btnAdicionarAvaliadores").dataset.idurl)
        document.getElementById("btnConsultaUrls").click()
    }

}



