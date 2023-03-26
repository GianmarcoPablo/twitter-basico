const formulario = document.querySelector("#formulario")
const listaTweets = document.querySelector("#lista-tweets")
let tweets = []

cargarEventListeners()
function cargarEventListeners(){
    formulario.addEventListener("submit",agregarTweet)
    document.addEventListener("DOMContentLoaded",()=>{
        tweets = JSON.parse(localStorage.getItem("tweets")) || []
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
        console.log(tweets)
    }
}

function crearHTML(){
    limpiarHTML()
    tweets.forEach(tweet=>{
        const btnEliminar = document.createElement("a")
        const li = document.createElement("li")
        btnEliminar.classList.add("borrar-tweet")
        btnEliminar.textContent = "X"
        btnEliminar.onclick = ()=>{
            borrarTweet(tweet.id)
        }
        li.textContent = tweet.texto
        li.appendChild(btnEliminar)
        listaTweets.appendChild(li)
    })
    
    sincronizarStorage()
}

function borrarTweet(id){
    tweets = tweets.filter(tweet=>tweet.id !== id)
    crearHTML()
}

function sincronizarStorage(){
    localStorage.setItem("tweets",JSON.stringify(tweets))
}

function limpiarHTML(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild)
    }
}



function mostrarError(){
    const mensajeError = document.createElement("p")
    mensajeError.textContent = "Los tweets no pueden ir vacios"
    mensajeError.classList.add("error")
    const contenido = document.querySelector("#contenido")
    const errores = document.querySelectorAll(".error")
    if(errores.length === 0){
        contenido.appendChild(mensajeError)
    }
    setTimeout(() => {
        mensajeError.remove()
    }, 3000);
}