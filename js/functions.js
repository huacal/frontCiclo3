/*Categoria*/
function getCategorias() {
    $.ajax({
        url: "http://129.151.119.43:8080/api/Category/all",
        type: "GET",
        datatype: "JSON",
        success: function(respuesta) {
            console.log(respuesta);
            responseCategoria(respuesta);

            let $select = $("#selectCategory");

            $.each(respuesta, function(id, name){
                $select.append('<option value=' + name.id + '>' + name.name + '</option>');
                console.log("select " + name.id);
            })
        }
    });

}



function responseCategoria(respuesta) {
    let tableCategory = $("#ConsultaCategoria");
    let tableHead = $("#tableHead");
    tableHead += "<td>Categoria</td>";
    tableHead += "<td>Descripción</td>";
    for (i = 0; i < respuesta.length; i++) {
        tableCategory += "<tr>";
        tableCategory += "<td>" + respuesta[i].name + "</td>";
        tableCategory += "<td>" + respuesta[i].description + "</td>";
        tableCategory += "<td> <button onclick='itemEspecificoCategory(" + respuesta[i].id + ")'  class='green' > Editar </button>";
        tableCategory += "<td> <button onclick='borrarCategoria(" + respuesta[i].id + ")' class='red'> Borrar </button>";
        tableCategory += "</tr>";
    }
    $("#ConsultaCategoria").html(tableCategory);
    $("#tableHead").html(tableHead);
}



function guardarCategorias(){
    if($("#nameCategory").val().length == 0 || $("#categoryDescription").val().length == 0){
        alert("Todos los compos son Obligatorios.")
    }else{
        let itemsCategory = {
            name : $("#nameCategory").val(),
            description : $("#categoryDescription").val()
        };
        $.ajax({
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: JSON.stringify(itemsCategory),

            url: "http://129.151.119.43:8080/api/Category/save",

            success: function(response) {
                console.log(response);
                console.log("Se guardo correctamente");
                alert("Se guardo correctamente");
                window.location.reload()
            },
            error: function(jqXHR, textStatus, errorThrown) {
                window.location.reload()
                alert("No se guardo correctamente");
            }
        });
    }
}

function itemEspecificoCategory(idItem){
    $.ajax({
        dateType: 'json',
        url: 'http://129.151.119.43:8080/api/Category/' + idItem,
        type: 'GET',
        contentType: "application/JSON",
        success: function(idItem) {
            $("#idCategory").val(idItem.id);
            $("#nameCategory").val(idItem.name);
            $("#categoryDescription").val(idItem.description);
            console.log(idItem);
        },
        error: function(xhr, status) {
            console.log(xhr);

        }
    });
}

function actualizarCategorias(idItem){
    itemEspecificoCategory()
    if($("#nameCategory").val().length == 0 || $("#categoryDescription").val().length == 0){
        alert("Todos los campos son obligatorios")
    }else{
        let myData = {
            id: $("#idCategory").val(),
            name: $("#nameCategory").val(),
            description: $("#categoryDescription").val(),

        };
        console.log(myData);
        let dataToSend = JSON.stringify(myData);
        $.ajax({
            url: "http://129.151.119.43:8080/api/Category/update",
            type: "PUT",
            data: dataToSend,
            contentType: "application/JSON",
            datatype: "JSON",
            success:  function(respuesta) {
                $("#resultado").empty();
                $("#idCategory").val();
                $("#nameCategory").val("");
                $("#categoryDescription").val("");
                getCategorias();
                alert("se ha Actualizado correctamente la categoria")
            }  

        });
    }
}



function borrarCategoria(idItem){
    let myData = {
        id: idItem
    }

    let dataToSend = JSON.stringify(myData);
    console.log(dataToSend)
    $.ajax({
        url: "http://129.151.119.43:8080/api/Category/" + idItem,
        type: "DELETE",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function(respuesta) {
            $("#resultado").empty();
            getCategorias();
            alert("Se ha Eliminado la categoria")
        }
    }); 
}

/*Bicicletas*/
function getBikes() {
    $.ajax({
        url: "http://129.151.119.43:8080/api/Bike/all",
        type: "GET",
        datatype: "JSON",
        success: function(respuesta) {
            console.log(respuesta);
            responseBikes(respuesta);
            let $select = $("#selectBike");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
         
            });
            
        }

    });

}

