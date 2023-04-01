import { clientServices } from "../service/client-service.js";

const formulario = document.querySelector("[data-form]");

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault(); //Con este método hacemos que el formulario NO funcione como siempre lo hace
    const nombre = document.querySelector("[data-nombre]").value; //Aquí cachamos el valor que llega al input data-nombre
    const email = document.querySelector("[data-email]").value;
    console.log(nombre, " _ ", email);
    clientServices
        .crearCliente(nombre,email)
        .then((respuesta) => {
            window.location.href = "/screens/registro_completado.html" //Window es un metodo que nos ayuda a llamar otra pagina cuando se realiza una acción
        })
        .catch((err) => console.log(err));

});