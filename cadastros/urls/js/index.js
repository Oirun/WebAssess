
document.onreadystatechange = function () {
    $("#menu").load(urlsFront("global") + "components/menu/menu.html", function () {
        $("#header").load(urlsFront("global") + "components/header/header.html", function () {
            $("#div_consulta_urls").load(urlsFront("cadastros") + "urls/components/form/consultaUrls.html", function () {
                $("#div_table_consulta_urls").load(urlsFront("cadastros") + "urls/components/table/tableUrls.html", function () {
                    $("#div_modal_convidar").load(urlsFront("cadastros") + "urls/components/modal/modalConvidar.html", function () {
                        // $("#div_cadastro_urls").load(urlsFront("cadastros") + "urls/components/form/cadastroUrls.html", function () {
                        $("#imports").load(urlsFront("cadastros") + "urls/pages/imports.html", async function () {
                            verificandoUsuario()
                            preencherProfissao("profissao", "filtro")

                            document.getElementById("btnConsultaUrls").click()
                            const tooltipTriggerList = document.querySelectorAll('[data-bs-toll="tooltip"]')
                            const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
                        })
                    })
                })
            })
            // })
        })
    })
}