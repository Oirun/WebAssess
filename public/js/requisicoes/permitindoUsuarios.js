 function permitindoNovosUsuarios() {
    let listaSolicitacoes = document.querySelectorAll(".check_solicitacoes")
    console.log(listaSolicitacoes)
    if (listaSolicitacoes.length > 0) {
        listaSolicitacoes.forEach(async check  => {
           
            if (check.checked) {
                console.log(urlsBack("users")+"admin/daPermitido/"+check.id.replace("check_", "").trim())
                let resultado = await request(urlsBack("users")+"admin/daPermitido/"+check.id.replace("check_", ""), "PATCH", "")
                if (resultado.error) {
                    alert(`O usuário de código ${check.id.replace("check", "")}, não pode ser permitido, por favor, entrar em contato com o suporte.`)
                    console.log(resultado)
                } else {
                    console.log(resultado)
                    getSolicitacoesPermitir()
                }
            }
        });
    }
}