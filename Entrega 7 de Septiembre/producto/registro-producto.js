import { addProducto, getAllProductos } from '../db/db.js';

document.addEventListener('DOMContentLoaded', function () {
    const productoForm = document.getElementById('producto-form');

    productoForm.addEventListener('submit', function (e) { 
        e.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const descripcion = document.getElementById('descripcion').value;
        const cantidad = document.getElementById('cantidad').value;
        const valor = document.getElementById('valor').value;

        const nuevoProducto = {
            nombre: nombre,
            descripcion: descripcion,
            cantidad: cantidad,
            valor: valor,
        };

        addProducto(nuevoProducto)
            .then(() => {
                console.log('Producto registrado exitosamente en IndexedDB');
            })
            .catch(error => {
                console.error('Error al registrar el producto en IndexedDB', error);
            });
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const productosLista = document.querySelector('.productos-lista');

    function mostrarProductos() {
        getAllProductos()
            .then(productos => {
                productosLista.innerHTML = ''; 
                if (productos.length === 0) {
                    productosLista.innerHTML = '<p>No hay productos registrados.</p>';
                } else {
                    productos.forEach(producto => {
                        const productoItem = document.createElement('div');
                        productoItem.classList.add('productos-item');
                        productoItem.innerHTML = `
                            <h3>${producto.nombre}</h3>
                            <p><strong>Teléfono:</strong> ${producto.descripcion}</p>
                            <p><strong>Dirección:</strong> ${producto.cantidad}</p>
                            <p><strong>NIT:</strong> ${producto.valor}</p>
                        `;
                        productosLista.appendChild(productoItem);
                    });
                }
            })
            .catch(error => {
                console.error('Error al obtener proveedores', error);
            });
    }

    mostrarProductos();
});

