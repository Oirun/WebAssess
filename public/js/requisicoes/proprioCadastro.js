function validateForm(event) {
    event.preventDefault()

    let form = document.getElementById("form_proprio_usuario")

    if (form.checkValidity()) {
        console.log("OI")
        fazerCadastro()
    }

    form.classList.add('was-validated')
}
function fazerCadastro() {
    let nome = document.getElementById("nome").value
    let email = document.getElementById("email").value
    let data_nascimento = document.getElementById("dataNascimento").value
    let senha = document.getElementById("senha").value
    let combo_profissao = document.getElementById("profissao")
    let profissao = combo_profissao.options[combo_profissao.selectedIndex].dataset.idProfissao;
    let combo_escolaridade = document.getElementById("escolaridade")
    let escolaridade = combo_escolaridade.options[combo_escolaridade.selectedIndex].dataset.idEscolaridade;
    let cep = document.getElementById("cep").value
    let sexo = ""
    let permissao = ""
    let user = document.getElementById("login").value

    document.getElementById("feminino").checked == true ? sexo = "F" : 0
    document.getElementById("masculino").checked == true ? sexo = "M" : 0

    document.getElementById("coordenador").checked == true ? permissao = "C" : 0
    document.getElementById("avaliador").checked == true ? permissao = "U" : 0


    let json = {
        "nome_usuario": nome,
        "email": email,
        "id_profissao": profissao,
        "id_escolaridade": escolaridade,
        "data_nascimento": data_nascimento,
        "sexo": sexo,
        "id_cidade": null,
        "login": user,
        "senha": senha,
        "permissao": permissao,
        "status_usuario": "A",
        "cep" : cep
    }

    console.log(JSON.stringify(json), urlsBack("users"))
    
    fetch(urlsBack("users"), {
        method: "POST",
        header: { "Content-Type": "application/json" },
        body: JSON.stringify(json)
    })
        .then(function (responseData) {
            return responseData.json();
        })
        .then(function (jsonData) {
            console.log(jsonData)
            if (jsonData.error) {
                Swal.fire({
                    title: "Erro!",
                    text: "Algo deu errado, atualize a página e se não der certo, entre em contato com o suporte!",
                    icon: "error"
                  });
            } else {
                Swal.fire({
                    title: "Sucesso!",
                    text: "Cadastro enviado para a análise, por favor aguarde a validação de algum administrador!",
                    icon: "success"
                  });
            }
            document.getElementById("div-senha").classList.add("d-none")
            document.getElementById("form_proprio_usuario").classList.remove("was-validated")
            document.getElementById("form_proprio_usuario").reset()
        })
        .catch(function (e) {
            console.log(e)
        })
}