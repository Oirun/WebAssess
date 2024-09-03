function preencheCamposAPartirDaPesquisaDasPerguntas(perguntas) {
    document.getElementById("liberarCamposPerguntas").click()
    document.getElementById("adicionarPergunta").classList.remove("d-none")
    
    // let principio = document.querySelector('#principio')
    // for (let i = 0; i < principio.options.length; i++) {
    //     if (principio.options[i].dataset.idPrincipio === perguntas.id_principio) {
    //         principio.selectedIndex = i
    //     }
    // }
    
    document.getElementById("pergunta").value = perguntas.descricao
    document.getElementById("pergunta").setAttribute("data-id-pergunta", perguntas.id_pergunta)
    // document.getElementById("justificativa").disabled = perguntas.justificativa

    document.getElementById("liberarCamposPerguntas").disabled = false 
}