import { clientServices } from "../service/client-service.js";

const formulario = document.querySelector("[data-form]");


//Esta función es para obtener la información del registro por medio del id
//AL FINAL SE MODIFICO PARA OCUPAR EL ASYNC AWAIT
const obtenerInformacion = async () => {
    const url = new URL(window.location);
    const id = url.searchParams.get("id"); //Con get obtenemos los datos

    if(id == null){
        window.location.href = "/screens/error.html"
    }

    //Aquí estamos ocupando el dom y traemos los inputs del formario por medio de su
    //Data atribute (data-nombre y data-email)
    //Los cuales se encuentran en editar_cliente.html
    const nombre = document.querySelector("[data-nombre]");
    const email = document.querySelector("[data-email]");

    try{

     //AQUI ESTÁ EL AWAIT DEL ASYNC QUE SE ACABA DE AGREGAR
    //SE ELIMINA EL THEN QUE ESTABA ABAJO POR QUE EL AWAIT YA LO INCLUYE
    const perfil = await clientServices.detalleCliente(id);
    if(perfil.nombre && perfil.email){
    nombre.value = perfil.nombre;
    email.value = perfil.email;
    }else {
        throw new Error();
    }
    //La función detalleCliente se creo en el archivo client-service
    //Aquí traemos la información de email y nombre para rellenar el formulario
    
    }catch(error){
        window.location.href = "/screens/error.html";
    }
};

obtenerInformacion();


/*
AQUI ESTA LA FUNCION OBTENER INFORMACION DE FORMA SENCILLA SOLO CON PROMESAS

//Esta función es para obtener la información del registro por medio del id
const obtenerInformacion = () => {
    const url = new URL(window.location);
    const id = url.searchParams.get("id"); //Con get obtenemos los datos

    if(id == null){
        window.location.href = "/screens/error.html"
    }

    //Aquí estamos ocupando el dom y traemos los inputs del formario por medio de su
    //Data atribute (data-nombre y data-email)
    //Los cuales se encuentran en editar_cliente.html
    const nombre = document.querySelector("[data-nombre]");
    const email = document.querySelector("[data-email]");

    //La función detalleCliente se creo en el archivo client-service
    clientServices.detalleCliente(id).then(perfil => {
        //Aquí traemos la información de email y nombre para rellenar el formulario
        nombre.value = perfil.nombre;
        email.value = perfil.email;
    });
};

obtenerInformacion();


*/

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();//Aquí quitamos el funcionamiento normal de un formulario es decir que haga la petición

    const url = new URL(window.location);
    const id = url.searchParams.get("id"); //Con get obtenemos los datos

    const nombre = document.querySelector("[data-nombre]").value;
    const email = document.querySelector("[data-email]").value;
    clientServices.actualizarCliente(nombre,email,id).then(() => {
        window.location.href = "/screens/edicion_concluida.html";
    })
})