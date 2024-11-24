
let cont = 0
let perguntas = ""
let tipo = ""

async function getQuestionarioPerguntasConvidados() {
    //const resultado = await request(urlsBack("questionario") + "perguntas/"+id_questionario+"?tipo=Q", "GET")

    perguntas = ""

    let id_questionario = ""
    let id_checklist = ""
    let url = ""

    if (sessionStorage.getItem("id_questionario") && sessionStorage.getItem("id_questionario") != "" && sessionStorage.getItem("id_questionario") != undefined && sessionStorage.getItem("id_questionario") != null) {
        id_questionario = parseInt(sessionStorage.getItem("id_questionario"))
        url = urlsBack("questionarioAvaliador") + id_questionario
        tipo = "Q"
        document.getElementById("form_responder_questionario").setAttribute("data-idQuestionario", sessionStorage.getItem("id_questionario"))
        sessionStorage.removeItem("id_questionario")
    } else if (sessionStorage.getItem("id_checklist") && sessionStorage.getItem("id_checklist") != "" && sessionStorage.getItem("id_checklist") != undefined && sessionStorage.getItem("id_checklist") != null) {
        id_checklist = parseInt(sessionStorage.getItem("id_checklist"))
        url = urlsBack("questionarioAvaliador") + id_checklist
        tipo = "C"
        document.getElementById("form_responder_questionario").setAttribute("data-idChecklist", sessionStorage.getItem("id_checklist"))
        sessionStorage.removeItem("id_checklist")
    } else {
        window.location.replace(urlsFront("public") + "pages/principal.html")
    }

    const resultado = await request(url, "GET")

    perguntas = resultado // guarda as perguntas recebidas, aqui a unica coisa que pode ser alterada são as chaves de respondido, para nao aparecerem de novo

    document.getElementById("form_responder_questionario").innerHTML = ""

    if (resultado.error) {
        alert(resultado.error)
    } else {

        for (let i = 0; i < perguntas.length; i++) {
            if (perguntas[cont].respondido == false || perguntas[cont].respondido == 0) {
                let divPergunta = criandoPerguntas(perguntas[cont])
             
                document.getElementById("form_responder_questionario").appendChild(divPergunta)
                perguntas[cont].respondido = true
                cont++
                break
            } else {
                cont++
            }
        }
    }
}

async function rotacionandoPergunta() {

    document.getElementById("form_responder_questionario").innerHTML = ""

    if (cont < perguntas.length && cont >= 0) {
        for (let i = 0; i < perguntas.length; i++) {
          
            if (perguntas[cont].respondido == false || perguntas[cont].respondido == 0) {
                let divPergunta = criandoPerguntas(perguntas[cont])
             
                document.getElementById("form_responder_questionario").appendChild(divPergunta)
                perguntas[cont].respondido = true
                cont++
                break
            } else {
                cont++
            }
        }
    } else {
        if (cont == perguntas.length) {
          
            document.getElementById("btnVoltar").classList.remove("d-none")
            let url = ""
            if (document.getElementById("form_responder_questionario").dataset.idquestionario != undefined && document.getElementById("form_responder_questionario").dataset.idquestionario != null && document.getElementById("form_responder_questionario").dataset.idquestionario != "") {
                url = urlsBack("questionarioAvaliador") + "veTodasPerguntasRespondidas/" + document.getElementById("form_responder_questionario").dataset.idquestionario
            } else if (document.getElementById("form_responder_questionario").dataset.idchecklist != undefined && document.getElementById("form_responder_questionario").dataset.idchecklist != null && document.getElementById("form_responder_questionario").dataset.idchecklist != "") {
                url = urlsBack("questionarioAvaliador") + "veTodasPerguntasRespondidas/" + document.getElementById("form_responder_questionario").dataset.idchecklist
            }


            const resultado = await request(url, "GET")
            
            document.getElementById("btnSalvarResposta").classList.add("d-none")
            document.getElementById("form_responder_questionario").innerHTML = ""

            resultado.perguntas.forEach(pergunta => {
                let perg = criandoPerguntas(pergunta)
                document.getElementById("form_responder_questionario").appendChild(perg)

                if (pergunta.resposta != null) {
                    //colocar a resposta nos check box
                   
                    if (tipo == "Q") {
                        switch (parseInt(pergunta.resposta)) {
                            case 1:
                                document.getElementById("radioRuim_" + pergunta.id_pergunta).click()
                                break;
                            case 2:
                                document.getElementById("radioRegular_" + pergunta.id_pergunta).click()

                                break;
                            case 3:
                                document.getElementById("radioBom_" + pergunta.id_pergunta).click()

                                break;
                            case 4:
                                document.getElementById("radioMuitoBom_" + pergunta.id_pergunta).click()

                                break;
                            case 5:
                                document.getElementById("radioOtimo_" + pergunta.id_pergunta).click()

                                break;

                            default:
                                break;
                        }
                    } else if (tipo == "C") {
                       

                        switch (parseInt(pergunta.resposta)) {
                            case 1:
                               
                                document.getElementById("radioSim_" + pergunta.id_pergunta).click()

                                break;
                            case 2:
                                document.getElementById("radioNao_" + pergunta.id_pergunta).click()

                                break;
                            case 3:
                                document.getElementById("radioNaoAplica_" + pergunta.id_pergunta).click()

                                break;

                            default:
                                break;
                        }
                    }
                }
            });

            // document.getElementById("resposta-de-termino").classList.remove("d-none")
            // document.getElementById("btnVoltar").classList.remove("d-none")
            // document.getElementById("btnSalvarResposta").classList.add("d-none")
        }
    }
}


