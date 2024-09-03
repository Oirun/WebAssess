function cancelar() {
    document.getElementById("form_cadastro_usuarios").reset()
    document.getElementById("form_cadastro_usuarios").classList.remove("was-validated")

    document.getElementById("modulo_titulo_cadastro_usuario").innerHTML = "Cadastro de Usuário"
}