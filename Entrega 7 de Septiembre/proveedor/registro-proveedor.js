import { addProveedor,getAllProveedores } from '../db/db.js';

document.addEventListener('DOMContentLoaded', function () {
    const proveedorDorm = document.getElementById('proveedor-form');

    proveedorDorm.addEventListener('submit', function (e) {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const telefono = document.getElementById('telefono').value;
        const direccion = document.getElementById('direccion').value;
        const nit = document.getElementById('nit').value;

        const nuevoProveedor = {
            nombre: nombre,
            telefono: telefono,
            direccion: direccion,
            nit: nit,
        };

        addProveedor(nuevoProveedor)
            .then(() => {
                console.log('Proveedor registrado exitosamente en IndexedDB');
            })
            .catch(error => {
                console.error('Error al registrar el Proveedor en IndexedDB', error);
            });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const proveedoresLista = document.querySelector('.proveedores-lista');

    function mostrarProveedores() {
        getAllProveedores()
            .then(proveedores => {
                proveedoresLista.innerHTML = ''; 
                if (proveedores.length === 0) {
                    proveedoresLista.innerHTML = '<p>No hay proveedores registrados.</p>';
                } else {
                    proveedores.forEach(proveedor => {
                        const proveedorItem = document.createElement('div');
                        proveedorItem.classList.add('proveedores-item');
                        proveedorItem.innerHTML = `
                            <h3>${proveedor.nombre}</h3>
                            <p><strong>Teléfono:</strong> ${proveedor.telefono}</p>
                            <p><strong>Dirección:</strong> ${proveedor.direccion}</p>
                            <p><strong>NIT:</strong> ${proveedor.nit}</p>
                        `;
                        proveedoresLista.appendChild(proveedorItem);
                    });
                }
            })
            .catch(error => {
                console.error('Error al obtener proveedores', error);
            });
    }

    mostrarProveedores();
});
