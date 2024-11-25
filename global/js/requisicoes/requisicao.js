async function request(url, metodo, json) {
    console.log(url, json)

    // console.log(url, metodo)
    if (metodo == 'GET') {
        var response = await fetch(url, {
            method: metodo,
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            }
        })

    } else {
        var response = await fetch(url, {
            body: JSON.stringify(json),
            method: metodo,
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            }
        })
    }

    
    // console.log(response.reject())
    const resultado = await response.json()
    
    console.log(resultado)
    if (resultado && resultado.error == 'Token invalido') {
        alert('token invalido')
    }
    return resultado
}

async function requestDocs(url, metodo, formData) {

    console.log(url, metodo)

    for (var pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
    }

    if (metodo == 'GET') {
        var response = await fetch(url, {
            method: metodo,
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            }
        })

    } else {
        var response = await fetch(url, {
            body: formData,
            method: metodo,
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            }
        })
    }
    const resultado = await response.json()
    console.log(resultado)
    return resultado
}

async function requestDocsBlob(url, metodo, formData) {

    console.log(url)

    if (metodo == 'GET' || formData === undefined) {

        console.log("nesse if")
        var response = await fetch(url, {
            method: metodo,
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            }
        })

    } else {
        var response = await fetch(url, {
            body: formData,
            method: metodo,
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            }
        })
    }

    if (response.status === 200) {
        let resultado = await response.blob()

        return resultado
    } else {
        return { "error": "Erro ao abrir o documento!" }
    }
}

function limpaOninput(idInput) {
    document.getElementById(idInput).oninput = function () {
        this.value = ''
    }
}

function setaValorOninput(idInput, valor) {
    document.getElementById(idInput).oninput = function () {
        this.value = valor
    }
}

function sairSistema() {
    Swal.fire({
        title: "Sair",
        text: "Você realmente deseja sair do sistema!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim!",
        cancelButtonText: "Não!",
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Tchau!",
                text: "Até mais.",
                icon: "success"
            });
            sessionStorage.clear()
            window.location.replace(urlsFront("public"))
        }
    });

}

var mappingTypesMessages = {


    'success': {
        'icon': 'bi bi-check-circle',
        'titulo': 'Sucesso'
    },


    'danger': {
        'icon': 'bi bi-x-circle',
        'titulo': 'Erro'
    },


    'warning': {
        'icon': 'bi bi-exclamation-circle',
        'titulo': 'Atenção'
    }
}

function mostrarAlerta(tipo, mensagem, complemento) {
    console.log(document.getElementById('alert'+complemento), complemento)
    const alerta = document.getElementById('alert'+complemento);
    const mensagemAlert = alerta.querySelector("#alertMessage");

    mensagemAlert.textContent = '';
    alerta.className = `alert-alert ${tipo} show`;

    mensagemAlert.textContent = mensagem;
    alerta.classList.remove('d-none');

    setTimeout(() => {
        fecharAlerta(complemento);
    }, 3000);
}

// Função para fechar o alerta
function fecharAlerta(complemento) {
    const alerta = document.getElementById('alert'+complemento);
    console.log(alerta)
    alerta.classList.remove('show');
    alerta.classList.add('d-none');
}