document.onreadystatechange = function () {
    $("#menu").load(urlsFront("global") + "components/menu/menu.html", function () {
        $("#header").load(urlsFront("global") + "components/header/header.html", function () {
            $("#div_cadastro_usuario").load(urlsFront("cadastros") + "usuarios/components/form/cadastroUsuario.html", function () {
                $("#table_consulta_usuario").load(urlsFront("cadastros") + "usuarios/components/table/tableUsuario.html", function () {
                    $("#imports").load(urlsFront("cadastros") + "usuarios/pages/importsJS.html", async function () {
                        verificandoUsuario()
                        
                        await preencherProfissao("profissao")
                        await preencherEscolaridade("escolaridade")
                        await preencherProfissao("c_profissao", "filtro")
                        await preencherEscolaridade("c_escolaridade", "filtro")

                        if (sessionStorage.getItem("id_usuario")) {
                            await getUsuarioTabela(sessionStorage.getItem("id_usuario"))
                            sessionStorage.removeItem("id_usuario")
                        }
                        
                        getUsuario(true)

                        document.getElementById("btnConsultarUsuario").onclick = async function () {
                            await getUsuarioTabela()
                        }

                        document.getElementById("btnCadastrar").onclick = async function (e) {
                            await validateForm(e)
                        }
                    })
                })
            })
        })
    })
}


function mascaraCEP(input) {

    let cep = input.value.replace(/\D/g, '');
    
    if (cep.length > 5) {
        cep = cep.substring(0, 5) + '-' + cep.substring(5, 8);
    }

    input.value = cep;
}