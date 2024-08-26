function validateUsuario(e) {
    e.preventDefault()


}

async function postUsuarios() {
    
    let nome_usuario = document.getElementById("nome_usuario").value
    let email = document.getElementById("email").value

    let combo_profissao = document.getElementById("profissao")
    let id_profissao = combo_profissao.options[combo_profissao.selectedIndex].dataset.idProfissao;
    let combo_escolaridade = document.getElementById("escolaridade")
    let id_escolaridade = combo_escolaridade.options[combo_escolaridade.selectedIndex].dataset.idEscolaridade;

    let data_nascimento = document.getElementById("data_nascimento").value
    let combo_sexo = document.getElementById("sexo")
    let sexo = combo_sexo.options[combo_sexo.selectedIndex].value;

    // let id_cidade = document.getElementById("").value

    let login = document.getElementById("user").value
    let senha = document.getElementById("senha").value
    let status_usuario = ""
    let permissao = ""

    //document.getElementById("radio_administrador").checked == true ? permissao = "A" : 0
    document.getElementById("radio_coordenador").checked == true ? permissao = "C" : 0
    document.getElementById("radio_avaliador").checked == true ? permissao = "U" : 0
    
    document.getElementById("radio_ativo").checked == true ? status_usuario = "A" : 0
    document.getElementById("radio_inativo").checked == true ? status_usuario = "I" : 0


    let jsonUsuario = {
        "nome_usuario": nome_usuario,
        "email": email,
        "id_profissao": parseInt(id_profissao),
        "id_escolaridade": parseInt(id_escolaridade),
        "data_nascimento": data_nascimento,
        "sexo": sexo,
        "id_cidade": null,
        "login" : login,
        "senha": senha,
        "status_usuario": status_usuario,
        "permissao": permissao
    }

    let url = urlsBack("users")
    let metodo = "POST"

    console.log(jsonUsuario)
    const resultado = await request(url, metodo, jsonUsuario)
    console.log(resultado)

    if (resultado.error) {
        Swal.fire({
            title: "Erro!",
            text: resultado.error,
            icon: "error"
          }); 
    } else {
        Swal.fire({
            title: "Sucesso!",
            text: "Usuário cadastrado com sucesso!",
            icon: "success"
          });
          getUsuario(true)
    }
}