function responseBikes(respuesta) {
    let tableBike = $("#consultasBike");
    let tableHead1 = $("#tbike");
        tableHead1 += "<td>Nombre</td>";
        tableHead1 += "<td>Marca</td>";
        tableHead1 += "<td>Año</td>";
        tableHead1 += "<td>Descripción</td>";
        tableHead1 += "<td>Categoria</td>";
    for (i = 0; i < respuesta.length; i++) {
        tableBike += "<tr>";
        tableBike += "<td>" + respuesta[i].name + "</td>";
        tableBike += "<td>" + respuesta[i].brand + "</td>";
        tableBike += "<td>" + respuesta[i].year + "</td>";
        tableBike += "<td>" + respuesta[i].description + "</td>";
        tableBike += "<td>" + respuesta[i].category.name + "</td>";
        tableBike += "<td> <button onclick='itemEspecificoBike(" + respuesta[i].id + ")'  class='green' > Editar </button>";
        tableBike += "<td> <button onclick='borrarBike(" + respuesta[i].id + ")' class='red'> Borrar </button>";
        tableBike += "</tr>";
    }
    $("#consultasBike").html(tableBike);
    $("#tbike").html(tableHead1);

}

function guardarBikes(){
    if($("#nameBike").val().length == 0 || $("#marcaBike").val().length == 0 || $("#anoBike").val().length == 0 || $("#descriptionBike").val().length == 0){
        alert("Todos los compos son Obligatorios.")
    }else{
        let itemsBikes = {
            name : $("#nameBike").val(),
            brand: $("#marcaBike").val(),
            year: $("#anoBike").val(),
            description : $("#descriptionBike").val(),
            category:{id: + $("#selectCategory").val()}
        };
        $.ajax({
            type: 'POST',
            contentType: "application/json",
            dataType: 'JSON',
            data: JSON.stringify(itemsBikes),

            url: "http://129.151.119.43:8080/api/Bike/save",

            success: function(response) {
                $("#nameBike").val("");
                $("#marcaBike").val("");
                $("#anoBike").val("");
                $("#descriptionBike").val("");
                
                console.log("Se guardo correctamente");
                alert("Se guardo correctamente");
                
            },
            error: function(jqXHR, textStatus, errorThrown) {
                window.location.reload()
                alert("No se guardo correctamente");
            }
        });
    }
}

function itemEspecificoBike(idItem){
    console.log(idItem)
    $.ajax({
        dateType: 'json',
        url: 'http://129.151.119.43:8080/api/Bike/'+idItem,
        type: 'GET',
        success: function(idItem) {
            $("#idBike").val(idItem.id);
            $("#nameBike").val(idItem.name);
            $("#marcaBike").val(idItem.brand);
            $("#anoBike").val(idItem.year);
            $("#descriptionBike").val(idItem.description);
            
        },
        error: function(xhr, status) {
            /*console.log(xhr);*/

        }
    });
}

function borrarBike(idItem){
    let myData = {
        id: idItem
    }

    let dataToSend = JSON.stringify(myData);
    console.log(dataToSend)
    $.ajax({
        url: "http://129.151.119.43:8080/api/Bike/" + idItem,
        type: "DELETE",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function(respuesta) {
            getCategorias();
            alert("Se ha eliminado correctamente")
        }
    }); 
}    

function actualizarBikes(idItem){
    itemEspecificoBike()
    if($("#nameBike").val().length == 0 || $("#marcaBike").val().length == 0 || $("#anoBike").val().length == 0 || $("#descriptionBike").val().length == 0){
        alert("Todos los campos son obligatorios")
    }else{
        let myData = {
            id : $("#idBike").val(),
            name : $("#nameBike").val(),
            brand: $("#marcaBike").val(),
            year: $("#anoBike").val(),
            description : $("#descriptionBike").val(),
            category:{id: +$("#selectCategory").val()},
        };
        console.log(myData);
        let dataToSend = JSON.stringify(myData);
        $.ajax({
            data: dataToSend,
            contentType: "application/JSON",
            datatype: "JSON",
            url: "http://129.151.119.43:8080/api/Bike/update",
            type: "PUT",
            success:  function(respuesta) {
                
                alert("se ha Actualizado correctamente la bicicleta")
                getBikes()
                $("#id").val("");
                $("#nameBike").val("");
                $("#marcaBike").val("");
                $("#anoBike").val("");
                $("#descriptionBike").val("");
                
            },
            error:function(jqXHR, textStatus, errorThrown){
                alert("No se actualizo correctamente.")
            }  

        });
    }
}

