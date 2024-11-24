const btnSalvandoProfissao = document.getElementById("btnSalvarProfissao")
const btnSalvandoEscolaridade = document.getElementById("btnSalvarEscolaridade")
//const btnSalvandoPrincipio = document.getElementById("btnSalvarPrincipio")

const parametros = {
    "btnSalvarProfissao" : "profissao",
    "btnSalvarPrincipio" : "principio",
    "btnSalvarEscolaridade" : "escolaridade"
}

btnSalvandoProfissao.addEventListener("click", salvandoInformacoesParametros)
btnSalvandoEscolaridade.addEventListener("click", salvandoInformacoesParametros)
//btnSalvandoPrincipio.addEventListener("click", salvandoInformacoesParametros)

async function salvandoInformacoesParametros(event) {
    console.log()
    let url = ""
   
    url = urlsBack("users")+parametros[event.srcElement.id]
    
    let descricao = document.getElementById("nome_"+parametros[event.srcElement.id]).value

    let status = document.getElementById(parametros[event.srcElement.id]+"_ativo").checked == true ? "A" : "I" 

    let json = {}

    if (event.srcElement.id == "btnSalvarProfissao") {
        json.nome_profissao = descricao
    }else if (event.srcElement.id == "btnSalvarEscolaridade") {
        json.nome_escolaridade = descricao
    }
  
    const resultado = await request(url, "POST", json)

    if (resultado.error) {
        alert(resultado.error)
    }else{
        document.getElementById("nome_"+parametros[event.srcElement.id]).value = ""
        alert("Item cadastrado com sucesso")
    }
}