function preencheCamposAPartirDaPesquisa(questionario) {
    let codigo_questionario = document.getElementById("codigo_questionario")
    codigo_questionario.value = questionario.id_questionario
    document.getElementById("nome_questionario").value = questionario.titulo
    document.getElementById("descricao_questionario").value = questionario.descricao

    console.log(questionario.padrao == true)
    questionario.padrao == true ? document.getElementById("questionario_padrao").click() : document.getElementById("questionario_nao_padrao").click()
    console.log(questionario.status)
    if (questionario.status == "A") {
        document.getElementById("questionario_ativo").click()
    }else{
        console.log("inativo")
        document.getElementById("questionario_inativo").click()
    }
   
    // document.getElementById("principio").disabled = true
    document.getElementById("pergunta").disabled = true
    document.getElementById("justificativa").disabled = true

    document.getElementById("liberarCamposPerguntas").disabled = false 
    document.getElementById("liberarCamposPerguntas").checked = false 
    document.getElementById("liberarCamposPerguntas").disabled = false

    document.getElementById("titulo_modulo_questionario").innerHTML = "Edição de questionário"

    codigo_questionario.onclick = function () {
        codigo_questionario.disabled = true
    }
}