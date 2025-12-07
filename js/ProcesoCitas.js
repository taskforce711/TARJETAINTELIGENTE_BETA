// ../../js/ProcesoCitas.js

// Esperar a que el DOM esté listo en cualquier página del flujo
window.addEventListener("load", function () {
  manejarPasoLlenadoDatos();
  manejarPasoCargarDatos();
  manejarPasoConfirmacion();
});

/* ============================================================
   PASO 1: LlenadoDatos.html
   Ahora solo exige datos básicos (teléfono y correos)
   Lo demás puede ir inventado / opcional
============================================================ */
function manejarPasoLlenadoDatos() {
  const btnSiguiente = document.querySelector(
    'a.btn.btn-cta[href="CargarDatos.html"]'
  );
  if (!btnSiguiente) return;

  const telefono = document.getElementById("telefono");
  const correo = document.getElementById("correo");
  const confCorreo = document.getElementById("confCorreo");

  //  esta función solo marca en rojo los campos que falten
  function marcarError(input, tieneError) {
    if (!input) return;
    if (tieneError) {
      input.classList.add("is-invalid");
    } else {
      input.classList.remove("is-invalid");
    }
  }

  btnSiguiente.addEventListener("click", function (e) {
    let hayError = false;

    // Solo estos campos son realmente obligatorios
    const camposObligatorios = [telefono, correo, confCorreo];

    camposObligatorios.forEach((campo) => {
      if (!campo || !campo.value.trim()) {
        hayError = true;
        marcarError(campo, true);
      } else {
        marcarError(campo, false);
      }
    });

    // Confirmar que los correos coincidan
    if (correo && confCorreo && correo.value.trim() !== confCorreo.value.trim()) {
      hayError = true;
      marcarError(correo, true);
      marcarError(confCorreo, true);
      alert("El correo y la confirmación de correo deben coincidir.");
    }

    if (hayError) {
      e.preventDefault();
      alert("Por favor ingresa los datos");
      return;
    }
  });
}

/* ============================================================
   PASO 2: CargarDatos.html
   Ahora solo son obligatorios los 3 checkboxes de consentimiento.
   Los archivos se vuelven opcionales.
============================================================ */
function manejarPasoCargarDatos() {
  const btnContinuar = document.querySelector(
    'a.btn.btn-cta[href="ConfirmacionCita.html"]'
  );
  if (!btnContinuar) return;

  // aquí ya no revisamos archivos, solo los consentimientos
  const consent1 = document.getElementById("consent1");
  const consent2 = document.getElementById("consent2");
  const consent3 = document.getElementById("consent3");

  btnContinuar.addEventListener("click", function (e) {
    let hayError = false;

    if (!consent1 || !consent1.checked) hayError = true;
    if (!consent2 || !consent2.checked) hayError = true;
    if (!consent3 || !consent3.checked) hayError = true;

    if (hayError) {
      e.preventDefault();
      alert("Para continuar, es necesario llenar los datos.");
      return;
    }
  });
}

/* ============================================================
   PASO 3: ConfirmacionCita.html
   Se mantiene igual que antes
============================================================ */
function manejarPasoConfirmacion() {
  const btnEnviar = document.querySelector(
    ".form-card button.btn-cta.btn-lg"
  );
  if (!btnEnviar) return;

  const consent1 = document.getElementById("consent1");
  const consent2 = document.getElementById("consent2");

  btnEnviar.addEventListener("click", function (e) {
    e.preventDefault();

    if (!consent1 || !consent1.checked || !consent2 || !consent2.checked) {
      alert("Debes aceptar los términos y el aviso de privacidad antes de enviar tu solicitud.");
      return;
    }

    const deseaContinuar = confirm(
      "¿Deseas continuar con el envío de tu solicitud de cita UniPass?"
    );

    if (!deseaContinuar) return;

    alert(
      "Tu solicitud ha sido enviada.\n\n" +
      "En un plazo aproximado de 24 a 48 horas recibirás un correo con tu código QR de cita. " +
      "Ese QR te servirá para tu trámite por primera vez o para la renovación de la tarjeta UniPass.\n\n" +
      "Con tu tarjeta activa tendrás acceso al descuento en el camión, solo deberás pasarla por la máquina lectora en las unidades autorizadas."
    );
  });
}
