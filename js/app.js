const formulario = document.querySelector("#formulario")
const listaTweets = document.querySelector("#lista-tweets")
let tweets = []

cargarEventListeners()
function cargarEventListeners(){
    formulario.addEventListener("submit",agregarTweet)
    document.addEventListener("DOMContentLoaded",()=>{
        tweets = JSON.parse(localStorage.getItem("tweet")) || []
        crearHTML()
    })
}

function agregarTweet(e){
    e.preventDefault()
    const tweet = document.querySelector("#tweet").value
    if(tweet.length > 0){
        const tweetObj = {
            id: Date.now(),
            texto: tweet
        }
        tweets = [...tweets,tweetObj]
        crearHTML()
        formulario.reset()
        console.log(tweets)
    }else{
        mostrarError()
    }
}

function crearHTML(){
    limpiarHTML()
    tweets.forEach(tweet=>{
        const li = document.createElement("li")
        const btnEliminar = document.createElement("a")
        btnEliminar.textContent = "X"
        btnEliminar.classList.add("borrar-tweet")
        btnEliminar.onclick = ()=>{
            borrarTweet(tweet.id)
        }
        li.textContent = tweet.texto
        listaTweets.appendChild(li)
        li.appendChild(btnEliminar)
    })
    sincronizarStorage()
}

function sincronizarStorage(){
    localStorage.setItem("tweet",JSON.stringify(tweets))
}

function borrarTweet(id){
    tweets = tweets.filter(tweet => tweet.id !== id)
    crearHTML()
}

function limpiarHTML(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild)
    }
}

function mostrarError(){
    const mensajeError = document.createElement("p")
    mensajeError.classList.add("error")
    mensajeError.textContent = "El tweet no puede ir vacio"
    const contenido = document.querySelector("#contenido")
    const errores = document.querySelectorAll(".error")
    if(errores.length === 0){
        contenido.appendChild(mensajeError)
    }
    setTimeout(()=>{
        mensajeError.remove()
    },3000)
}