/*Cliente*/
function getClients() {
    $.ajax({
        url: "http://129.151.119.43:8080/api/Client/all",
        type: "GET",
        datatype: "JSON",
        success: function(respuesta) {
            console.log(respuesta);
            responseClients(respuesta);
            let $select = $("#selectClient");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.idClient+'>'+name.name+'</option>');
            
            }); 
            
        }

    });

}

function responseClients(respuesta) {
    let tableClient = $("#consultasClient");
    let tableHead2 = $("#tclient");
        tableHead2 += "<td>Email</td>";
        tableHead2 += "<td>Contraseña</td>";
        tableHead2 += "<td>Nombre</td>";
        tableHead2 += "<td>Edad</td>";
    for (i = 0; i < respuesta.length; i++) {
        tableClient += "<tr>";
        tableClient += "<td>" + respuesta[i].email + "</td>";
        tableClient += "<td>" + respuesta[i].password + "</td>";
        tableClient += "<td>" + respuesta[i].name + "</td>";
        tableClient += "<td>" + respuesta[i].age + "</td>";
        tableClient += "<td> <button onclick='itemEspecificoClient(" + respuesta[i].id + ")'  class='green' > Editar </button>";
        tableClient += "<td> <button onclick='borrarClient(" + respuesta[i].id + ")' class='red'> Borrar </button>";
        tableClient += "</tr>";
    }
    $("#consultasClient").html(tableClient);
    $("#tclient").html(tableHead2);
}

function guardarClients(){
    if($("#emailClient").val().length == 0 || $("#passClient").val().length == 0 || $("#nameClient").val().length == 0 || $("#ageClient").val().length == 0){
        alert("Todos los compos son Obligatorios.")
    }else{
        let itemsClients = {
            email : $("#emailClient").val(),
            password: $("#passClient").val(),
            name: $("#nameClient").val(),
            age: $("#ageClient").val(),
        };
        $.ajax({
            type: 'POST',
            contentType: "application/json",
            dataType: 'JSON',
            data: JSON.stringify(itemsClients),

            url: "http://129.151.119.43:8080/api/Client/save",

            success: function(response) {
                $("#emailClient").val("");
                $("#passClient").val("");
                $("#nameClient").val("");
                $("#ageClient").val("");
                
                console.log("Se guardo correctamente");
                alert("Se guardo correctamente");
                
            },
            error: function(jqXHR, textStatus, errorThrown) {
                window.location.reload()
                alert("No se guardo correctamente");
            }
        });
    }
}

function itemEspecificoClient(idItem){
    getClients()
    alert(idItem)
    $.ajax({
        dateType: 'json',
        url: 'http://129.151.119.43:8080/api/Client/'+idItem,
        type: 'GET',
        success: function(idItem) {
            console.log(idItem)
            
        },
        error: function(xhr, status) {
            console.log("error")

        }
    });
}


/*Mensajes*/

function getMessage(){
    console.log("se esta ejecutando")
    $.ajax({
        url:"http://129.151.119.43:8080/api/Message/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            responseMessage(respuesta);
        }
    
    })

}


function responseMessage(respuesta){
    let tableMessage = $("#consultasMessage");
    let tableHead3 = $("#tmessage");
        tableHead3 += "<td>Mensajes Guardados</td>";
        tableHead3 += "<td>Bicicleta</td>";
        tableHead3 += "<td>Cliente</td>";

    for(i=0;i<respuesta.length;i++){
        tableMessage+="<tr>"; 
        tableMessage+="<td>"+respuesta[i].messageText+"</td>";
        tableMessage+="<td>"+respuesta[i].bike.name+"</td>";
        tableMessage+="<td>"+respuesta[i].client.name+"</td>";
        tableMessage+="<td> <button onclick='itemEspecificoMessage(" + respuesta[i].idMessage + ")'  class='green' > Editar </button>";
        tableMessage+="<td> <button onclick='borrarMensaje("+respuesta[i].idMessage+")'class='red'>Borrar</button>";
        tableMessage+="</tr>";
    }
    $("#consultasMessage").html(tableMessage);
    $("#tmessage").html(tableHead3);
}


