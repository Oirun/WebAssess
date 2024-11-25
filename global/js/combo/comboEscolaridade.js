async function preencherEscolaridade(id_combo_escolaridade, filtro) {
    
    let url = urlsBack("users")+"escolaridade"

    const resultado = await request(url, "GET")
    let combo_escolaridade = document.getElementById(id_combo_escolaridade)
    combo_escolaridade.innerHTML = ""

    if (filtro == "filtro") {
        let option = document.createElement("option")
            option.innerHTML = "TODOS"
            option.setAttribute("data-id-escolaridade", "")

            combo_escolaridade.appendChild(option)
    }

    resultado.forEach(escolaridade => {
        if(escolaridade.ativa == true){
            let option = document.createElement("option")
            option.innerHTML = escolaridade.nome_escolaridade
            option.setAttribute("data-id-escolaridade", escolaridade.id_escolaridade)

            combo_escolaridade.appendChild(option)
        }
    });
}