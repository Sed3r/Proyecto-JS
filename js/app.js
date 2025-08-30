import { saveInventario, loadInventario } from "./storage.js";
import { generarId } from "./utils.js";

let inventario = loadInventario() || [];

// DOM Elements
const form = document.getElementById("form-producto");
const inventarioDiv = document.getElementById("inventario");
const buscador = document.getElementById("buscador");
const orden = document.getElementById("orden");

// Render inventario (recibe lista opcional)
const renderInventario = (lista = inventario) => {
    inventarioDiv.innerHTML = "";

    if (lista.length === 0) {
    inventarioDiv.innerHTML = "<p>No hay productos en el inventario.</p>";
    return;
    }

    lista.forEach(prod => {
    const li = document.createElement("li");
    li.classList.add("producto");
    li.innerHTML = `
        <h3>${prod.nombre}</h3>
        <p>Precio: $${prod.precio}</p>
        <p>Stock: ${prod.stock}</p>
        <button data-id="${prod.id}" class="btn-eliminar">Eliminar</button>
        <button data-id="${prod.id}" class="btn-modificar">Modificar stock</button>
    `;
    inventarioDiv.appendChild(li);
    });

  // Botones dinámicos
    document.querySelectorAll(".btn-eliminar").forEach(btn =>
    btn.addEventListener("click", e => {
        eliminarProducto(e.target.dataset.id);
        actualizarRender();
    })
    );

    document.querySelectorAll(".btn-modificar").forEach(btn =>
    btn.addEventListener("click", e => {
        modificarStock(e.target.dataset.id);
        actualizarRender();
    })
    );
};

// Agregar producto
form.addEventListener("submit", e => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const precio = parseFloat(document.getElementById("precio").value);
    const stock = parseInt(document.getElementById("stock").value);

    if (!nombre || isNaN(precio) || isNaN(stock)) {
    alert("Completa todos los campos con valores válidos");
    return;
    }

    inventario.push({
    id: generarId(),
    nombre,
    precio,
    stock
    });

    saveInventario(inventario);
    form.reset();
    actualizarRender();
});

// Eliminar producto
const eliminarProducto = id => {
    inventario = inventario.filter(prod => prod.id !== id);
    saveInventario(inventario);
};

// Modificar stock
const modificarStock = id => {
    const nuevoStock = prompt("Ingrese el nuevo stock:");
    if (nuevoStock === null || isNaN(parseInt(nuevoStock))) {
    alert("Stock inválido");
    return;
    }

    const producto = inventario.find(prod => prod.id === id);
    if (producto) {
    producto.stock = parseInt(nuevoStock);
    saveInventario(inventario);
    }
};

// Filtrar y ordenar
const actualizarRender = () => {
    let lista = [...inventario];

  // Filtrar
    const filtro = buscador.value.toLowerCase();
    lista = lista.filter(p => p.nombre.toLowerCase().includes(filtro));

  // Ordenar
    switch (orden.value) {
    case "nombre-asc":
        lista.sort((a,b) => a.nombre.localeCompare(b.nombre));
        break;
    case "nombre-desc":
        lista.sort((a,b) => b.nombre.localeCompare(a.nombre));
        break;
    case "precio-asc":
        lista.sort((a,b) => a.precio - b.precio);
        break;
    case "precio-desc":
        lista.sort((a,b) => b.precio - a.precio);
        break;
    }

    renderInventario(lista);
};

buscador.addEventListener("input", actualizarRender);
orden.addEventListener("change", actualizarRender);

// Inicializar
renderInventario(inventario);