function guardarMessage(){
    if ($("#mesageText").val().length==0 ){

        alert("Todos los campos son obligatorios");
    }else{
    
    
    let var2 = {
        idMessage:$("#idMesage").val(),
        messageText:$("#mesageText").val(),
        bike:{id: +$("#selectBike").val()},
        client:{idClient: +$("#selectClient").val()},

     
        };
       
        console.log(var2);
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        
        url:"http://129.151.119.43:8080/api/Message/save",
       
        
        success:function(response) {
                console.log(response);
            console.log("Se guardo correctamente");
            alert("Se guardo correctamente");
            window.location.reload()
    
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
             window.location.reload()
            alert("No se guardo correctamente");
    
    
        }
        });
    }
}



function itemEspecificoMessage(idItem){
    console.log(idItem);
    $.ajax({
        dateType: 'json',
        url: 'http://129.151.119.43:8080/api/Message/'+idItem,
        type: 'GET',
        success: function(idItem) {

            $("#mesageText").val(idItem.messageText);
            
        },
        error: function(xhr, status) {
            /*console.log(xhr);*/

        }
    });
}

function actualizarMessage(idItem){
    itemEspecificoMessage()
    if($("#mesageText").val().length == 0){
        alert("Todos los campos son obligatorios")
    }else{
        let myData = {
            idMessage:idItem,
            messageText:$("#mesageText").val(),
            bike:{id: +$("#selectBike").val()},
            client:{idClient: +$("#selectClient").val()},
            };
        console.log(myData);
        let dataToSend = JSON.stringify(myData);
        $.ajax({
            data: dataToSend,
            contentType: "application/JSON",
            datatype: "JSON",
            url: "http://129.151.119.43:8080/api/Message/update",
            type: "PUT",
            success:  function(respuesta) {
                alert("se ha Actualizado correctamente la bicicleta")
                getMessage()
                $("#idMesage").val("");
                $("#mesageText").val("");
                
            },
            error:function(jqXHR, textStatus, errorThrown){
                alert("No se actualizo correctamente.")
            }  

        });
    }
}


/*kingtown */



function traerReporteStatus(){
    console.log("test");
    $.ajax({
        url:"http://144.22.58.11:8080/api/Reservation/report-status",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta(respuesta);
        }
    });
}
function pintarRespuesta(respuesta){

    let myTable="<table>";
    myTable+="<tr>";
       myTable+="<th>completadas</th>";
        myTable+="<td>"+respuesta.completed+"</td>";
        myTable+="<th>canceladas</th>";
        myTable+="<td>"+respuesta.cancelled+"</td>";
        myTable+="</tr>";
    myTable+="</table>";
    $("#resultadoStatus").html(myTable);
}
function traerReporteDate(){

    var fechaInicio = document.getElementById("RstarDate").value;
    var fechaCierre = document.getElementById("RdevolutionDate").value;
    console.log(fechaInicio);
    console.log(fechaCierre);
    
        $.ajax({
            url:"http://144.22.58.11:8080/api/Reservation/report-dates/"+fechaInicio+"/"+fechaCierre,
            type:"GET",
            datatype:"JSON",
            success:function(respuesta){
                console.log(respuesta);
                pintarRespuestaDate(respuesta);
            }
        });
    }
    function pintarRespuestaDate(respuesta){

        let myTable="<table>";
        myTable+="<tr>";
          
        for(i=0;i<respuesta.length;i++){
        myTable+="<th>total</th>";
            myTable+="<td>"+respuesta[i].devolutionDate+"</td>";
            myTable+="<td>"+respuesta[i].startDate+"</td>";
            myTable+="<td>"+respuesta[i].status+"</td>";
          
          
            myTable+="</tr>";
        }
        myTable+="</table>";
        $("#resultadoDate").html(myTable);
    }

    function traerReporteClientes(){
        $.ajax({
            url:"http://144.22.58.11:8080/api/Reservation/report-clients",
            type:"GET",
            datatype:"JSON",
            success:function(respuesta){
                console.log(respuesta);
                pintarRespuestaClientes(respuesta);
            }
        });
    }
    function pintarRespuestaClientes(respuesta){

        let myTable="<table>";
        myTable+="<tr>";
          
        for(i=0;i<respuesta.length;i++){
        myTable+="<th>total</th>";
            myTable+="<td>"+respuesta[i].total+"</td>";
            myTable+="<td>"+respuesta[i].client.name+"</td>";
            myTable+="<td>"+respuesta[i].client.email+"</td>";
            myTable+="<td>"+respuesta[i].client.age+"</td>";
          
            myTable+="</tr>";
        }
        myTable+="</table>";
        $("#resultadoClientes").html(myTable);
    }