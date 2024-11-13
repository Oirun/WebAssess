document.onreadystatechange = function () {
    $("#menu").load(urlsFront("global") + "components/menu/menu.html", function () {
        $("#header").load(urlsFront("global") + "components/header/header.html", function () {
            $("#div_urls_convidados").load(urlsFront("public") + "components/table/tableAvaliacaoConvidados.html", function () {
                $("#imports").load(urlsFront("public") + "pages/imports.html", async function () {
                    verificandoUsuario()
                    
                    if (sessionStorage.getItem("user_t") == "U") {
                        await getUrlsConvidados()
                    }else if (sessionStorage.getItem("user_t") == "A") {
                        await getSolicitacoesPermitir()
                    }
                    
                    document.getElementById("aceitarCadastro") ? document.getElementById("aceitarCadastro").onclick = function () {
                        
                        permitindoNovosUsuarios()
                    }: 0
                    document.getElementById("irUrl") ? document.getElementById("irUrl").onclick = function () {
                        
                        window.location.replace(urlsFront("cadastros")+"urls/pages/index.html")
                    }: 0
                })
            })
        })
    })
}