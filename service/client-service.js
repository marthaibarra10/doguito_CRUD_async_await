//CRUD                      - METODOS HTTP
//Create    - Crear         - POST
//Read      - Leer          - GET
//Update    - Actualizar    - PUT/PATCH
//Delete    - Eliminar      - DELETE

//Fetch API
const listaClientes = () => fetch("http://localhost:3000/perfil").then((respuesta) => respuesta.json());

const crearCliente = (nombre, email) => {
    return fetch("http://localhost:3000/perfil", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({nombre,email, id: uuid.v4()})
    })
}

//ELIMINAR
const eliminarCliente = (id) => {
    return fetch(`http://localhost:3000/perfil/${id}`, {
        method: "DELETE",
    });
};

//Obtener el registro para actualizarlo el fetch tiene por defecto el método GET
const detalleCliente = (id) => {
    return fetch(`http://localhost:3000/perfil/${id}`).then((respuesta) => respuesta.json()
    );
};


//ACTUALIZAR EL REGISTRO
const actualizarCliente = (nombre, email, id) => {
    return fetch(`http://localhost:3000/perfil/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ nombre, email }),
    })
    .then((respuesta) => respuesta) //Aqui regresa la respuesta del formulario
    .catch((err) => console.log(err));
};


//1.- Exportamos dentro del objeto clientService
export const clientServices = {
    listaClientes,
    crearCliente, 
    eliminarCliente,
    detalleCliente,
    actualizarCliente,
}



