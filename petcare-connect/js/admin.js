/* ---------------------------
   Funciones base
---------------------------- */
//  Verifica que el usuario tenga rol de administrador
function requireAdmin(){ 
  const rol = sessionStorage.getItem('rol'); 
  if(rol !== 'admin'){ // si no es admin
    window.location.href='../login.html'; // lo manda a login
  }
}

// Lee un valor desde localStorage
function getLS(k){ 
  return JSON.parse(localStorage.getItem(k) || '[]'); 
}

// Guarda un valor en localStorage
function setLS(k,v){ 
  localStorage.setItem(k, JSON.stringify(v)); 
}

/* ---------------------------
   CRUD de Productos
---------------------------- */
// Renderiza la tabla de productos
function renderProductos(){
  const tbody = document.querySelector('#tablaProductos tbody'); 
  if(!tbody) return; // si no estamos en esa página, no hace nada

  // Datos iniciales (seed)
  const seed = [
    {id:1, nombre:'Collar para Perro', precio:9990, imagen:'img/collar.jpg'},
    {id:2, nombre:'Alimento Premium Gato', precio:15990, imagen:'img/comidagato.jpg'},
    {id:3, nombre:'Juguete Mascota', precio:5990, imagen:'img/juguete.jpg'}
  ];

  // Si no hay productos en localStorage, guarda el seed
  if(getLS('productos').length === 0) setLS('productos', seed);

  const items = getLS('productos');

  // Genera las filas de la tabla
  tbody.innerHTML = items.map(p=>`
    <tr>
      <td>${p.id}</td>
      <td>${p.nombre}</td>
      <td>$${p.precio}</td>
      <td>
        <a href="editarProducto.html?id=${p.id}">Editar</a> | 
        <a href="#" onclick="delProducto(${p.id});return false;">Eliminar</a>
      </td>
    </tr>
  `).join('');
}

// Elimina un producto
function delProducto(id){ 
  const items = getLS('productos').filter(p => p.id !== id); 
  setLS('productos', items); 
  renderProductos(); 
}

// Maneja el formulario de "nuevo producto"
function bindNuevoProducto(){
  const f = document.getElementById('formNuevoProducto'); 
  if(!f) return;

  f.addEventListener('submit',(e)=>{
    e.preventDefault();
    const nombre = document.getElementById('npNombre').value.trim();
    const precio = parseInt(document.getElementById('npPrecio').value,10) || 0;
    const imagen = document.getElementById('npImagen').value.trim() || 'img/prod9.jpg';

    const items = getLS('productos'); 
    const id = items.length ? Math.max(...items.map(i=>i.id))+1 : 1;

    items.push({id, nombre, precio, imagen}); 
    setLS('productos', items);

    alert('Producto guardado ✅'); 
    window.location.href='productos.html';
  });
}

// Maneja el formulario de "editar producto"
function bindEditarProducto(){
  const f = document.getElementById('formEditarProducto'); 
  if(!f) return;

  // Obtiene el ID desde la URL (?id=...)
  const params = new URLSearchParams(location.search); 
  const id = parseInt(params.get('id'),10);

  let items = getLS('productos'); 
  const p = items.find(x => x.id === id);

  if(!p){ 
    alert('Producto no encontrado'); 
    window.location.href='productos.html'; 
    return; 
  }

  // Rellena los campos del formulario
  document.getElementById('epId').value = p.id; 
  document.getElementById('epNombre').value = p.nombre;
  document.getElementById('epPrecio').value = p.precio; 
  document.getElementById('epImagen').value = p.imagen;

  f.addEventListener('submit',(e)=>{
    e.preventDefault();
    p.nombre = document.getElementById('epNombre').value.trim();
    p.precio = parseInt(document.getElementById('epPrecio').value,10) || 0;
    p.imagen = document.getElementById('epImagen').value.trim() || p.imagen;

    // Reemplaza el producto actualizado en el array
    items = items.map(x => x.id === p.id ? p : x); 
    setLS('productos', items);

    alert('Producto actualizado ✅'); 
    window.location.href='productos.html';
  });
}

