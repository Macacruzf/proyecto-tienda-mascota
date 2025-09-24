
function dominioValido(email){ const d=(email.split('@')[1]||'').toLowerCase(); return ['duoc.cl','profesor.duoc.cl','gmail.com'].includes(d); }
function setHelp(form, txt){ const help=form.querySelector('.form-help')||document.getElementById(form.id+'Help'); if(help){ help.textContent=txt||''; } }
// Registro
document.addEventListener('DOMContentLoaded', ()=>{
  const fr=document.getElementById('formRegistro');
  if(fr){ fr.addEventListener('submit', (e)=>{
    e.preventDefault();
    const correo=document.getElementById('correo').value.trim();
    const correo2=document.getElementById('correo2').value.trim();
    const pass=document.getElementById('password').value.trim();
    const pass2=document.getElementById('password2').value.trim();
    if(!dominioValido(correo)){ setHelp(fr,'Correo no válido. Usa duoc.cl, profesor.duoc.cl o gmail.com'); return; }
    if(correo!==correo2){ setHelp(fr,'Los correos no coinciden'); return; }
    if(pass.length<4||pass.length>10){ setHelp(fr,'La contraseña debe tener entre 4 y 10 caracteres'); return; }
    if(pass!==pass2){ setHelp(fr,'Las contraseñas no coinciden'); return; }
    setHelp(fr,''); alert('Registro exitoso ✅'); window.location.href='login.html';
  }); }
  // Login
  const fl=document.getElementById('formLogin');
  if(fl){ fl.addEventListener('submit',(e)=>{
    e.preventDefault();
    const correo=document.getElementById('correoLogin').value.trim();
    const pass=document.getElementById('passwordLogin').value.trim();
    if(!dominioValido(correo)){ setHelp(fl,'Correo no válido'); return; }
    if(pass.length<4||pass.length>10){ setHelp(fl,'Contraseña 4-10 caracteres'); return; }
    if(correo.includes('admin')){ sessionStorage.setItem('rol','admin'); alert('Bienvenido Administrador ✅'); window.location.href='admin/inicio.html'; }
    else { sessionStorage.setItem('rol','cliente'); alert('Bienvenido Cliente ✅'); window.location.href='index.html'; }
  }); }
  // Contacto
  const fc=document.getElementById('formContacto');
  if(fc){ fc.addEventListener('submit',(e)=>{
    e.preventDefault();
    const nombre=document.getElementById('nombreC').value.trim();
    const correo=document.getElementById('correoC').value.trim();
    const msj=document.getElementById('mensajeC').value.trim();
    if(nombre===''||correo===''||msj===''){ setHelp(fc,'Todos los campos son obligatorios'); return; }
    if(msj.length<10){ setHelp(fc,'El mensaje debe tener al menos 10 caracteres'); return; }
    setHelp(fc,''); alert('Mensaje enviado ✅'); fc.reset();
  }); }
});
