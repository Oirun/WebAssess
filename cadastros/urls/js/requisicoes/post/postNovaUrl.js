document.getElementById("btnSalvarUrl").onclick = async function () {
    await adicionandoNovaURl()
}

async function adicionandoNovaURl() {

    //post para criar uma nova url
    let url = document.getElementById("url_website").value 
    let dataInicio = document.getElementById("url_data_inicio").value
    let dataFim = document.getElementById("url_data_fim").value
    let descricao = document.getElementById("url_descricao").value
    let ativo = document.getElementById("url_ativo").checked == true ? 1 : 0

    let jsonNovaUrl = {
        "url": url,
        "descricao": descricao,
        "data_inicio": dataInicio,
        "data_fim" : dataFim,
        "ativo" : ativo,
        "tipo_site" : ""
    }

    const resultado = await request(urlsBack("url"), "POST", jsonNovaUrl)
    console.log(resultado)
    if (resultado.error) {
        console.log("erro ao pesquisar avaliadores")
    } else {
        alert("Url Cadastrada")
        await getUrls()
    }

}

async function vinculandoUrlAUmQuestionarioEChecklist(id_url) {

    let jsonId = {
        "id_url" : id_url
    }

    const resultado = await request(urlsBack("questionarioCoordenador"), "POST", jsonId)
    console.log(resultado)
    
    if (resultado.error) {
        console.log("Erro ao vincular questionario e checklist na url: "+resultado.error)
    }
}


