//  Función que valida si el dominio del correo es permitido
function dominioValido(email){ 
  const d = (email.split('@')[1] || '').toLowerCase(); // Obtiene lo que está después del @
  return ['duoc.cl','profesor.duoc.cl','gmail.com'].includes(d); // Dominios válidos
}

//  Función que muestra un mensaje de ayuda o error en el formulario
function setHelp(form, txt){ 
  const help = form.querySelector('.form-help') || document.getElementById(form.id+'Help'); 
  if(help){ help.textContent = txt || ''; } // Inserta el texto (si txt está vacío borra el mensaje)
}

// ====================================
//  Funciones para manejar clientes 
// ====================================
function guardarCliente(nombre, correo, pass){
  let clientes = JSON.parse(localStorage.getItem('clientes')) || []; //localStorage guarda informacion

  // Normalizamos el correo
  correo = correo.trim().toLowerCase();

  // ⚡ Evitar registrar dos veces el mismo correo
  if(clientes.some(c => c.correo === correo)){
    return false; 
  }

  clientes.push({ nombre, correo, pass });
  localStorage.setItem('clientes', JSON.stringify(clientes));
  return true;
}

function buscarCliente(correo, pass){
  let clientes = JSON.parse(localStorage.getItem('clientes')) || [];//localStorage guarda informacion
  
  // Normalizamos el correo ingresado
  correo = correo.trim().toLowerCase();

  return clientes.find(c => c.correo === correo && c.pass === pass);
}

// ===================================================
//  Cuando todo el documento está cargado
// ===================================================
document.addEventListener('DOMContentLoaded', ()=>{

  // ================================
  // FORMULARIO DE REGISTRO
  // ================================
  const fr = document.getElementById('formRegistro');
  if(fr){ 
    fr.addEventListener('submit', (e)=>{
      e.preventDefault();

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

      // Guardar cliente
      if(!guardarCliente(nombre, correo, pass)){
        setHelp(fr,'⚠️ Este correo ya está registrado');
        return;
      }

      setHelp(fr,''); 
      alert('Registro exitoso ✅');
      window.location.href = 'login.html'; 
    }); 
  }

  // ================================
  // FORMULARIO DE LOGIN
  // ================================
  const fl = document.getElementById('formLogin');
  if(fl){ 
    fl.addEventListener('submit',(e)=>{
      e.preventDefault();

      const correo = document.getElementById('correoLogin').value.trim();
      const pass = document.getElementById('passwordLogin').value.trim();

      if(!dominioValido(correo)){ 
        setHelp(fl,'Correo no válido'); 
        return; 
      }
      if(pass.length < 4 || pass.length > 10){ 
        setHelp(fl,'Contraseña 4-10 caracteres'); 
        return; 
      }

      // Si el correo incluye "admin" → admin
      if(correo.toLowerCase().includes('admin')){ 
        sessionStorage.setItem('rol','admin');
        alert('Bienvenido Administrador ✅'); 
        window.location.href = 'admin/inicio.html'; 
        return;
      }

      // Buscar cliente en LocalStorage
      const cliente = buscarCliente(correo, pass);
      if(!cliente){
        setHelp(fl,'Usuario o contraseña incorrectos');
        return;
      }

      // Guardar datos de sesión del cliente
      sessionStorage.setItem('rol','cliente');
      sessionStorage.setItem('usuario', cliente.nombre);

      alert('Bienvenido ' + cliente.nombre + ' ✅');
      window.location.href = 'index.html'; 
    }); 
  }

  // ================================
  // FORMULARIO DE CONTACTO
  // ================================
  const fc = document.getElementById('formContacto');
  if(fc){ 
    fc.addEventListener('submit',(e)=>{
      e.preventDefault();

      const nombre = document.getElementById('nombreC').value.trim();
      const correo = document.getElementById('correoC').value.trim();
      const msj = document.getElementById('mensajeC').value.trim();

      if(nombre === '' || correo === '' || msj === ''){ 
        setHelp(fc,'Todos los campos son obligatorios'); 
        return; 
      }
      if(msj.length < 10){ 
        setHelp(fc,'El mensaje debe tener al menos 10 caracteres'); 
        return; 
      }

      setHelp(fc,''); 
      alert('Mensaje enviado ✅'); 
      fc.reset(); 
    }); 
  }
});
