document.getElementById("btnSalvarUrl").onclick = async function () {
    await adicionandoNovaURl()
}

async function adicionandoNovaURl() {

    //post para criar uma nova url
    let url = document.getElementById("url_website").value 
    let dataInicio = document.getElementById("url_data_inicio").value
    let dataFim = document.getElementById("url_data_fim").value
    let descricao = document.getElementById("url_descricao").value
    // let ativo = document.getElementById("url_ativo").checked == true ? 1 : 0

    let jsonNovaUrl = {
        "url": url,
        "descricao": descricao,
        "data_inicio": dataInicio,
        "data_fim" : dataFim,
        // "ativo" : ativo,
        "tipo_site" : ""
    }

    let metodo = ""
    let url_requisicao = ""

    if (document.getElementById("url_codigo").value != "" && document.getElementById("url_codigo").value != null && document.getElementById("url_codigo").value != undefined) {
        metodo = "PATCH"    
        url_requisicao = urlsBack("url")+document.getElementById("url_codigo").value 
    }else{
        metodo = "POST"
        url_requisicao = urlsBack("url")
    }
    console.log(url, JSON.stringify(jsonNovaUrl))

    const resultado = await request(url_requisicao, metodo, jsonNovaUrl)
    console.log(resultado)
    if (resultado.error) {
        Swal.fire({
            title: "Erro!",
            text: resultado.error,
            icon: "error"
        });
        console.log("erro ao pesquisar avaliadores")
    } else {
        
        await getUrls()
        document.getElementById("form_cadastro_urls").reset()
        document.getElementById("form_cadastro_urls").classList.remove("was-validated")

        if (metodo == "PATCH") {
            Swal.fire({
                title: "Sucesso!",
                text: "URL alterada!",
                icon: "success"
            });
            document.getElementById("pills-profile-tab").innerHTML = "Cadastrar"
            document.getElementById("titulo_cad_urls").innerHTML = "Cadastro de Urls"
            document.getElementById("pills-home-tab").click()
        }else{
            Swal.fire({
                title: "Sucesso!",
                text: "Url cadastrada!",
                icon: "success"
            });
        }
    }

}

async function vinculandoUrlAUmQuestionarioEChecklist(id_url) {
    
    let jsonId = {
        "id_url" : id_url
    }
    
    const resultado = await request(urlsBack("questionarioCoordenador"), "POST", jsonId)
    
    console.log("AAAAAAAAAAAAAAAAAAAAAAAA", resultado)

    if (resultado.error) {
        console.log("Erro ao vincular questionario e checklist na url: "+resultado.error)
    }
}


