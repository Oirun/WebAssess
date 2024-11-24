const tabelas = {
    "profissao" : "body_consulta_profissao",
    "escolaridade" : "body_consulta_escolaridade",
    "principio" : "body_consulta_principio"
}
async function getParametros(parametro) {
    let url = ""

        url = urlsBack("users")+parametro
    
    console.log(url)
    const resultado = await request(url, "GET")

    if (resultado.error) {
        console.log(resultado.error)
    } else {
        document.getElementById(tabelas[parametro]).innerHTML = ""
        resultado.forEach(profissao => {
            let linha = construindoLinha(profissao, parametro)
            document.getElementById(tabelas[parametro]).appendChild(linha)
        });
    }
}