import { addCliente, getAllClientes } from '../db/db.js';

document.addEventListener('DOMContentLoaded', function () {
    const clienteForm = document.getElementById('cliente-form');

    clienteForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const telefono = document.getElementById('telefono').value;
        const direccion = document.getElementById('direccion').value;
        const correo = document.getElementById('correo').value;

        const nuevoCliente = {
            nombre: nombre,
            telefono: telefono,
            direccion: direccion,
            correo: correo,
        };

        addCliente(nuevoCliente)
            .then(() => {
                console.log('Cliente registrado exitosamente en IndexedDB');
            })
            .catch(error => {
                console.error('Error al registrar el cliente en IndexedDB', error);
            });
    });

    
});

document.addEventListener('DOMContentLoaded', function () {
    const clientesLista = document.querySelector('.clientes-lista');

    function mostrarClientes() {
        getAllClientes()
            .then(clientes => {
                clientesLista.innerHTML = ''; 
                if (clientes.length === 0) {
                    clientesLista.innerHTML = '<p>No hay clientes registrados.</p>';
                } else {
                    clientes.forEach(cliente => {
                        console.log(cliente.nombre);
                        console.log(cliente.telefono);
                        const clienteItem = document.createElement('div');
                        clienteItem.classList.add('clientes-item');
                        clienteItem.innerHTML = `
                            <h3>${cliente.nombre}</h3>
                            <p><strong>Teléfono:</strong> ${cliente.telefono}</p>
                            <p><strong>Dirección:</strong> ${cliente.direccion}</p>
                            <p><strong>Correo:</strong> ${cliente.correo}</p>
                        `;
                        clientesLista.appendChild(clienteItem);
                    });
                }
            })
            .catch(error => {
                console.error('Error al obtener clientes', error);
            });
    }

    mostrarClientes();
});
