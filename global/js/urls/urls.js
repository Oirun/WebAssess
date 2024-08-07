function urlsFront(pasta) {
    let urls_base = "http://localhost/WebAssess/"

    switch (pasta) {
        case "global":
            let url_global = urls_base + "global/"
            return url_global
        case "cadastros":
            let url_cadastros = urls_base + "cadastros/"
            return url_cadastros
        case "questionario":
            let url_questionario = urls_base + "questionario/"
            return url_questionario
        default:
            break;
    }
}

function url_cadastro_usuarios() {
    const url_base = urlsFront("cadastros")
    const url_cadastro_usuarios = url_base+"usuarios/pages/index.html"
    window.location.href = url_cadastro_usuarios
    return url_cadastro_usuarios
}

function url_cadastro_parametros() {
    const url_base = urlsFront("cadastros")
    const url_cadastro_parametros = url_base+"parametros/pages/index.html"
    window.location.href = url_cadastro_parametros
    return url_cadastro_parametros
}

function url_questionario() {
    const url_base = urlsFront("questionario")
    const url_questionario = url_base+"pages/index.html"
    console.log(url_questionario)
    window.location.href = url_questionario
    return url_questionario
}