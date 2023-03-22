const formulario = document.querySelector("#formulario")
const listaTweets = document.querySelector("#lista-tweets")
let tweets = [];

cargarEventListeners()
function cargarEventListeners(){
    //cuando el usuario agrega un nuevo tweet
    formulario.addEventListener("submit",agregarTweet)
    //cuando el documento este listo
    document.addEventListener("DOMContentLoaded", ()=>{
        tweets = JSON.parse(localStorage.getItem("tweets")) || [];
        crearHTML()
    })
}

function agregarTweet(e){
    e.preventDefault()
    const tweet = document.querySelector("#tweet").value
    if(tweet === ""){
        mostrarError("Un mensaje no puede ir vacio")
    }else{
        const tweetObj = {
            id: Date.now(),
            texto: tweet
        }
        tweets = [...tweets,tweetObj]
    }
    
    crearHTML()
    formulario.reset()
    console.log(tweets)
}

function mostrarError(error){
    const mensajeError = document.createElement("p")
    mensajeError.textContent = error
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

function crearHTML(){
    limpiarHTML()

    tweets.forEach(tweet=>{
        const {texto} = tweet

        const btnEliminar = document.createElement("a")
        btnEliminar.classList.add("borrar-tweet")
        btnEliminar.innerText = "X"
        //añadir la funcion de eliminar
        btnEliminar.onclick = () =>{
            borrarTweet(tweet.id)
        }

        const li = document.createElement("li")
        li.textContent = texto
        li.appendChild(btnEliminar)
        listaTweets.appendChild(li)
    })
    
    sincronizarStorage()
}
//agrega los tweets acutalies al localstorage
function sincronizarStorage(){
    localStorage.setItem("tweets",JSON.stringify(tweets))
}

function borrarTweet(id){
    tweets = tweets.filter(tweet=>tweet.id !== id)
    crearHTML()
}

function limpiarHTML(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild)
    }
}