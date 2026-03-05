// 1. Datos de los productos (Simulación)
const productos = [
    { id: 1, titulo: "One Piece Vol. 100", precio: 6500, descripcion:"Un chico de goma que navega por el mundo para buscar un tesoro que lleva 30 años perdido, mientras derroca dictaduras y recluta a gente más rara que él (incluyendo un reno y un esqueleto) para que lo ayuden a ser el Rey de los Piratas.", img: "https://images.cdn2.buscalibre.com/fit-in/360x360/74/6e/746ef577d082b96e830418dc6de775cd.jpg", stock: 10 },
    { id: 2, titulo: "Detective Conan", descripcion: "Es la historia de un niño que ha estado en el mismo curso escolar durante tres décadas, resolviendo miles de asesinatos mientras el mundo entero ignora que, estadísticamente, la ciudad de Tokio debería estar deshabitada debido a su presencia.", precio: 5000, img: "https://mokuton.com/covers//Detective%20Conan/001.jpg", stock: 5 },
    { id: 3, titulo: "Berserk Vol. 1", precio: 6000, descripcion : "Un simulador de trauma y sufrimiento infinito donde el protagonista sobrevive a base de puro rencor y una espada que parece una viga de construcción." , img: "http://mokuton.com/covers//Berserk/Berserk - 01.jpg", stock: 2 },
    { id: 3, titulo: "Dragon Ball vol. 2", precio: 6000, descripcion:"Un niño con cola que vive en el monte sale de su casa porque una adolescente lo convence de buscar unas bolas mágicas. El niño salvaje le pega a todo lo que se mueve, gana torneos de artes marciales y humilla a ejércitos enteros, todo mientras su maestro (un viejo verde en una tortuga) intenta conseguir revistas prohibidas." , img: "http://mokuton.com/covers//Dragonball/DB_02.jpg", stock: 3 }
];


// 2. Estado del Carrito 
let carrito = JSON.parse(localStorage.getItem('carrito_manga')) || [];

// 3. Selectores
const contenedor = document.getElementById('contenedor-productos');
const listaCarrito = document.getElementById('lista-carrito');
const totalCarrito = document.getElementById('total-carrito');
const contadorNav = document.getElementById('cart-count');

// 4. Funciones

// Pintar productos en el Home
function renderizarProductos() {
    contenedor.innerHTML = "";
    productos.forEach(p => {
        contenedor.innerHTML += `
            <article class="col">
                <div class="card h-100 shadow-sm">
                    <img src="${p.img}" class="card-img-top" alt="${p.titulo}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${p.titulo}</h5>
                        <p class="card-text text-muted small">${p.descripcion}</p>
                        <p class="fw-bold mt-auto fs-5">$${p.precio.toLocaleString('es-CL')}</p>
                        <button onclick="agregarAlCarro(${p.id})" class="btn btn-primary w-100">
                            Agregar al carro
                        </button>
                    </div>
                </div>
            </article>
        `;
    });
}

// Agregar al carrito
function agregarAlCarro(id) {
    const productoEncontrado = productos.find(p => p.id === id);
    carrito.push(productoEncontrado);
    actualizarTodo();
}

// Actualizar LocalStorage, Contador y Lista del Modal
function actualizarTodo() {
    // Guardar
    localStorage.setItem('carrito_manga', JSON.stringify(carrito));
    
    // Contador Navbar
    contadorNav.innerText = carrito.length;

    // Renderizar Lista en el Modal
    listaCarrito.innerHTML = "";
    let total = 0;

    carrito.forEach((item, index) => {
        total += item.precio;
        listaCarrito.innerHTML += `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                ${item.titulo}
                <span>$${item.precio.toLocaleString('es-CL')}</span>
            </li>
        `;
    });

    totalCarrito.innerText = `$${total.toLocaleString('es-CL')}`;
}

// 5. Inicializar
renderizarProductos();
actualizarTodo();