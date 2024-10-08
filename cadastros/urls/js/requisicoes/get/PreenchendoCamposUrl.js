async function getQuestionario() {
    const resultado = await request(urlsBack("questionario") + "doUsuario?tipo=Q", "GET")
    
    if (resultado.error) {
        console.log("erro ao consultar questionario para preencher os campos")
    } else {
        document.getElementById("c_questionario").innerHTML = ""
        document.getElementById("url_questionario").innerHTML = ""
        
        let optionTodos = document.createElement("option")
        optionTodos.innerHTML = "Todos"

        document.getElementById("c_questionario").appendChild(optionTodos)

        resultado.forEach(questionario => {

            // if (questionario.status = true) {                
            let optionC = document.createElement("option")
            optionC.innerHTML = questionario.titulo
            optionC.setAttribute("value", questionario.id_questionario)

            let option = document.createElement("option")
            option.innerHTML = questionario.titulo
            option.setAttribute("value", questionario.id_questionario)

            document.getElementById("c_questionario").appendChild(optionC)
            document.getElementById("url_questionario").appendChild(option)
            
            
            // }
        });
    }
}

async function getCheckList() {
    const resultado = await request(urlsBack("questionario") + "checklist/doUsuario", "GET")

    if (resultado.error) {
        console.log("erro ao consultar checklist para preencher os campos")
    } else {
        document.getElementById("c_check_list").innerHTML = ""
        document.getElementById("url_check_list").innerHTML = ""

        let optionTodos = document.createElement("option")
        optionTodos.innerHTML = "Todos"

        document.getElementById("c_check_list").appendChild(optionTodos)

        resultado.forEach(checklist => {
            // if (checklist.status == true) {     
            let optionC = document.createElement("option")
            optionC.innerHTML = checklist.titulo
            optionC.setAttribute("value", checklist.id_questionario)

            let option = document.createElement("option")
            option.innerHTML = checklist.titulo
            option.setAttribute("value", checklist.id_questionario)

            document.getElementById("c_check_list").appendChild(optionC)
            document.getElementById("url_check_list").appendChild(option)
            // }
        });
    }
}
async function getProfissao() {
    const resultado = await request(urlsBack("users") + "profissao", "GET")

    if (resultado.error) {
        console.log("erro ao consultar profissao para preencher os campos")
    } else {
        document.getElementById("c_publico_alvo").innerHTML = ""
        document.getElementById("url_publico_alvo").innerHTML = ""

        let optionTodos = document.createElement("option")
        optionTodos.innerHTML = "Todos"

        document.getElementById("c_publico_alvo").appendChild(optionTodos)

        resultado.forEach(profissao => {
            if (profissao.ativa == true) {
                let optionC = document.createElement("option")
                optionC.innerHTML = profissao.nome_profissao
                optionC.setAttribute("value", profissao.id_profissao)

                let option = document.createElement("option")
                option.innerHTML = profissao.nome_profissao
                option.setAttribute("value", profissao.id_profissao)

                document.getElementById("c_publico_alvo").appendChild(optionC)
                document.getElementById("url_publico_alvo").appendChild(option)
            }
        });
    }
}
async function getCategoria() {
    const resultado = await request(urlsBack("users") + "categoria", "GET")

    if (resultado.error) {
        console.log("erro ao consultar questionario para preencher os campos")
    } else {
        document.getElementById("c_categoria").innerHTML = ""
        document.getElementById("url_questionario").innerHTML = ""

        let optionTodos = document.createElement("option")
        optionTodos.innerHTML = "Todos"

        document.getElementById("c_categoria").appendChild(optionTodos)

        resultado.forEach(categoria => {
            // if (categoria.status == true) {                
            let optionC = document.createElement("option")
            optionC.innerHTML = categoria.titulo
            optionC.setAttribute("value", categoria.id_categoria)

            let option = document.createElement("option")
            option.innerHTML = categoria.titulo
            option.setAttribute("value", categoria.id_categoria)

            document.getElementById("c_categoria").appendChild(optionC)
            document.getElementById("url_categoria").appendChild(option)
            // }
        });
    }
}