function preencherCamposParaEdicaoDeUsuario(usuario) {
    let id_usuario = document.getElementById("codigo_usuario")
    id_usuario.value = usuario.id_usuario
    console.log(usuario)
    document.getElementById("nome_usuario").value = usuario.nome_usuario
    document.getElementById("email").value = usuario.email
    document.getElementById("data_nascimento").value = usuario.data_nascimento
    document.getElementById("user").value = usuario.login
    document.getElementById("senha").value = usuario.senha

    let sexo = document.querySelector('#sexo')
    for (let i = 0; i < sexo.options.length; i++) {
        if (sexo.options[i].value === usuario.sexo) {
            sexo.selectedIndex = i
        }
    }

    let profissao = document.querySelector('#profissao')
    for (let i = 0; i < profissao.options.length; i++) {
        if (profissao.options[i].dataset.idProfissao === usuario.id_profissao) {
            profissao.selectedIndex = i
        }
    }

    let escolaridade = document.querySelector('#escolaridade')
    for (let i = 0; i < escolaridade.options.length; i++) {
        if (escolaridade.options[i].dataset.idEscolaridade === usuario.id_escolaridade) {
            escolaridade.selectedIndex = i
        }
    }

    
    usuario.status_usuario == "A" ? document.getElementById("radio_ativo").checked = true : document.getElementById("radio_inativo").checked = true
    usuario.permissao == "C" ? document.getElementById("radio_coordenador").checked = true : 0
    usuario.permissao == "U" ? document.getElementById("radio_avaliador").checked = true : 0
    usuario.permissao == "A" ? document.getElementById("radio_administrador").checked = true : 0
    
    document.getElementById("modulo_titulo_cadastro_usuario").innerHTML = "Edição de cadastro de usuário"
    document.getElementById("confirmar_senha").disabled = true
    document.getElementById("senha").disabled = true
    
    document.getElementById("fecharModalCadastroUsuario").click()
    id_usuario.onclick = function () {
        id_usuario.disabled = true
    }
}