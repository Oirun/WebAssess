function cancelar() {
    document.getElementById("form_cadastro_checklist").reset()
    document.getElementById("form_cadastro_checklist").classList.remove("was-validated")
    document.getElementById("liberarCamposPerguntas").disabled = true
    document.getElementById("liberarCamposPerguntas").innerHTML = "Liberar campos de pergunta."
    document.getElementById("adicionarPergunta").classList.add("d-none")

    document.getElementById("titulo_modulo_checklist").innerHTML = "Cadastro de Check-List"

    document.getElementById("pergunta").disabled = false
    document.getElementById("justificativa").disabled = false
    document.getElementById("nome_checklist").disabled = false
    document.getElementById("descricao_checklist").disabled = false
    document.getElementById("btnCadastrarCheckList").disabled = false

    let listaCheckList = document.getElementById("listar-checklist-cadastrados")
    let item = listaCheckList.querySelector('input[type="radio"]:checked')
    item.checked = false
 
}