function preencheCamposAPartirDaPesquisa(checklist) {
    let codigo_checklist = document.getElementById("codigo_checklist")
    codigo_checklist.value = checklist.id_questionario
    document.getElementById("nome_checklist").value = checklist.titulo
    document.getElementById("descricao_checklist").value = checklist.descricao

    console.log(checklist.padrao == true)
    checklist.padrao == true ? document.getElementById("checklist_padrao").click() : document.getElementById("checklist_nao_padrao").click()
    //checklist.padrao == "A" ? document.getElementById("").checked = true : document.getElementById("").checked = false 
    document.getElementById("checklist_ativo").checked = true

    document.getElementById("pergunta").disabled = true
    document.getElementById("justificativa").disabled = true

    document.getElementById("liberarCamposPerguntas").disabled = false 
    document.getElementById("liberarCamposPerguntas").checked = false 
    document.getElementById("liberarCamposPerguntas").disabled = false

    document.getElementById("titulo_modulo_checklist").innerHTML = "Edição de check-list"

    codigo_checklist.onclick = function () {
        codigo_checklist.disabled = true
    }
}