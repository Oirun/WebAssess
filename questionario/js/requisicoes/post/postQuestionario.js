function validateForm(event) {
    event.preventDefault()

    let form = document.getElementById("form_cadastro_questionario")

    if (form.checkValidity()) {
        if (document.getElementById("codigo_questionario").value !== null && document.getElementById("codigo_questionario").value.trim() !== "") {
            let url = urlsBack("questionario") + "update/" + document.getElementById("codigo_questionario").value
            let metodo = "PATCH"
            enviaQuestionario(url, metodo)
        } else {
            let url = urlsBack("questionario")
            let metodo = "POST"
            enviaQuestionario(url, metodo)
        }
    }

    form.classList.add('was-validated')
}

async function enviaQuestionario(url, metodo) {

    let nome_questionario = document.getElementById("nome_questionario").value
    let descricao_questionario = document.getElementById("descricao_questionario").value

    let ativo = true
    let padrao = true

    document.getElementById("questionario_ativo").checked == "A" ? ativo = "A" : ativo = "I"
    document.getElementById("questionario_padrao").checked == "true" ? padrao = "true" : padrao = "false"

    let resultado = ""

    if (document.getElementById("codigo_questionario").value !== null && document.getElementById("codigo_questionario").value.trim() !== "") {
        let json = {
            "titulo": nome_questionario,
            "descricao": descricao_questionario,
            "status": ativo,
            "padrao": padrao,
            "data_fim" : "2024-11-24"
        }
        console.log(json)
       resultado = await request(url, metodo, json)
    } else {
        let pergunta = document.getElementById("pergunta").value
        let justificativa = document.getElementById("justificativa").value
        let combo_principio = document.getElementById("principio")
        let principio = combo_principio.options[combo_principio.selectedIndex].dataset.idprincipio;
        
        if (pergunta.trim() == null || pergunta.trim() == "") {
            Swal.fire({
                title: "Erro!",
                text: "Por favor, preencha os campos necessários para o cadastro de um novo questionário!",
                icon: "error"
            });
            return
        }else if (justificativa.trim() == null || justificativa.trim() == "") {
            Swal.fire({
                title: "Erro!",
                text: "Por favor, preencha os campos necessários para o cadastro de um novo questionário!",
                icon: "error"
            });
            return
        }

        let json = {
            "titulo": nome_questionario,
            "descricao": descricao_questionario,
            "status": ativo,
            "padrao": padrao,
            "tipo": "Q",
            "perguntas": [
                {
                    "pergunta": pergunta,
                    "justificativa": justificativa,
                    "principio": principio
                }
            ]
        }
        console.log(json, url, metodo)
        resultado = await request(url, metodo, json)
    }

    if (resultado.error) {
        alert(resultado.error)
    }else{
        if (metodo == "PATCH") {
              document.getElementById("form_cadastro_questionario").classList.remove("was-validated")
              document.getElementById("principio").selectedIndex = 0
              document.getElementById("pergunta").value = ""
              document.getElementById("justificativa").value = ""
        }else{
            document.getElementById("form_cadastro_questionario").reset()
        }
      
        getQuestionario()
        Swal.fire({
            title: "Sucesso!",
            text: "Usuário cadastrado com sucesso!",
            icon: "success"
        });
    }
}