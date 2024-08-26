async function request(url, metodo, json) {
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