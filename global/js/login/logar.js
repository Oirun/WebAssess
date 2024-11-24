function fazerLogin() {
    let user = document.getElementById("").value
    let pass = document.getElementById("").value

    const response = fetch("https://jsonplaceholder.typicode.com/posts")
                    .then(function (responseData) {
                        return responseData.json();
                    })
                    .then(function (jsonData) {
                        console.log(jsonData)
                    })
}