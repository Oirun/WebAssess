function urlsFront(pasta) {
    let urls_base = "http://127.0.0.1:5500/"

    switch (pasta) {
        case "public":
            let url_public = urls_base + "public/"
            return url_public
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

function urlsBack(pasta) {
    // http://localhost:8080/tcc/api/v1/users
    let urls_base = "http://localhost/tcc/api/v1/"

    switch (pasta) {
        case "users":
            let url_users = urls_base + "users/"
            return url_users
        default:
            break;
    }
}

function url_inicio() {
    const url_base = urlsFront("public")
    const url_inicio = url_base + "pages/principal.html"
    console.log(url_inicio)
    window.location.href = url_inicio
    return url_inicio
}

function url_cadastro_usuarios() {
    const url_base = urlsFront("cadastros")
    const url_cadastro_usuarios = url_base+"usuarios/pages/index.html"
    console.log(url_cadastro_usuarios)
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