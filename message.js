/**MESSAGE */
const endpointMessage = "https://gb889a79b8713d4-db202109242140.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message"

const etpMessage = document.getElementById("Messages")
const btnmessage = document.getElementById("crearMessage")
const btnVerMessage = document.getElementById("verMensajes")


/**
 * Peticion GET al endpoint
 */

 function peticionGetMessages() {
    $.ajax({
        method: "GET",
        url: endpointMessage,
        success: function (data) {
            getMessage(data.items)          
        },
        error:function(error){
            console.log("Error al consumir la API Oracle Cloud")
        }
    });
 }
/**
 * grafica los items en una tabla para mostrarlos asl usuario
 */
 function getMessage(Message){
    let tablaMessage = "<table >"
    tablaMessage+="<tr>"
    tablaMessage+="<th>"+"Codigo"+"</th>";
    tablaMessage+="<th>"+"Mensaje"+"</th>";
    tablaMessage+="<th>"+"</th>";
    tablaMessage+="</tr>";
    Message.forEach(message => {

                tablaMessage+="<tr>";
                tablaMessage+="<td>"+message.id+"</td>";
                tablaMessage+="<td id='mensaje"+message.id+"'>"+message.messagetext+"</td>";
                tablaMessage+="<td><p><button type='button' onclick='editarMensaje("+JSON.stringify(message)+")' id='botEditarMens"+message.id;
                tablaMessage+= "'>"+"Editar</button>&nbsp &nbsp<br></p>";
                tablaMessage+= "<p><button onclick='confMess(" + message.id + ")' id='botBorrar";
                tablaMessage+= message.id + "'>" + "Borrar</button></p>&nbsp&nbsp</td>";
                tablaMessage += "</tr>";

    }
    );
    tablaMessage+="</table>";
    etpMessage.innerHTML = tablaMessage;
 }

/** Peticion POST al endpoind*/

function postMessage(){
    const data ={
        id:$("#idMes").val(), //PONER LOS NOMBRES EN LA TABLA EN EL HTML
        messagetext:$("#messMes").val()
    }
    let datasend=JSON.stringify(data)
    $.ajax({
        method: "POST",
        url: endpointMessage,
        data:datasend,
        dataType:"json",
        contentType:"application/json",
        complete:function(response){
            $("#idMes").val(""),
            $("#messMes").val("Escriba su mensaje aqui..."),
            alert("Mensaje Creado")
            peticionGetMessages()
        },
        error:function(error){
        }
    });
}

/**Peticion Put */

function putMessage(id) {
    const data = {
        id: id,
        messagetext:$("#editMestxmes"+id).val(),
    }
    let datasend = JSON.stringify(data)
    $.ajax({
        method: "PUT",
        url: endpointMessage,
        data: datasend,
        dataType: 'json',
        contentType: "application/json",
        complete: function (response) {
            alert("Mensaje actualizado!!")
            peticionGetMessages()
        },
        error: function (error) {
        }
    });
}



/**funcion delete */
function peticionDelete(id) {

    const data = {
        id: id
    }
    let datasend = JSON.stringify(data)
    $.ajax({

        method: "DELETE",
        url: endpointMessage,
        data: datasend,
        dataType: 'json',
        contentType: "application/json",
        complete: function (response) {
            alert("Mesaje eliminado!!")
            peticionGetMessages()
        },
        error: function (error) {

        }
    });
}

/**muestra al usuario una confirmacion para borrar*/
function confMess(id){
    
    var con =confirm("Seguro que quieres borrar el mensaje?")
    if (con == true) {
        peticionDelete(id)
    }
}

/**funcion para cambiar la informacion del item*/

function editarMensaje(message){           
    document.getElementById("mensaje"+message.id).innerHTML = "<p><b>Mensaje: </b><textarea id='editMestxmes"+message.id+"'></textarea></p><br>";
    document.getElementById("editMestxmes"+message.id).value = message.messagetext;

    x = document.createElement("button")
    y = document.getElementById("botEditarMens"+message.id)
    x.innerHTML = "Cambiar"
    y.replaceWith(x);
    x.setAttribute("id", "botCambiarMessage" + message.id);
    x.addEventListener("click", (e) => {
        e.preventDefault()
        putMessage(message.id)
    
    })
}
    
            

btnmessage.addEventListener("click", (e) => {
    postMessage()
})

btnVerMessage.addEventListener("click", (e) => {
    e.preventDefault()
    peticionGetMessages()
})