function preencherCamposParaEdicaoDeUsuario(usuario) {
    document.getElementById("form_cadastro_usuarios").classList.remove("was-validated")
    document.getElementById("form_cadastro_usuarios").reset()
    document.getElementById("div-senha").classList.add("d-none")
    
    let id_usuario = document.getElementById("codigo_usuario")
    id_usuario.value = usuario.id_usuario
    console.log(usuario)
    document.getElementById("nome_usuario").value = usuario.nome_usuario
    document.getElementById("email").value = usuario.email
    document.getElementById("data_nascimento").value = usuario.data_nascimento
    document.getElementById("user").value = usuario.login
    document.getElementById("senha").value = usuario.senha
    document.getElementById("cidade_usuario").value = usuario.cidade
    document.getElementById("estado_usuario").value = usuario.estado

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

async function pesquisandoCidadeEstado(id_campo) {
    let cep = document.getElementById(id_campo).value.replace(/[^a-zA-Z0-9\s]/g, '')

    if (cep.length == 8) {
        let url = "https://viacep.com.br/ws/" + cep + "/json/"

        console.log(url)

        fetch(url)
            .then(response => {
                // Verifica se a resposta é um JSON válido
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Erro ao acessar a API');
                }
            })
            .then(data => {
                console.log(data); // Aqui você pode trabalhar com os dados do endereço
                document.getElementById("estado_usuario").value = data.estado
                document.getElementById("cidade_usuario").value = data.localidade
            })
            .catch(error => {
                console.error('Erro:', error);
            });

        // const resultado = await request(url, "GET")
    }else{
        mostrarAlerta("error", "Cep inválido", "Usuarios")
    }
}