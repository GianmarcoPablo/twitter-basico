const formulario = document.querySelector("#formulario")
const listaTweets = document.querySelector("#lista-tweets")
let tweets = []

cargarEventListeners()
function cargarEventListeners() {
    formulario.addEventListener("submit", agregarTweet)
    document.addEventListener("DOMContentLoaded",()=>{
        tweets = JSON.parse(localStorage.getItem("carrito")) || []
        crearHTML()
    })
}

function agregarTweet(e){
    e.preventDefault()
    const tweet = document.querySelector("#tweet").value
    if(tweet === ""){
        mostrarError()
    }else{
        const tweetObj = {
            id: Date.now(),
            texto: tweet
        }
        tweets = [...tweets,tweetObj]
        crearHTML()
        formulario.reset()
    }
}

function mostrarError(){
    const mensajeError = document.createElement("p")
    mensajeError.classList.add("error")
    mensajeError.textContent = "El mensaje no puede ir vacio"
    const contenido = document.querySelector("#contenido")
    const errores = document.querySelectorAll(".error")
    if(errores.length === 0){
        contenido.appendChild(mensajeError)
    }
    setTimeout(()=>{
        mensajeError.remove()
    },3000)
}

function crearHTML(){
    limpiarHTML()
    tweets.forEach(tweet=>{
        const li = document.createElement("li")
        const btnEliminar = document.createElement("a")
        btnEliminar.classList.add("borrar-tweet")
        btnEliminar.textContent = "X"
        btnEliminar.onclick = (tweet)=>{
            eliminarTweet(tweet.id)
        }
        li.textContent = tweet.texto
        const listaTweets = document.querySelector("#lista-tweets")
        listaTweets.appendChild(li)
        li.appendChild(btnEliminar)
    })
    sincronizarStorage()
}

function sincronizarStorage(){
    localStorage.setItem("carrito",JSON.stringify(tweets))
}

function eliminarTweet(id){
    tweets = tweets.filter(tweet=>tweet.id !== id)
    limpiarHTML()
}

function limpiarHTML(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild)
    }
}