function criandoPerguntas(pergunta) {
 
    let divPergunta = document.createElement("div")
    let labelPergunta = document.createElement("label")
    let pJustificativa = document.createElement("p")
    let textAreaResposta = document.createElement("textarea")
    let divBtn = document.createElement("div")
    let btnSalvar = document.createElement("button")

    divBtn.classList = "d-grid gap-2 d-md-flex justify-content-md-end mt-4"
    btnSalvar.classList = "btn btn-primary"
    btnSalvar.type = "button"
    btnSalvar.innerHTML = "Salvar resposta"
    divBtn.appendChild(btnSalvar)

    // <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
    //     <button class="btn btn-primary" id="btnSalvarResposta" form="form_responder_questionario" type="submit">Salvar</button>
    // </div>

    divPergunta.classList = "col-md-12"

    labelPergunta.classList = "form-label"
    labelPergunta.form = "pergunta_" + pergunta.id_pergunta
    labelPergunta.id = "descricao_" + pergunta.id_pergunta
    labelPergunta.innerHTML = `<strong>Pergunta</strong> <br> ${pergunta.descricao}`

    pJustificativa.innerHTML = `<strong>Justificativa</strong> <br> ${pergunta.justificativa}`

    textAreaResposta.classList = "form-control txtpadraoResposta"
    textAreaResposta.id = "pergunta_" + pergunta.id_pergunta
    textAreaResposta.required = true

    divPergunta.appendChild(labelPergunta)
    divPergunta.appendChild(pJustificativa)
    divPergunta.appendChild(criandoRadios(pergunta))
    divPergunta.appendChild(textAreaResposta)

    if (pergunta.descricao_resposta != null) {
        textAreaResposta.value = pergunta.descricao_resposta

        divPergunta.appendChild(divBtn)
    }

    btnSalvar.onclick = async function () {
        let url = urlsBack("questionarioAvaliador")+"updateResposta/"+pergunta.id_pergunta
        let resposta_descricao = textAreaResposta.value 

        let radios = document.querySelector(`input[name="radioRes_${pergunta.id_pergunta}"]:checked`).id.replace("_"+pergunta.id_pergunta, "")
        let radioRes = ""
    
        switch (radios) {
            case "radioRuim":
                radioRes = 1
                break;
            case "radioRegular":
                radioRes = 2
                break;
            case "radioBom":
                radioRes = 3
                break;
            case "radioMuitoBom":
                radioRes = 4
                break;
            case "radioOtimo":
                radioRes = 4
                break;
            case "radioSim":
                radioRes = 1
                break;      
            case "radioNao":
                radioRes = 2
                break;      
            case "radioNaoAplica":
                radioRes = 3
                break;      
            default:
                break;
        }

      
      let json =
        {
            "resposta" : radioRes,
            "resposta_descricao" : resposta_descricao
        }

        const resultado = await request(url, "PATCH", json)
    
        if (resultado.error) {
            alert(resultado.error)
        } else {
            alert("Resposta Enviada")
            window.location.replace(urlsFront("public")+"pages/principal.html")
            return true
        }
    }

    return divPergunta
}


