function cancelar() {
    document.getElementById("form_cadastro_questionario").reset()
    document.getElementById("form_cadastro_questionario").classList.remove("was-validated")
    document.getElementById("liberarCamposPerguntas").disabled = true
    document.getElementById("liberarCamposPerguntas").innerHTML = "Liberar campos de pergunta."
    document.getElementById("adicionarPergunta").classList.add("d-none")

    document.getElementById("titulo_modulo_questionario").innerHTML = "Cadastro de Questionário"

    document.getElementById("principio").disabled = false
    document.getElementById("pergunta").disabled = false
    document.getElementById("justificativa").disabled = false

    let listaQuestionario = document.getElementById("listar-questionarios-cadastrados")
    let item = listaQuestionario.querySelector('input[type="radio"]:checked')
    item.checked = false
 
}