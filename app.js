const inventario = [];

const agregarProducto = (nombre, precio, stock) => {
    inventario.push({
        nombre: nombre,
        precio: precio,
        stock: stock,
    });
};

const mostrarListadoDeProductos = () => {
    let listado = 'Listado de productos:\n';
    for (let i = 0; i < inventario.length; i++) {
        listado += `
        - Nombre : ${inventario[i].nombre}
        - Precio: $${inventario[i].precio}
        - Stock: ${inventario[i].stock}
        `;
    }
    return console.log(listado);
}

const eliminarProducto = (nombre) => {
    for (let i = 0; i < inventario.length; i++) {
        if (inventario[i].nombre === nombre) {
            inventario.splice(i, 1);
            mostrarListadoDeProductos();
            return console.log(`Producto ${nombre} eliminado.`);
        }
    }
    console.log(`Producto ${nombre} no encontrado.`);
}

const modificarStock = (nombre, nuevoStock) => {
    for (let i = 0; i < inventario.length; i++) {
        if (inventario[i].nombre === nombre) {
            inventario[i].stock = nuevoStock;
            mostrarListadoDeProductos();
            return console.log(`Stock del producto ${nombre} modificado a ${nuevoStock}.`);
        }
    }
    console.log(`Producto ${nombre} no encontrado.`);
}


agregarProducto("Mouse", 50000, 10);
agregarProducto("Teclado", 100000, 20);
mostrarListadoDeProductos();

modificarStock("Teclado", 25);
mostrarListadoDeProductos();