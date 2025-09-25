// Cuando la página está lista
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formPago"); // formulario
  const msg  = document.getElementById("mensajePago"); // div para mensajes

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // evita recargar la página

    // Buscar la opción seleccionada
    const sel = form.querySelector('input[name="metodo"]:checked');

    // Si no hay selección → error
    if (!sel) {
      msg.textContent = "Debes seleccionar un método de pago.";
      msg.style.color = "#d32f2f";
      return;
    }

    // Si hay selección → éxito
    msg.textContent = "";

    // Mostrar notificación (toast si existe, si no alert)
    const textoOK = `Pago realizado con ${sel.value} ✅`;
    if (typeof toast === "function") {
      toast(textoOK);
    } else {
      alert(textoOK);
    }

    // Vaciar carrito
    try { setCarrito([]); actualizarBadge(); } catch (e) {}

    // Redirigir a página de gracias
    setTimeout(() => (window.location.href = "gracias.html"), 1200);
  });
});