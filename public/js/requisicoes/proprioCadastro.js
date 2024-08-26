function fazerCadastro() {
    let nome = document.getElementById("nome").value
    let senha = document.getElementById("senha").value
    let email = document.getElementById("email").value
    let data_nascimento = document.getElementById("dataNascimento").value
    let sexo = ""
    let user = document.getElementById("usuario").value
    
    document.getElementById("feminino").checked == true ? sexo = "F" : 0
    document.getElementById("masculino").checked == true ? sexo = "M" : 0
    document.getElementById("outro").checked == true ? sexo = "O" : 0

    let json = {
        "nome_usuario": nome,
        "email": email,
        "id_profissao": "",
        "id_escolaridade": "",
        "data_nascimento": data_nascimento,
        "sexo": sexo,
        "id_cidade": null,
        "login" : user,
        "senha": senha,
    }

    console.log(JSON.stringify(json))

    // fetch(urlsBack("users")+"auth", {
    //     method: "POST",
    //     header: { "Content-Type": "application/json" },
    //     body: JSON.stringify(json)
    // })
    //     .then(function (responseData) {
    //         return responseData.json();
    //     })
    //     .then(function (jsonData) {
    //         console.log(jsonData)
    //         if (jsonData.error) {

    //         } else {
    //             sessionStorage.setItem("token", jsonData.token)
    //             sessionStorage.setItem("user", jsonData.nome_usuario)
    //             sessionStorage.setItem("user_t", jsonData.permissao)

    //             window.location.replace(urlsFront("public")+"pages/principal.html")
    //         }
    //     })
    //     .catch(function (e) {
    //         console.log(e)
    //     })
}