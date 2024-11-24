async function getChecklistCoordenador(id_questionario) {
    let url = urlsBack("questionarioCoordenador")+"consultaChecklistDoCoodenador"

    const resultado = await request(url, "GET")

    if (resultado.error) {
        console.log("Erro na consulta do questionario do coordenador: "+resultado.error)
    }else{
        document.getElementById("listar-checklist-cadastrados").innerHTML = ""
        resultado.forEach(questionario => {
            if (questionario.id_questionario == id_questionario) {
                let li = criandoLi(questionario)
            }
        });
    }

}