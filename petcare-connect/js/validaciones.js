// ===================================================
//  Función que valida si el dominio del correo es permitido
// ===================================================
function dominioValido(email){ 
  const d = (email.split('@')[1] || '').toLowerCase(); // Obtiene el texto después del "@", en minúsculas
  return ['duoc.cl','profesor.duoc.cl','gmail.com'].includes(d); // Solo acepta estos dominios
}

// ===================================================
//  Función que muestra un mensaje de ayuda o error en el formulario
// ===================================================
function setHelp(form, txt){ 
  const help = form.querySelector('.form-help') || document.getElementById(form.id+'Help'); 
  if(help){ help.textContent = txt || ''; } // Si existe el contenedor, muestra el mensaje (si txt está vacío, limpia)
}

// ====================================
//  Funciones para manejar clientes 
// ====================================
function guardarCliente(nombre, correo, pass){
<<<<<<< HEAD
  let clientes = JSON.parse(localStorage.getItem('clientes')) || []; // Obtiene lista guardada o inicializa vacía
=======
  let clientes = JSON.parse(localStorage.getItem('clientes')) || []; //localStorage guarda informacion
>>>>>>> c70a27da29450c790c7a1497750ecd7c26d7c58e

  correo = correo.trim().toLowerCase(); // Normaliza el correo (sin espacios y minúsculas)

  // ⚡ Evitar registrar dos veces el mismo correo
  if(clientes.some(c => c.correo === correo)){
    return false; // Ya existe, no lo guarda
  }

  // Agregar nuevo cliente
  clientes.push({ nombre, correo, pass });
  localStorage.setItem('clientes', JSON.stringify(clientes)); // Guardar en LocalStorage
  return true; // Registro exitoso
}

function buscarCliente(correo, pass){
<<<<<<< HEAD
  let clientes = JSON.parse(localStorage.getItem('clientes')) || []; // Obtiene lista guardada
  correo = correo.trim().toLowerCase(); // Normaliza el correo ingresado
  return clientes.find(c => c.correo === correo && c.pass === pass); // Busca cliente con correo y pass iguales
=======
  let clientes = JSON.parse(localStorage.getItem('clientes')) || [];//localStorage guarda informacion
  
  // Normalizamos el correo ingresado
  correo = correo.trim().toLowerCase();

  return clientes.find(c => c.correo === correo && c.pass === pass);
>>>>>>> c70a27da29450c790c7a1497750ecd7c26d7c58e
}

// ===================================================
//  Ejecución principal: cuando todo el documento está cargado
// ===================================================
document.addEventListener('DOMContentLoaded', ()=>{

  // ================================
  // FORMULARIO DE REGISTRO
  // ================================
  const fr = document.getElementById('formRegistro');
  if(fr){ // Solo si existe el formulario
    fr.addEventListener('submit', (e)=>{
      e.preventDefault(); // Evita que se envíe a un servidor (todo se maneja en JS)

      // Captura valores de los inputs
      const nombre = document.getElementById('nombre').value.trim();
      const correo = document.getElementById('correo').value.trim();
      const correo2 = document.getElementById('correo2').value.trim();
      const pass = document.getElementById('password').value.trim();
      const pass2 = document.getElementById('password2').value.trim();

      // Validaciones
      if(!dominioValido(correo)){ 
        setHelp(fr,'Correo no válido. Usa duoc.cl, profesor.duoc.cl o gmail.com'); 
        return; 
      }
      if(correo !== correo2){ 
        setHelp(fr,'Los correos no coinciden'); 
        return; 
      }
      if(pass.length < 4 || pass.length > 10){ 
        setHelp(fr,'La contraseña debe tener entre 4 y 10 caracteres'); 
        return; 
      }
      if(pass !== pass2){ 
        setHelp(fr,'Las contraseñas no coinciden'); 
        return; 
      }

      // Guardar cliente en LocalStorage
      if(!guardarCliente(nombre, correo, pass)){
        setHelp(fr,'⚠️ Este correo ya está registrado');
        return;
      }

      // Si todo está correcto
      setHelp(fr,''); 
      alert('Registro exitoso ✅');
      window.location.href = 'login.html'; // Redirige al login
    }); 
  }

  // ================================
  // FORMULARIO DE LOGIN
  // ================================
  const fl = document.getElementById('formLogin');
  if(fl){ 
    fl.addEventListener('submit',(e)=>{
      e.preventDefault(); // Evita envío automático

      // Obtiene valores ingresados
      const correo = document.getElementById('correoLogin').value.trim();
      const pass = document.getElementById('passwordLogin').value.trim();

      // Validaciones básicas
      if(!dominioValido(correo)){ 
        setHelp(fl,'Correo no válido'); 
        return; 
      }
      if(pass.length < 4 || pass.length > 10){ 
        setHelp(fl,'Contraseña 4-10 caracteres'); 
        return; 
      }

      // 🚨 Admin detectado si el correo contiene "admin"
      if(correo.toLowerCase().includes('admin')){ 
        sessionStorage.setItem('rol','admin'); // Guardar rol en sesión
        alert('Bienvenido Administrador ✅'); 
        window.location.href = 'admin/inicio.html'; // Redirige al panel de admin
        return;
      }

      // Si no es admin → buscar cliente en LocalStorage
      const cliente = buscarCliente(correo, pass);
      if(!cliente){
        setHelp(fl,'Usuario o contraseña incorrectos');
        return;
      }

      // Guardar datos de sesión del cliente
      sessionStorage.setItem('rol','cliente'); 
      sessionStorage.setItem('usuario', cliente.nombre); 

      alert('Bienvenido ' + cliente.nombre + ' ✅');
      window.location.href = 'index.html'; // Redirige a la tienda
    }); 
  }

  // ================================
  // FORMULARIO DE CONTACTO
  // ================================
  const fc = document.getElementById('formContacto');
  if(fc){ 
    fc.addEventListener('submit',(e)=>{
      e.preventDefault();

      // Captura valores
      const nombre = document.getElementById('nombreC').value.trim();
      const correo = document.getElementById('correoC').value.trim();
      const msj = document.getElementById('mensajeC').value.trim();

      // Validaciones
      if(nombre === '' || correo === '' || msj === ''){ 
        setHelp(fc,'Todos los campos son obligatorios'); 
        return; 
      }
      if(msj.length < 10){ 
        setHelp(fc,'El mensaje debe tener al menos 10 caracteres'); 
        return; 
      }

      // Si pasa las validaciones
      setHelp(fc,''); 
      alert('Mensaje enviado ✅'); 
      fc.reset(); // Limpia el formulario
    }); 
  }
});
