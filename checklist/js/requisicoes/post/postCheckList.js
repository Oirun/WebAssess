function validateForm(event) {
    event.preventDefault()

    let form = document.getElementById("form_cadastro_checklist")

    if (form.checkValidity()) {
        if (document.getElementById("codigo_checklist").value !== null && document.getElementById("codigo_checklist").value.trim() !== "") {
            let url = urlsBack("questionario") + "update/" + document.getElementById("codigo_checklist").value
            let metodo = "PATCH"
            enviaCheckList(url, metodo)
        } else {
            let url = urlsBack("questionario")
            let metodo = "POST"
            enviaCheckList(url, metodo)
        }
    }

    form.classList.add('was-validated')
}

async function enviaCheckList(url, metodo) {

    let nome_checklist = document.getElementById("nome_checklist").value
    let descricao_checklist = document.getElementById("descricao_checklist").value

    let ativo = true
    let padrao = true

    document.getElementById("checklist_ativo").checked == "A" ? ativo = "A" : ativo = "I"
    document.getElementById("checklist_padrao").checked == "true" ? padrao = "true" : padrao = "false"

    let resultado = ""

    if (document.getElementById("codigo_checklist").value !== null && document.getElementById("codigo_checklist").value.trim() !== "") {
        let json = {
            "titulo": nome_checklist,
            "descricao": descricao_checklist,
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
        let principio = combo_principio.options[combo_principio.selectedIndex].dataset.idPrincipio;
        
        if (pergunta.trim() == null || pergunta.trim() == "") {
            Swal.fire({
                title: "Erro!",
                text: "Por favor, preencha os campos necessários para o cadastro de um novo check-list!",
                icon: "error"
            });
            return
        }else if (justificativa.trim() == null || justificativa.trim() == "") {
            Swal.fire({
                title: "Erro!",
                text: "Por favor, preencha os campos necessários para o cadastro de um novo check-list!",
                icon: "error"
            });
            return
        }

        let json = {
            "titulo": nome_checklist,
            "descricao": descricao_checklist,
            "status": ativo,
            "padrao": padrao,
            "tipo": "C",
            "perguntas": [
                {
                    "pergunta": pergunta,
                    "justificativa": justificativa,
                    "principio": parseInt(principio)
                }
            ]
        }
        console.log(json, url, metodo)
        resultado = await request(url, metodo, json)
    }

    if (resultado.error) {
        alert(resultado.error)
    }else{
        document.getElementById("form_cadastro_checklist").classList.remove("was-validated")
        document.getElementById("form_cadastro_checklist").reset()
        getCheckList()
        Swal.fire({
            title: "Sucesso!",
            text: "Usuário cadastrado com sucesso!",
            icon: "success"
        });
    }
}