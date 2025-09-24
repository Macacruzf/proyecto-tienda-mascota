/* ---------------------------
   Funciones base de carrito
---------------------------- */
function getCarrito() {
  return JSON.parse(localStorage.getItem('carrito') || '[]');
}

function setCarrito(arr) {
  localStorage.setItem('carrito', JSON.stringify(arr));
}

function actualizarBadge() {
  const carrito = getCarrito();
  const n = carrito.reduce((acc, p) => acc + p.qty, 0); // suma total de unidades
  const el = document.getElementById('cart-count');
  if (el) el.textContent = n;
}

/* ---------------------------
   Añadir al carrito
---------------------------- */
function agregarCarrito(nombre, precio) {
  const c = getCarrito();
  const existente = c.find(p => p.nombre === nombre);

  if (existente) {
    existente.qty += 1;
  } else {
    c.push({ nombre, precio, qty: 1 });
  }

  setCarrito(c);
  actualizarBadge();
  alert(nombre + ' añadido al carrito ✅');
}

/* ---------------------------
   Renderizar carrito
---------------------------- */
function renderCarrito() {
  const cont = document.getElementById('carrito-list');
  if (!cont) return;

  const c = getCarrito();

  if (c.length === 0) {
    cont.innerHTML = '<p>Tu carrito está vacío.</p>'; // ✅ solo mensaje
    actualizarBadge();
    return;
  }

  let total = 0;
  let html = `
    <table class="tabla">
      <thead>
        <tr>
          <th>Producto</th>
          <th>Cantidad</th>
          <th>Precio</th>
          <th>Subtotal</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
  `;

  c.forEach((it, idx) => {
    const subtotal = it.precio * it.qty;
    total += subtotal;

    html += `
      <tr>
        <td>${it.nombre}</td>
        <td>${it.qty}</td>
        <td>$${it.precio}</td>
        <td>$${subtotal}</td>
        <td><button onclick="eliminarItem(${idx})">Eliminar</button></td>
      </tr>
    `;
  });

  html += `
      </tbody>
    </table>
    <h3>Total: $${total}</h3>
    <button onclick="vaciarCarrito()">Vaciar Carrito</button>
  `;

  cont.innerHTML = html;
  actualizarBadge();
}

/* ---------------------------
   Acciones del carrito
---------------------------- */
function eliminarItem(i) {
  const c = getCarrito();
  c.splice(i, 1);
  setCarrito(c);
  renderCarrito();
}

function vaciarCarrito() {
  setCarrito([]);
  renderCarrito();
}

/* ---------------------------
   Productos base (seed)
---------------------------- */
function getProductosSeed() {
  return [
    { id: 1, nombre: 'Collar de Perro', precio: 5980, imagen: 'img/collar.jpg', desc: 'Collar ajustable y resistente para perros.', minis: ['img/collar.jpg', 'img/collarb.jpg', 'img/collarc.jpg'] },
    { id: 2, nombre: 'Comida de Gato', precio: 7970, imagen: 'img/comidagato.jpg', desc: 'Alimento premium para gatos adultos.' },
    { id: 3, nombre: 'Juguete Mascota', precio: 9960, imagen: 'img/juguete.jpg', desc: 'Juguete divertido y duradero.' },
    { id: 4, nombre: 'Cama para Mascota', precio: 11950, imagen: 'img/cama.jpg', desc: 'Cama acolchada para descanso cómodo.' },
    { id: 5, nombre: 'Shampoo Mascota', precio: 13940, imagen: 'img/shampo.jpg', desc: 'Shampoo suave e hipoalergénico.' },
    { id: 6, nombre: 'Correa para Perro', precio: 15930, imagen: 'img/correa.jpg', desc: 'Correa extensible para paseos seguros.' },
    { id: 7, nombre: 'Plato Mascota', precio: 17920, imagen: 'img/plato.jpg', desc: 'Plato doble de acero inoxidable.' },
    { id: 8, nombre: 'Casita para Gato', precio: 19910, imagen: 'img/casagato.jpg', desc: 'Casita tipo iglú para gatos.' },
    { id: 9, nombre: 'Arnés para Perro', precio: 21900, imagen: 'img/arnes.jpg', desc: 'Arnés ergonómico antitirones.' }
  ];
}

function getProductoById(id) {
  return getProductosSeed().find(p => p.id === id) || getProductosSeed()[0];
}

/* ---------------------------
   Renderizar detalle
---------------------------- */
function renderDetalleProducto() {
  // ⚡ si no estamos en detalleProducto.html, salimos
  if (!document.getElementById("detalle-img")) return;

  const params = new URLSearchParams(location.search);
  const id = parseInt(params.get("id") || "1", 10);
  const p = getProductoById(id);

  // Llenar datos
  document.getElementById("detalle-img").src = p.imagen;
  document.getElementById("detalle-nombre").textContent = p.nombre;
  document.getElementById("detalle-precio").textContent = "$" + p.precio;
  document.getElementById("detalle-descripcion").textContent = p.desc;

  // Miniaturas
  const minis = document.getElementById("miniaturas");
  if (minis) {
    if (p.minis && p.minis.length > 1) {
      // ✅ Solo mostrar miniaturas si hay más de una imagen
      minis.innerHTML = p.minis.map(src => `<img src="${src}" alt="Vista">`).join("");
    } else {
      minis.innerHTML = ""; // ✅ No repetir la foto principal
    }
  }

  // Botón "añadir"
  const btnAdd = document.getElementById("btn-add");
  if (btnAdd) btnAdd.onclick = () => agregarCarrito(p.nombre, p.precio);

  // Relacionados
  const rel = document.getElementById("relacionados");
  if (rel) {
    const otros = getProductosSeed().filter(x => x.id !== id).slice(0, 3);
    rel.innerHTML = otros.map(x => `
      <article class="producto">
        <img src="${x.imagen}" alt="${x.nombre}">
        <h4>${x.nombre}</h4>
        <p class="price">$${x.precio}</p>
        <a href="detalleProducto.html?id=${x.id}" class="btn sm">Ver Detalle</a>
      </article>
    `).join("");
  }
}

/* ---------------------------
   Inicialización
---------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  actualizarBadge();
  renderCarrito();
  renderDetalleProducto();
});