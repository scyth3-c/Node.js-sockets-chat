const socket = io()

let mensaje = document.getElementById('mensaje');
let usuario = document.getElementById('usuario');
let btn_enviar = document.getElementById('enviar');
let salida = document.getElementById('salida');
let color = document.getElementById('color');
var nmsg = 0;

btn_enviar.addEventListener('click', () => {
    if(mensaje.value != "") {
        socket.emit('chat:mensaje', {
            usuario: usuario.value,
            mensaje: mensaje.value,
            color: color.value
        })
    } else {
       
        if(!document.getElementById('alerta')){
            let desk = document.createElement("div");
        desk.setAttribute("id", "alerta");
        desk.innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
        Joven y el <strong>mensaje?</strong>.
        <button type="button" class="close" data-dismiss="alert" aria-label="Close" onclick="retiredAlert()">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>`;
      document.getElementById('alertas').appendChild(desk);
        }
    }
});

document.body.addEventListener("keyup", ({key}) => {
    if (key === "Enter") {
        if(mensaje.value != "") {
            socket.emit('chat:mensaje', {
                usuario: usuario.value,
                mensaje: mensaje.value,
                color: color.value
            })
        } else {
           
            if(!document.getElementById('alerta')){
                let desk = document.createElement("div");
            desk.setAttribute("id", "alerta");
            desk.innerHTML = `<div class="alert alert-warning alert-dismissible fade show float-center" role="alert">
            Joven y el <strong>mensaje?</strong>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close" onclick="retiredAlert()">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>`;
          document.getElementById('alertas').appendChild(desk);
            }
        }
    }
})

socket.on('respuesta', (data) => {
    if(data.mensaje == undefined || data.usuario == "") {
        let desk = document.createElement("div");
        desk.setAttribute("id", "alerta");
        desk.innerHTML = `<div class="alert alert-primary lert-dismissible fade show" role="alert" >
        no tienes nombre?
        <button type="button" class="close" data-dismiss="alert" aria-label="Close" onclick="retiredAlert()">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>`;
      document.getElementById('alertas').appendChild(desk);
     } 
    else {
        var clase = ["<p id='msg' class='text-primary text-weight-bold'>"+ data.usuario+" : "+data.mensaje+"</p>", "<p id='msg' class='text-success text-weight-bold'>"+ data.usuario+" : "+data.mensaje+"</p>", "<p id='msg' class='text-warning text-weight-bold'>"+ data.usuario+" : "+data.mensaje+"</p>", "<p id='msg' class='text-danger text-weight-bold'>"+ data.usuario+" : "+data.mensaje+"</p>", "<p id='msg' class='text-info text-weight-bold'>"+ data.usuario+" : "+data.mensaje+"</p>"];
        salida.innerHTML += clase[data.color];

        mensaje.value = ""
        if(nmsg == 5){ 
            nmsg = 0;
            salida.innerHTML = " ";
            salida.innerHTML += clase[data.color];
        
        } else {
            nmsg += 1;
        }
       
    }
});

socket.on('users',(nusers)=>{
   document.getElementById('users').innerHTML = nusers+" personas conectadas";
});


function reset(){ salida.innerHTML = " "; salida.removeChild(document.getElementById('msg'));}
function retiredAlert() {document.getElementById('alertas').removeChild(document.getElementById('alerta')); }

