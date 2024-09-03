function validandoPerguntas(e) {
    e.preventDefault()
    let form = document.getElementById("form_cadastro_questionario")

    if (form.checkValidity()) {
        let metodo 
        let url
        if (document.getElementById("pergunta").dataset.idPergunta != null || document.getElementById("pergunta").dataset.idPergunta.trim() != "") {
           metodo = "PATCH"
           url = urlsBack("questionario")+"pergunta/"+document.getElementById("pergunta").dataset.idPergunta
        }else{
            metodo = "POST"
            url = urlsBack("questionario")+"pergunta" 
        }
        adicionarNovaPerguntaAoQuestionarioSelecionado(url, metodo)
    }

    form.classList.add('was-validated')
}

async function adicionarNovaPerguntaAoQuestionarioSelecionado(url, metodo) {
    let codigo = document.getElementById("codigo_questionario").value.trim()
    let combo_principio = document.getElementById("principio")
    let principio = combo_principio.options[combo_principio.selectedIndex].dataset.idPrincipio;
    let pergunta = document.getElementById("pergunta").value 
    let justificativa = document.getElementById("justificativa").value

    let json = {
        "pergunta": pergunta,
        "justificativa": justificativa,
        "id_questionario": parseInt(codigo),
        "principio": parseInt(principio)
    }	

    const resultado = await request(url, metodo, json)

    if (resultado.error) {
        alert(resultado.error)
    } else {
        document.getElementById("pergunta").dataset.idPrincipio = ""
        document.getElementById("pergunta").value = ""
        document.getElementById("justificativa").value = ""
        document.getElementById("form_cadastro_questionario").classList.remove("was-validated")

        Swal.fire({
            title: "Sucesso!",
            text: "Pergunta adicionada ao questionário!",
            icon: "success"
        });
    }
}