
document.onreadystatechange = function () {
    $("#menu").load(urlsFront("global") + "components/menu/menu.html", function () {
        $("#header").load(urlsFront("global") + "components/header/header.html", function () {
            $("#div_consulta_urls").load(urlsFront("cadastros") + "urls/components/form/consultaUrls.html", function () {
                // $("#div_cadastro_urls").load(urlsFront("cadastros") + "urls/components/form/cadastroUrls.html", function () {
                    $("#imports").load(urlsFront("cadastros") + "urls/pages/imports.html", async function () {
                        verificandoUsuario()
                       
                        await getQuestionario()
                        await getCheckList()
                        await getProfissao()
                        console.log(document.getElementById("c_questionario"))
            
                    })
                })
            // })
        })
    })
}