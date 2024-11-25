// Variável global para o root (gráfico)
let root = null; 

// Função para criar o gráfico com dados dinâmicos
function criarGrafico(data) {
    // Verificar se o root já existe, se sim, destruí-lo
    if (root) {
        root.dispose(); // Destruir a instância anterior
    }

    // Garantir que o contêiner do gráfico exista
    const chartDiv = document.getElementById("chartdiv");
    if (!chartDiv) {
        console.error("O contêiner 'chartdiv' não existe.");
        return;
    }

    // Criar o elemento root (novo gráfico)
    root = am5.Root.new("chartdiv");

    // Definir temas
    root.setThemes([am5themes_Animated.new(root)]);

    // Criar o gráfico PieChart
    const chart = root.container.children.push(am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
        innerRadius: am5.percent(50)
    }));

    // Criar a série PieSeries
    const series = chart.series.push(am5percent.PieSeries.new(root, {
        valueField: "value",
        categoryField: "category",
        alignLabels: false
    }));

    series.labels.template.setAll({
        textType: "circular",
        centerX: 0,
        centerY: 0
    });

    // Definir os dados para a série
    series.data.setAll(data);

    // Criar a legenda
    const legend = chart.children.push(am5.Legend.new(root, {
        centerX: am5.percent(50),
        x: am5.percent(50),
        marginTop: 15,
        marginBottom: 15,
    }));

    legend.data.setAll(series.dataItems);

    // Animação inicial da série
    series.appear(1000, 100);
}
