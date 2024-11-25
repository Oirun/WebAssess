async function preencherProfissao(id_combo_profissao, filtro) {
    
    let url = urlsBack("users")+"profissao"
    console.log(url)
    const resultado = await request(url, "GET")
    let combo_profissao = document.getElementById(id_combo_profissao)
    combo_profissao.innerHTML = ""

    if (filtro == "filtro") {
        let option = document.createElement("option")
            option.innerHTML = "TODOS"
            option.setAttribute("data-id-profissao", "")

            combo_profissao.appendChild(option)
    }

    resultado.forEach(profissao => {
        if(profissao.ativa == true){
            let option = document.createElement("option")
            option.innerHTML = profissao.nome_profissao
            option.setAttribute("data-id-profissao", profissao.id_profissao)

            combo_profissao.appendChild(option)
        }
    });
}