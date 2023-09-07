
const databaseName = 'miBaseDeDatos';
const databaseVersion = 1;

function openDatabase() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(databaseName, databaseVersion);

        request.onupgradeneeded = function (event) {
            const db = event.target.result;

            if (!db.objectStoreNames.contains('clientes')) {
                const objectStoreClientes = db.createObjectStore('clientes', { keyPath: 'id', autoIncrement: true });
                objectStoreClientes.createIndex('nombre', 'nombre', { unique: false });
                objectStoreClientes.createIndex('telefono', 'telefono', { unique: false });
                objectStoreClientes.createIndex('direccion', 'direccion', { unique: false });
                objectStoreClientes.createIndex('correo', 'correo', { unique: true });
            }

            if (!db.objectStoreNames.contains('productos')) {
                const objectStoreProductos = db.createObjectStore('productos', { keyPath: 'id', autoIncrement: true });
                objectStoreProductos.createIndex('nombre', 'nombre', { unique: false });
                objectStoreProductos.createIndex('descripcion', 'descripcion', { unique: false });
                objectStoreProductos.createIndex('cantidad', 'cantidad', { unique: false });
                objectStoreProductos.createIndex('valor', 'valor', { unique: false });
            }

            if (!db.objectStoreNames.contains('proveedores')) {
                const objectStoreProveedores = db.createObjectStore('proveedores', { keyPath: 'id', autoIncrement: true });
                objectStoreProveedores.createIndex('nombre', 'nombre', { unique: false });
                objectStoreProveedores.createIndex('telefono', 'telefono', { unique: false });
                objectStoreProveedores.createIndex('direccion', 'direccion', { unique: false });
                objectStoreProveedores.createIndex('nit', 'nit', { unique: true });
            }
        };

        request.onsuccess = function (event) {
            const db = event.target.result;
            resolve(db);
        };

        request.onerror = function (event) {
            reject(event.target.error);
        };
    });
}

function addCliente(cliente) {
    return openDatabase().then(db => {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(['clientes'], 'readwrite');
            const objectStore = transaction.objectStore('clientes');

            const request = objectStore.add(cliente);

            request.onsuccess = function () {
                resolve();
            };

            request.onerror = function () {
                reject(request.error);
            };
        });
    });
}

function addProducto(producto) {
    return openDatabase().then(db => {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(['productos'], 'readwrite');
            const objectStore = transaction.objectStore('productos');

            const request = objectStore.add(producto);

            request.onsuccess = function () {
                resolve();
            };

            request.onerror = function () {
                reject(request.error);
            };
        });
    });
}

function addProveedor(proveedor) {
    return openDatabase().then(db => {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(['proveedores'], 'readwrite');
            const objectStore = transaction.objectStore('proveedores');

            const request = objectStore.add(proveedor);

            request.onsuccess = function () {
                resolve();
            };

            request.onerror = function () {
                reject(request.error);
            };
        });
    });
    
}

function getAllClientes() {
    return openDatabase().then(db => {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(['clientes'], 'readonly');
            const objectStore = transaction.objectStore('clientes');
            const request = objectStore.getAll();

            request.onsuccess = function () {
                resolve(request.result);
            };

            request.onerror = function () {
                reject(request.error);
            };
        });
    });
}

function getAllProductos() {
    return openDatabase().then(db => {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(['productos'], 'readonly');
            const objectStore = transaction.objectStore('productos');
            const request = objectStore.getAll();

            request.onsuccess = function () {
                resolve(request.result);
            };

            request.onerror = function () {
                reject(request.error);
            };
        });
    });
}

function getAllProveedores() {
    return openDatabase().then(db => {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(['proveedores'], 'readonly');
            const objectStore = transaction.objectStore('proveedores');
            const request = objectStore.getAll();

            request.onsuccess = function () {
                resolve(request.result);
            };

            request.onerror = function () {
                reject(request.error);
            };
        });
    });
}

export { addCliente, addProducto, addProveedor,getAllClientes,getAllProductos,getAllProveedores};
