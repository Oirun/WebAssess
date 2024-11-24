function fazerLogin() {
    let user = document.getElementById("username").value
    let pass = document.getElementById("senha_user").value

    let json = {
        "login": user,
        "senha": pass
    }

    console.log(JSON.stringify(json))

    fetch(urlsBack("users")+"auth", {
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
                    text: "Verifique se o usuário e a senha estão corretos!",
                    icon: "error"
                  });
            } else {
                sessionStorage.setItem("token", jsonData.token)
                sessionStorage.setItem("user", jsonData.nome_usuario)
                sessionStorage.setItem("user_t", jsonData.permissao)

                window.location.replace(urlsFront("public")+"pages/principal.html")
            }
        })
        .catch(function (e) {
            console.log(e)
        })
}