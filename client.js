/**CLIENT */

const endpointClient = "https://g80562ffe15f25f-db202109271726.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client"

const etpClient = document.getElementById("client")
const btnNuevoClient = document.getElementById("crearClient")
const btnVerClient = document.getElementById("verClient")



/** PETICION GET */

function getClient(){
    $.ajax({
        method: "GET",
        url: endpointClient,
        success:function(data){
            pintarRespuestacliente(data.items)
        },
        error:function(error){
            console.log("Error al consumir la API Oracle Cloud")
        }
    });
}

function pintarRespuestacliente(clientes) { 
    let tablaClient = "<table>"
    tablaClient+="<tr>"
    tablaClient+="<th>"+"Código"+"</th>";
    tablaClient+="<th>"+"Nombre"+"</th>";
    tablaClient+="<th>"+"</th>";
    tablaClient+="</tr>";
    clientes.forEach(clientes => {

                tablaClient+="<tr>";
                tablaClient+="<td>"+clientes.id+"</td>";
                tablaClient+="<td>"+clientes.name+"</td>";
                tablaClient+="<td>"+"<details id='mainDetails'><summary>Detalles</summary>";
                tablaClient+="<p><label id='nomLabelCli"+clientes.id+"'>"+"<b>Nombre: </b>"+clientes.name+"<br></label>";
                tablaClient+="<label id='emLabel"+clientes.id+"'>"+"<b>Email: </b>"+clientes.email+"<br></label>";
                tablaClient+="<label id='AgeLabel"+clientes.id+"'><b>Edad: </b>"+clientes.age+"</p></label>";
                tablaClient+="<p><button type='button' onclick='editarCliente("+JSON.stringify(clientes)+")' id='botEditarClien"+clientes.id;
                tablaClient+= "'>"+"Editar</button>&nbsp&nbsp";
                tablaClient+="<button onclick='confCli("+clientes.id+")'  id='botBorrarCli";
                tablaClient+= clientes.id+"'>"+"Borrar</button>&nbsp&nbsp</p>";          
                tablaClient+="</details></td>";                              
                tablaClient+="</tr>";
    }
    );
    tablaClient+="</table>";


    etpClient.innerHTML = tablaClient;
}

/** PETICION POST */

function postClient(){
    const data ={
        id:$("#idCli").val(), //PONER LOS NOMBRES EN LA TABLA EN EL HTML
        name:$("#nameCli").val(),
        email:$("#emCli").val(),
        age:$("#ageCli").val()
    }
    let datasend=JSON.stringify(data)
    $.ajax({
        method: "POST",
        url: endpointClient,
        data:datasend,
        dataType:"json",
        contentType:"application/json",
        complete:function(response){
            $("#idCli").val(""),
            $("#nameCli").val(""),
            $("#emCli").val(""),
            $("#ageCli").val(""),
            alert("Registro creado!!!")
            getClient()

        },
        error:function(error){

        }
    })
}

/** PETICION PUT */

function putClient(id){
    const data ={
        id: id,
        name: document.getElementById("editNamcl"+id).value,
        email: document.getElementById("editEmcl"+id).value,
        age: document.getElementById("editAgecl"+id).value,
    }
    let datasend=JSON.stringify(data)
    $.ajax({
        method: "PUT",
        url: endpointClient,
        data:datasend,
        dataType:"json",
        contentType:"application/json",
        complete:function(response){
            console.log("Se Actualizo el Cliente")
            alert("Registro Actualizado!!!")
            getClient()

        },
        error:function(error){

        }
    });
}

/** PETICION DELETE */

function deleteClient(id){

    const data ={
        id: id
    }

    let datasend=JSON.stringify(data)

    $.ajax({
        method: "DELETE",
        url: endpointClient,
        data:datasend,
        dataType:"json",
        contentType:"application/json",
        complete:function(response){
            alert("Registro Eliminado!!!")
            getClient()
        },
        error:function(error){

        }
    });
}

//Funcion para modificar items

function editarCliente(clientes){
    
    document.getElementById("nomLabelCli"+clientes.id).innerHTML = "<p><b>Nombre: </b><input type='text' id='editNamcl"+clientes.id+"'></input></p><br>";
    document.getElementById("editNamcl"+clientes.id).value = clientes.name;

    document.getElementById("emLabel"+clientes.id).innerHTML = "<p><b>Correo: </b><input type='text' id='editEmcl"+clientes.id+"'></input></p><br>";
    document.getElementById("editEmcl"+clientes.id).value = clientes.email;

    document.getElementById("AgeLabel"+clientes.id).innerHTML = "<p><b>Edad: </b><input  type='number' id='editAgecl"+clientes.id+"'></input></p><br>";
    document.getElementById("editAgecl"+clientes.id).value= clientes.age;

    x = document.createElement("button")
    y = document.getElementById("botEditarClien" + clientes.id)
    y.replaceWith(x);
    x.innerHTML = "Cambiar"
    x.setAttribute("id", "botCambiarClient" + clientes.id);
    x.addEventListener("click", (e) => {
        e.preventDefault()
        putClient(clientes.id)
    
    })
}
//Funcion muestra mensaje de confirmacion para borrar
function confCli(id){
    
    var con =confirm("Seguro que quieres borrar el registro?")
    if (con == true) {
        deleteClient(id)
    }
}


btnNuevoClient.addEventListener("click", (e) => {
    postClient()
})

btnVerClient.addEventListener("click", (e) => {
    e.preventDefault()
    getClient()
})