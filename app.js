const inventario = [];

function agregarProducto(nombre, precio, stock) {
    inventario.push({ nombre, precio, stock });
    console.log(`\n Producto agregado:\n- Nombre: ${nombre}\n- Precio: $${precio}\n- Stock: ${stock}`);
}


function mostrarListadoDeProductos() {
    console.log("\n Listado de productos:");

    if (inventario.length === 0) {
        console.log(" No hay productos en el inventario.");
        return;
    }

    for (let i = 0; i < inventario.length; i++) {
        const producto = inventario[i];
        console.log(`\nProducto ${i + 1}:`);
        console.log(`- Nombre : ${producto.nombre}`);
        console.log(`- Precio : $${producto.precio}`);
        console.log(`- Stock  : ${producto.stock}`);
    }
}


function eliminarProducto(nombre) {
    for (let i = 0; i < inventario.length; i++) {
        if (inventario[i].nombre === nombre) {
            inventario.splice(i, 1);
            console.log(`\n Producto "${nombre}" eliminado correctamente.`);
            return;
        }
    }
    console.log(`\n Producto "${nombre}" no encontrado.`);
}


function modificarStock(nombre, nuevoStock) {
    for (let i = 0; i < inventario.length; i++) {
        if (inventario[i].nombre === nombre) {
            inventario[i].stock = nuevoStock;
            console.log(`\n Stock del producto "${nombre}" actualizado a ${nuevoStock}.`);
            return;
        }
    }
    console.log(`\n Producto "${nombre}" no encontrado.`);
}


agregarProducto("Mouse", 50000, 10);
agregarProducto("Teclado", 100000, 20);
agregarProducto("Monitor", 300000, 5);

mostrarListadoDeProductos();

modificarStock("Teclado", 25);
eliminarProducto("Mouse");

mostrarListadoDeProductos();
