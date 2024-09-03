function validandoPerguntas(e) {
    e.preventDefault()
    let form = document.getElementById("form_cadastro_checklist")

    if (form.checkValidity()) {
        adicionarNovaPerguntaAoCheckListSelecionado()
    }

    form.classList.add('was-validated')
}

async function adicionarNovaPerguntaAoCheckListSelecionado(e) {
    let codigo = document.getElementById("codigo_checklist").value.trim()
    let combo_principio = document.getElementById("principio")
    let principio = combo_principio.options[combo_principio.selectedIndex].dataset.idPrincipio;
    let pergunta = document.getElementById("pergunta").value 
    let justificativa = document.getElementById("justificativa").value

    let json = {
        "pergunta": pergunta,
        "justificativa": justificativa,
        "id_checklist": parseInt(codigo),
        "principio": parseInt(principio)
    }	

    let url = urlsBack("checklist")+"pergunta"
    console.log(json, url)

    const resultado = await request(url, "POST", json)

    if (resultado.error) {
        alert(resultado.error)
    } else {
        document.getElementById("pergunta").value = ""
        document.getElementById("justificativa").value = ""
        document.getElementById("form_cadastro_checklist").classList.remove("was-validated")

        Swal.fire({
            title: "Sucesso!",
            text: "Pergunta adicionada ao questionário!",
            icon: "success"
        });
    }
}