// ==================================================
// Script para procesar el formulario de Pago
// ==================================================

// ---------------------
// Función Toast (aviso bonito en pantalla)
// ---------------------
function toast(msg){
  const aviso = document.createElement("div");
  aviso.textContent = msg;
  aviso.className = "toast"; 
  document.body.appendChild(aviso);

  // Elimina automáticamente en 2 segundos
  setTimeout(()=> aviso.remove(), 2000);
}

// ---------------------
// Cuando la página está lista
// ---------------------
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formPago"); // formulario de pago
  const msg  = document.getElementById("mensajePago"); // div de mensajes de error

  if (!form) return; // si no hay formulario, no hace nada

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // evita recargar la página

    // Buscar la opción seleccionada
    const sel = form.querySelector('input[name="metodo"]:checked');

    // Si no hay selección → error
    if (!sel) {
      msg.textContent = "⚠️ Debes seleccionar un método de pago.";
      msg.style.color = "#d32f2f";
      return;
    }

    // Si hay selección → éxito
    msg.textContent = ""; // limpia mensaje

    // Mostrar notificación toast
    const textoOK = `Pago realizado con ${sel.value} ✅`;
    toast(textoOK);

    // Vaciar carrito (si existe carrito.js cargado)
    try { 
      setCarrito([]); 
      actualizarBadge(); 
    } catch (e) { 
      console.warn("Carrito no disponible en esta página."); 
    }

    // Redirigir a página de gracias
    setTimeout(() => (window.location.href = "gracias.html"), 1500);
  });
});
