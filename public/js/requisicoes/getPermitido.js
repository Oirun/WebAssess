async function getSolicitacoesPermitir() {
    let lista = document.getElementById("lista_permitir")
    lista.innerHTML = ""

    const resultado = await request(urlsBack("users") + "admin/daPermitido", "GET")

    if (resultado.error) {

    } else {
        resultado.forEach(solicitacao => {
            let li = construindoLi(solicitacao)
            lista.appendChild(li)
        });
    }
}

function construindoLi(solicitacao) {
    let li = document.createElement("li")
    let divCheck = document.createElement("div")
    let inputCheck = document.createElement("input")
    let labelCheck = document.createElement("label")
    // dropdown
    let divGroup = document.createElement("div")
    let buttonDrop = document.createElement("button")
    let listaDrop = document.createElement("ul")
    let liDrop = document.createElement("li")

    li.classList = "list-group-item"
    divCheck.classList = "form-check"
    inputCheck.classList = "form-check-input check_solicitacoes"
    inputCheck.type = "checkbox"
    inputCheck.id = "check_"+solicitacao.id_usuario
    labelCheck.classList = "form-check-label"
    labelCheck.setAttribute("for", "check_"+solicitacao.id_usuario)

    divGroup.classList = "btn-group"
    buttonDrop.classList = "btn btn-secondary btn-sm dropdown-toggle"
    buttonDrop.type = "button"
    buttonDrop.setAttribute("data-bs-toggle", "dropdown")
    buttonDrop.setAttribute("aria-expanded", "false")

    listaDrop.classList = "dropdown-menu"
    liDrop.classList = "list-group-item"

    let nivel = "" 
    solicitacao.tipo == "C" ? nivel = "Coordenador" : nivel = "Avaliador" 
    liDrop.innerHTML = solicitacao.email +" : "+nivel

    labelCheck.innerHTML = solicitacao.nome_usuario

    divCheck.appendChild(inputCheck)
    divCheck.appendChild(labelCheck)

    listaDrop.appendChild(liDrop)
    divGroup.appendChild(buttonDrop)
    divGroup.appendChild(listaDrop)

    li.appendChild(divCheck)
    li.appendChild(divGroup)
    return li
}

{/* 
    <li class="list-group-item">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                  <label class="form-check-label" for="flexCheckDefault">
                    Manuela Macena dos Santos
                  </label>
                </div>

                <div class="btn-group">
                  <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    
                  </button>
                  <ul class="dropdown-menu">
                    ...
                  </ul>
                </div>
              </li> */}