function criandoRadios(pergunta) {
    //radios
    let divRadios = document.createElement("div")
    divRadios.classList = "div-radios"

    let radioRuim = document.createElement("input")
    let labelRuim = document.createElement("label")
    let radioRegular = document.createElement("input")
    let labelRegular = document.createElement("label")
    let radioBom = document.createElement("input")
    let labelBom = document.createElement("label")
    let radioMuitoBom = document.createElement("input")
    let labelMuitoBom = document.createElement("label")
    let radioOtimo = document.createElement("input")
    let labelOtimo = document.createElement("label")

    let radioSim = document.createElement("input")
    let labelSim = document.createElement("label")
    let radioNao = document.createElement("input")
    let labelNao = document.createElement("label")
    let radioNaoAplica = document.createElement("input")
    let labelNaoAplica = document.createElement("label")

    let classeInput = "form-check-input"
    let classeLabel = "form-check-label"

    radioRuim.classList = classeInput
    labelRuim.classList = classeLabel
    radioRegular.classList = classeInput
    labelRegular.classList = classeLabel
    radioBom.classList = classeInput
    labelBom.classList = classeLabel
    radioMuitoBom.classList = classeInput
    labelMuitoBom.classList = classeLabel
    radioOtimo.classList = classeInput
    labelOtimo.classList = classeLabel

    radioSim.classList = classeInput
    labelSim.classList = classeLabel
    radioNao.classList = classeInput
    labelNao.classList = classeLabel
    radioNaoAplica.classList = classeInput
    labelNaoAplica.classList = classeLabel

    radioRuim.type = "radio"
    radioRegular.type = "radio"
    radioBom.type = "radio"
    radioMuitoBom.type = "radio"
    radioOtimo.type = "radio"

    radioSim.type = "radio"
    radioNao.type = "radio"
    radioNaoAplica.type = "radio"

    radioRuim.name = "radioRes_" + pergunta.id_pergunta
    radioRegular.name = "radioRes_" + pergunta.id_pergunta
    radioBom.name = "radioRes_" + pergunta.id_pergunta
    radioMuitoBom.name = "radioRes_" + pergunta.id_pergunta
    radioOtimo.name = "radioRes_" + pergunta.id_pergunta

    radioSim.name = "radioRes_" + pergunta.id_pergunta
    radioNao.name = "radioRes_" + pergunta.id_pergunta
    radioNaoAplica.name = "radioRes_" + pergunta.id_pergunta

    radioRuim.id = "radioRuim_" + pergunta.id_pergunta
    radioRegular.id = "radioRegular_" + pergunta.id_pergunta
    radioBom.id = "radioBom_" + pergunta.id_pergunta
    radioMuitoBom.id = "radioMuitoBom_" + pergunta.id_pergunta
    radioOtimo.id = "radioOtimo_" + pergunta.id_pergunta

    radioSim.id = "radioSim_" + pergunta.id_pergunta
    radioNao.id = "radioNao_" + pergunta.id_pergunta
    radioNaoAplica.id = "radioNaoAplica_" + pergunta.id_pergunta

    labelRuim.setAttribute("for", "radioRuim_" + pergunta.id_pergunta)
    labelRegular.setAttribute("for", "radioRegular_" + pergunta.id_pergunta)
    labelBom.setAttribute("for", "radioBom_" + pergunta.id_pergunta)
    labelMuitoBom.setAttribute("for", "radioMuitoBom_" + pergunta.id_pergunta)
    labelOtimo.setAttribute("for", "radioOtimo_" + pergunta.id_pergunta)

    labelSim.setAttribute("for", "radioSim_" + pergunta.id_pergunta)
    labelNao.setAttribute("for", "radioNao_" + pergunta.id_pergunta)
    labelNaoAplica.setAttribute("for", "radioNaoAplica_" + pergunta.id_pergunta)

    labelRuim.innerHTML = "Ruim"
    labelRegular.innerHTML = "Regular"
    labelBom.innerHTML = "Bom"
    labelMuitoBom.innerHTML = "Muito Bom"
    labelOtimo.innerHTML = "Ótimo"

    labelSim.innerHTML = "Sim"
    labelNao.innerHTML = "Não"
    labelNaoAplica.innerHTML = "Não se aplica"

    let divCheck1 = document.createElement("div")
    let divCheck2 = document.createElement("div")
    let divCheck3 = document.createElement("div")
    let divCheck4 = document.createElement("div")
    let divCheck5 = document.createElement("div")

    let divCheck6 = document.createElement("div")
    let divCheck7 = document.createElement("div")
    let divCheck8 = document.createElement("div")

    divCheck1.classList = "form-check"
    divCheck2.classList = "form-check"
    divCheck3.classList = "form-check"
    divCheck4.classList = "form-check"
    divCheck5.classList = "form-check"

    divCheck6.classList = "form-check"
    divCheck7.classList = "form-check"
    divCheck8.classList = "form-check"

    divCheck1.appendChild(radioRuim)
    divCheck1.appendChild(labelRuim)
    divCheck2.appendChild(radioRegular)
    divCheck2.appendChild(labelRegular)
    divCheck3.appendChild(radioBom)
    divCheck3.appendChild(labelBom)
    divCheck4.appendChild(radioMuitoBom)
    divCheck4.appendChild(labelMuitoBom)
    divCheck5.appendChild(radioOtimo)
    divCheck5.appendChild(labelOtimo)

    divCheck6.appendChild(radioSim)
    divCheck6.appendChild(labelSim)
    divCheck7.appendChild(radioNao)
    divCheck7.appendChild(labelNao)
    divCheck8.appendChild(radioNaoAplica)
    divCheck8.appendChild(labelNaoAplica)

    if (tipo == "Q") {
        divRadios.appendChild(divCheck1)
        divRadios.appendChild(divCheck2)
        divRadios.appendChild(divCheck3)
        divRadios.appendChild(divCheck4)
        divRadios.appendChild(divCheck5)
    } else if (tipo == "C") {
        divRadios.appendChild(divCheck6)
        divRadios.appendChild(divCheck7)
        divRadios.appendChild(divCheck8)
    }

    return divRadios
}