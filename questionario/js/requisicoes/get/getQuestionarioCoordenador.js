async function getQuestionarioCoordenador(id_questionario) {
    let url = urlsBack("questionarioCoordenador")+"consultaQuestionariosDoCoodenador"

    const resultado = await request(url, "GET")

    if (resultado.error) {
        // mostrarAlerta("warning", "Sem resultados para a consulta de questionários.", "Questionario")
        console.log("Erro na consulta do questionario do coordenador: "+resultado.error)
    }else{
        document.getElementById("listar-questionarios-cadastrados").innerHTML = ""
        resultado.forEach(questionario => {
            if (questionario.id_questionario == id_questionario) {
                let li = criandoLi(questionario)
            }
        });
    }

}