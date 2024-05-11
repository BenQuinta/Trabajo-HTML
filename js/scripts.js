// Definir una lista para almacenar los productos en el carrito
let carrito = [];

// Función para agregar un producto al carrito con más detalles
function agregarAlCarritoConDetalles(producto) {
    carrito.push(producto);
    actualizarCarrito();
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

// Función para actualizar la visualización del carrito
function actualizarCarrito() {
    let total = 0;
    const carritoContainer = document.getElementById('carrito');
    carritoContainer.innerHTML = '';

    // Recorrer todos los productos en el carrito
    carrito.forEach((producto, index) => {
        // Crear un elemento de lista para cada producto
        const item = document.createElement('li');
        item.textContent = `${producto.nombre} - $${producto.precio}`;

        // Crear un botón de eliminar para cada producto
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.addEventListener('click', () => {
            eliminarDelCarrito(index);
        });

        // Agregar el botón de eliminar al elemento de lista
        item.appendChild(botonEliminar);

        // Agregar el elemento de lista al contenedor del carrito
        carritoContainer.appendChild(item);

        // Sumar el precio del producto al total
        total += producto.precio;
    });

    // Actualizar el total en la interfaz
    document.getElementById('total').textContent = `Total: $${total.toFixed(2)}`;
}

// Evento al cargar el documento
document.addEventListener('DOMContentLoaded', function() {
    // Obtener todos los botones "Añadir al Carrito"
    const addToCartButtons = document.querySelectorAll('.addToCartBtn');

    // Agregar un evento de clic a cada botón "Añadir al Carrito"
    addToCartButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            // Obtener los datos del producto del atributo de datos del botón
            const productName = button.getAttribute('data-product-name');
            const productPrice = parseFloat(button.getAttribute('data-product-price'));

            // Crear objeto de producto
            const product = {
                nombre: productName,
                precio: productPrice
            };

            // Agregar el producto al carrito
            agregarAlCarritoConDetalles(product);
        });
    });

    // Obtener el botón "Eliminar" del carrito
    const eliminarDelCarritoButtons = document.querySelectorAll('.eliminarDelCarritoBtn');

    // Agregar un evento de clic a cada botón "Eliminar" del carrito
    eliminarDelCarritoButtons.forEach(function(button, index) {
        button.addEventListener('click', function() {
            // Eliminar el producto del carrito en la misma posición que el botón
            eliminarDelCarrito(index);
        });
    });
});
