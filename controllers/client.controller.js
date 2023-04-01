import { clientServices } from "../service/client-service.js";

console.log(clientServices);

//AQUÍ ESTAMOS OCUPANDO CALLBACK
//Se está creando un callback hell 
//Es una forma de comunicarnos con el backend
//En esta sección se está creando la tabla dinámica con variables
const crearNuevaLinea = (nombre, email, id) => {
    const linea = document.createElement('tr')
    const contenido = 
`<td class="td" data-td>${nombre}</td>
    <td>${email}</td>
    <td>
        <ul class="table__button-control">
            <li>
                <a href="../screens/editar_cliente.html?id=${id}" class="simple-button simple-button--edit">Editar</a>
            </li>
            <li>
                <button class="simple-button simple-button--delete" type="button" id="${id}">Eliminar</button>
            </li>
        </ul>
    </td>`;
    //Se inserta el js al HTML
    linea.innerHTML = contenido;
    const btn = linea.querySelector("button");
    btn.addEventListener("click", ()=> {
        const id = btn.id;
//Esta función es para eliminar registros!!!!!!!!!!!!!!!!!!!!!
         clientServices.eliminarCliente(id).then(respuesta => {
            console.log(respuesta);
        }).catch( err => alert ("Ocurrio un error"));
    });
    return linea;
};

//Ocupamos DOM, 
const table = document.querySelector("[data-table]");

//Esta funcion es para nuevos registros!!!!!!!!!!!!!!!!
//Aquí importamos la clase client-service.js (arriba)
//Y además debemos concatenar la clase.listaClientes, recordemos que listaClientes lo que hace es agregar
//Una nueva linea de forma dinámica
clientServices.listaClientes().then((data) => {
    data.forEach(({nombre, email, id}) => {
        const nuevaLinea = crearNuevaLinea(nombre, email, id);
        table.appendChild(nuevaLinea);        
        });
})
.catch((error) => alert("Ocurrió un error"));


