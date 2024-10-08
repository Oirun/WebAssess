const tabelas = {
    "profissao" : "body_consulta_profissao",
    "escolaridade" : "body_consulta_escolaridade",
    "principio" : "body_consulta_principio"
}
async function getParametros(parametro) {
    
    let url = urlsBack("users")+parametro
    const resultado = await request(url, "GET")

    console.log(tabelas[parametro], resultado, url)

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