/* ---------------------------
   CRUD de Usuarios
---------------------------- */
// Renderiza la tabla de usuarios
function renderUsuarios(){
  const tbody = document.querySelector('#tablaUsuarios tbody'); 
  if(!tbody) return;

  // Si no hay usuarios en localStorage, carga seed inicial
  if(getLS('usuarios').length === 0) setLS('usuarios',[
    {id:1, nombre:'Admin', correo:'admin@duoc.cl', rol:'admin'},
    {id:2, nombre:'Cliente Demo', correo:'cliente@gmail.com', rol:'cliente'}
  ]);

  const items = getLS('usuarios');

  // Genera las filas
  tbody.innerHTML = items.map(u=>`
    <tr>
      <td>${u.id}</td>
      <td>${u.nombre}</td>
      <td>${u.correo}</td>
      <td>${u.rol}</td>
      <td>
        <a href="editarUsuario.html?id=${u.id}">Editar</a> | 
        <a href="#" onclick="delUsuario(${u.id});return false;">Eliminar</a>
      </td>
    </tr>
  `).join('');
}

// Elimina un usuario
function delUsuario(id){ 
  const items = getLS('usuarios').filter(u => u.id !== id); 
  setLS('usuarios', items); 
  renderUsuarios(); 
}

// Maneja formulario de "nuevo usuario"
function bindNuevoUsuario(){
  const f = document.getElementById('formNuevoUsuario'); 
  if(!f) return;

  f.addEventListener('submit',(e)=>{
    e.preventDefault();
    const nombre = document.getElementById('nuNombre').value.trim();
    const correo = document.getElementById('nuCorreo').value.trim();
    const rol = document.getElementById('nuRol').value;

    const items = getLS('usuarios'); 
    const id = items.length ? Math.max(...items.map(i=>i.id))+1 : 1;

    items.push({id, nombre, correo, rol}); 
    setLS('usuarios', items);

    alert('Usuario guardado ✅'); 
    window.location.href='usuarios.html';
  });
}

// Maneja formulario de "editar usuario"
function bindEditarUsuario(){
  const f = document.getElementById('formEditarUsuario'); 
  if(!f) return;

  // Obtiene id desde la URL
  const params = new URLSearchParams(location.search); 
  const id = parseInt(params.get('id'),10);

  let items = getLS('usuarios'); 
  const u = items.find(x => x.id === id);

  if(!u){ 
    alert('Usuario no encontrado'); 
    window.location.href='usuarios.html'; 
    return; 
  }

  // Rellena campos del formulario
  document.getElementById('euId').value = u.id; 
  document.getElementById('euNombre').value = u.nombre;
  document.getElementById('euCorreo').value = u.correo; 
  document.getElementById('euRol').value = u.rol;

  f.addEventListener('submit',(e)=>{
    e.preventDefault();
    u.nombre = document.getElementById('euNombre').value.trim();
    u.correo = document.getElementById('euCorreo').value.trim();
    u.rol = document.getElementById('euRol').value;

    items = items.map(x => x.id === u.id ? u : x); 
    setLS('usuarios', items);

    alert('Usuario actualizado ✅'); 
    window.location.href='usuarios.html';
  });
}

/* ---------------------------
   Inicialización
---------------------------- */
// Cuando la página termina de cargar
document.addEventListener('DOMContentLoaded', ()=>{
  if(document.body.classList.contains('admin')){ 
    requireAdmin(); // ⚡ solo admins pueden entrar
  }

  // Renderizar y enlazar funciones
  renderProductos(); 
  bindNuevoProducto(); 
  bindEditarProducto();

  renderUsuarios(); 
  bindNuevoUsuario(); 
  bindEditarUsuario();
});
