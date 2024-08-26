async function preencherEscolaridade(id_combo_escolaridade) {
    
    let url = urlsBack("users")+"escolaridade"

    const resultado = await request(url, "GET")
    let combo_escolaridade = document.getElementById(id_combo_escolaridade)
    combo_escolaridade.innerHTML = ""
    resultado.forEach(escolaridade => {
        if(escolaridade.ativa == true){
            let option = document.createElement("option")
            option.innerHTML = escolaridade.nome_escolaridade
            option.setAttribute("data-id-escolaridade", escolaridade.id_escolaridade)

            combo_escolaridade.appendChild(option)
        }
    });
}