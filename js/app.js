// VARIABLES
const formulario = document.querySelector("#formulario")
const listaTweets = document.querySelector("#lista-tweets")
let tweets = [];

// EVENT LISTENERS
cargarEventListeners()
function cargarEventListeners(){
    formulario.addEventListener("submit", agregarTweet)
}


// FUNCTIONS

function agregarTweet(e){
    e.preventDefault()
    //textarea donde el usuario escribe
    const tweet = document.querySelector("#tweet").value
    if(tweet === ""){
        mostrarError("Un mensaje no puede ir vacio")
        return //evita que se ejecuten mas lineas de codigo
    }

    const tweetObj = {
        id: Date.now(),
        tweet
    }
    //añadir al areglo de twets
    tweets = [...tweets, tweetObj]

    //una vez agregado crear html
    crearHTML()
    formulario.reset()
}

// mostrar mensaje error
function mostrarError(error){
    const mensajeError = document.createElement("p")
    mensajeError.textContent = error
    mensajeError.classList.add("error")

    //insertalo al html
    const contenido = document.querySelector("#contenido")

    const errores = document.querySelectorAll(".error")
    if(errores.length === 0){
        contenido.appendChild(mensajeError)
    }
    
    setTimeout(() => {
        mensajeError.remove( )
    }, 3000);
}

function crearHTML(){
    limpiarHTML()
    if(tweets.length > 0){
        tweets.forEach(tweet=>{
            const li = document.createElement("li")
            li.innerHTML = tweet.tweet
            listaTweets.appendChild(li)
        })
    }
}

function limpiarHTML(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild)
    }
}