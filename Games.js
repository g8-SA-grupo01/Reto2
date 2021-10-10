/**
 * endpoint donde se va consumir la api rest
 */
const endpoint = "https://gb889a79b8713d4-db202109242140.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/games/games"
const etp = document.getElementById("Games")
const btnnuevo = document.getElementById("Crear")
const btnver = document.getElementById("ver")



/**
 * consumiento metodo get la Api de Cloud para visualizar en el cliente 
 */

function peticionGet() {

    $.ajax({

        method: "GET",
        url: endpoint,
        success: function (data) {
            mostrarJuegos(data.items)

        },
        error: function (error) {
            console.log("Error al Consumir Api Oracle Cloud ")
        }
    });

}
/**
 * grafica los items en una tabla para mostrarlos asl usuario
 */

function mostrarJuegos(Games) {

    
    let tabla = "<table >"
    tabla+="<tr>"
    tabla+="<th>"+"Codigo"+"</th>";
    tabla+="<th>"+"Nombre"+"</th>";
    tabla+="<th>"+"</th>";
    tabla+="</tr>";
    Games.forEach(game => {

                tabla+="<tr>";
                tabla+="<td>"+game.id+"</td>";
                tabla+="<td>"+game.name+"</td>";
                tabla+="<td>"+"<details id='mainDetails'><summary>Detalles</summary>";
                tabla+="<p><label id='nomLabel"+game.id+"'><b>Nombre: </b>"+game.name+"<br></label>";
                tabla+="<label id='devLabel"+game.id+"'><b>Developer: </b>"+game.developer+"<br></label>";
                tabla+="<label id='minLabel"+game.id+"'><b>Minage: </b>"+game.minage+"<br></label>";
                tabla+="<label id='catLabel"+game.id+"'><b>CategoryID: </b>"+game.category_id+"</p></label>";
                tabla+="<button type='button' onclick='editarJuego("+JSON.stringify(game)+")' id='botEditar"+game.id;
                tabla+= "'>"+"Editar</button>&nbsp &nbsp";
                tabla += "<button onclick='conf(" + game.id + ")' id='botBorrar";
                tabla += game.id + "'>" + "Borrar</button>&nbsp&nbsp";
                tabla += "</details></td>";
                tabla += "</tr>";
    }
    );
    tabla+="</table>";


    etp.innerHTML = tabla
}






/**funcion para peticion post */
function peticionPost() {

    let data={id:$("#idCG").val(),
        developer:$("#developerCG").val(),
        minage:$("#minageCG").val(),
        category_id:$("#category_idCG").val(),
        name:$("#nameCG").val(),
    };
    let datasend = JSON.stringify(data)

    $.ajax({

        method: "POST",
        url: endpoint,
        data: datasend,
        dataType: 'json',
        contentType: "application/json",
        complete: function (response) {
            $("#idCG").val(""),
                $("#developerCG").val(""),
                $("#minageCG").val(""),
                $("#category_idCG").val(""),
                $("#nameCG").val(""),
                alert("Registro Creado!!!")
            peticionGet()
        },
        error: function (error) {

        }
    });

}
/**peticion put */

function peticionPut(id) {

    const data = {
        id: id,
        developer: document.getElementById("editInDev"+id).value,
        minage: document.getElementById("editInMin"+id).value,
        category_id: document.getElementById("editInCat"+id).value,
        name: document.getElementById("editInNom"+id).value
    }

    let datasend = JSON.stringify(data)

    $.ajax({

        method: "PUT",
        url: endpoint,
        data: datasend,
        dataType: 'json',
        contentType: "application/json",
        complete: function (response) {
            alert("Registro actuzalizado!!")
            peticionGet()

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
        url: endpoint,
        data: datasend,
        dataType: 'json',
        contentType: "application/json",
        complete: function (response) {
            alert("Registro eliminado!!")
            peticionGet()
        },
        error: function (error) {

        }
    });
}
//Funcion para modificar items

function editarJuego(game){
    
    document.getElementById("nomLabel" + game.id).innerHTML = "<p><b>Nombre: </b><input type='text' id='editInNom" + game.id + "'></input></p><br>";
    document.getElementById("editInNom" + game.id).value = game.name;

    document.getElementById("devLabel" + game.id).innerHTML = "<p><b>Developer: </b><input  type='text' id='editInDev"  + game.id + "'></input></p><br>";
    document.getElementById("editInDev" + game.id).value = game.developer;

    document.getElementById("minLabel" + game.id).innerHTML = "<p><b>Minage: </b><input type='number' id='editInMin" + game.id + "'></input></p><br>";
    document.getElementById("editInMin" + game.id).value = game.minage;

    document.getElementById("catLabel" + game.id).innerHTML = "<p><b>CategoryID: </b><input type='number' id='editInCat" + game.id + "'></input></p><br>";
    document.getElementById("editInCat" + game.id).value = game.category_id;

            x = document.createElement("button")
            y = document.getElementById("botEditar" + game.id)
            y.replaceWith(x);
            x.innerHTML = "Cambiar"
            x.setAttribute("id", "botCambiar" + game.id);
            x.addEventListener("click", (e) => {
                e.preventDefault()
                peticionPut(game.id)
            
            })
        }

//Funcion muestra mensaje de confirmacion para borrar
        function conf(id){
    
            var con =confirm("Seguro que quieres borrar el registro?")
            if (con == true) {
                peticionDelete(id)
            }
    }

btnnuevo.addEventListener("click", (e) => {

    peticionPost()
})

btnver.addEventListener("click", (e) => {
    e.preventDefault()
    peticionGet()
})