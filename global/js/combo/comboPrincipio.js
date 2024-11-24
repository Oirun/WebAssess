async function preencherPrincipio(id_combo_principio) {
    // http://localhost/tcc/api/v1/principio/consulta
    let url = urlsBack("principio")+"consulta"

    const resultado = await request(url, "GET")
    console.log(resultado)

    let combo_principio = document.getElementById(id_combo_principio)
    combo_principio.innerHTML = ""
    resultado.forEach(principio => {
        // if(principio.ativa == true){
            let option = document.createElement("option")
            option.innerHTML = principio.descricao
            option.setAttribute("data-id-principio", principio.id_principio)

            combo_principio.appendChild(option)
        // }
    });
}