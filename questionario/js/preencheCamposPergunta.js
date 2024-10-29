function preencheCamposAPartirDaPesquisaDasPerguntas(perguntas) {
    console.log(perguntas)
    document.getElementById("liberarCamposPerguntas").click()
    document.getElementById("adicionarPergunta").classList.remove("d-none")
    
    let principio = document.querySelector('#principio')
    for (let i = 0; i < principio.options.length; i++) {
        if (principio.options[i].text === perguntas.principio) {
            principio.selectedIndex = i
        }
    }
    
    document.getElementById("pergunta").value = perguntas.pergunta
    document.getElementById("pergunta").setAttribute("data-id-pergunta", perguntas.id_pergunta)
    document.getElementById("justificativa").value = perguntas.justificativa

    document.getElementById("liberarCamposPerguntas").disabled = false 
    document.getElementById("liberarCamposPerguntas").checked = true 
}