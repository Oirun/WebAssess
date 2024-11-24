async function preencherProfissao(id_combo_profissao) {
    
    let url = urlsBack("users")+"profissao"

    const resultado = await request(url, "GET")
    let combo_profissao = document.getElementById(id_combo_profissao)
    combo_profissao.innerHTML = ""
    resultado.forEach(profissao => {
        if(profissao.ativa == true){
            let option = document.createElement("option")
            option.innerHTML = profissao.nome_profissao
            option.setAttribute("data-id-profissao", profissao.id_profissao)

            combo_profissao.appendChild(option)
        }
    });
}