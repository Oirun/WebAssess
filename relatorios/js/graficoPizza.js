function fazendoGrafico(dados) {
    // Dados informados para o gráfico de pizza
    // let dados = [30, 25, 0, 0, 0]; // Aqui você pode inserir as quantidades
    let cores = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#FFEB33']; // Cores das fatias

    // Obtém o contexto do canvas para desenhar
    let canvas = document.getElementById('pieChart');
    let ctx = canvas.getContext('2d');

    // Função para desenhar o gráfico de pizza
    function desenharGraficoPizza(dados, cores) {
        let total = dados.reduce((acc, valor) => acc + valor, 0); // Soma dos valores
        let inicioAngulo = 0; // Angulo inicial

        for (let i = 0; i < dados.length; i++) {
            let proporcao = dados[i] / total; // Proporção de cada fatia
            let anguloFinal = inicioAngulo + proporcao * 2 * Math.PI; // Calcula o ângulo final

            // Desenha cada fatia
            ctx.beginPath();
            ctx.arc(200, 200, 150, inicioAngulo, anguloFinal); // Desenha o arco
            ctx.lineTo(200, 200); // Volta ao centro
            ctx.fillStyle = cores[i]; // Define a cor
            ctx.fill(); // Preenche a fatia

            // Atualiza o ângulo de início para a próxima fatia
            inicioAngulo = anguloFinal;
        }
    }

    // Chama a função para desenhar o gráfico
    desenharGraficoPizza(dados, cores);
};