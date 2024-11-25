
document.onreadystatechange = function () {
    $("#menu").load(urlsFront("global") + "components/menu/menu.html", function () {
        $("#header").load(urlsFront("global") + "components/header/header.html", function () {
            $("#div_consulta_urls").load(urlsFront("relatoriosPorCategoria") + "components/forms/consultaUrls.html", function () {
                    $("#imports").load(urlsFront("relatoriosPorCategoria") + "pages/imports.html", async function () {
                        verificandoUsuario()
                        // preencherProfissao("profissao", "filtro")

                        document.querySelector(".dados_relatorio_inicio").classList.add("d-none")

                        document.getElementById("btnConsultaUrls").click()
                        const tooltipTriggerList = document.querySelectorAll('[data-bs-toll="tooltip"]')
                        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
                    })
                })
           
        })
    })
}