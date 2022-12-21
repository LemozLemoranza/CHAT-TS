
const socket = io();

const divChatbox = $('#divChatbox');

const button = document.querySelector('#sala')
const chat = document.querySelector('#chat')
const form = document.querySelector('#form')
const parrafo = document.querySelector('.lista')
const hora = document.querySelector('.message-data-time')
const listausuarios = document.querySelector('.conectados')

const usuario = readCookie('usuario')

let usuarios = []





function readCookie(name) {

    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + name.replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
  
  }


form.addEventListener('submit', (e) => {
    
    e.preventDefault()
    enviarMensaje()
   
})

const enviarMensaje = () => {
    
    const mensaje = chat.value.trim()

    const payload = {

        usuario,mensaje
    }

    socket.emit('mensaje', payload)
    
}
const crearMensaje = (mensaje, usuarioM) => {

        const fecha =  new Date().toLocaleString()
        let html = ''
    
    if( mensaje.length !== 0){

        if(usuarioM == usuario){
            
            html += `  <li class="clearfix">
            <div class="message-data">
           
                <div class="message my-message"> 
                <span class="message-data-time right">${fecha}</span>
                </hr>
                <div class="name">${usuarioM}</div>


            
            <span class=" strong">${mensaje} </span>
            </div>
                
                
                </div>
            </div>
                </li>
                
                
                
                
                `
                  
                  parrafo.innerHTML += html
                  
                  chat.value = ''

        }else{
          
            html += `  <li class="clearfix">
            <div class="message-data text-right">
           
                <div class="message other-message float-right"> 
                <span class="message-data-time right">${fecha}</span>
                </hr>
                <div class="name">${usuarioM}</div>



                <span class="strong">${mensaje} </span>
                
                
                </div>
            </div>
                </li>`
                  
                  parrafo.innerHTML += html
                  
                  chat.value = ''

        }

    }
}







socket.on('vuelta', (payload) => {

    crearMensaje(payload.mensaje, payload.usuario)
    
})
