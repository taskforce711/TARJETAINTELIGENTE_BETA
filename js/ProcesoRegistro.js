// ../js/ProcesoRegistro.js

// Comentario general: este archivo controla el flujo de registro
// entre datos.html (paso 1) y confRegistro.html (paso 2).

window.addEventListener("load", function () {
  manejarPasoDatosGenerales();
  manejarPasoConfirmacionRegistro();
});

/* ============================================================
   PASO 1: datos.html
   Nombre, apellidos, CURP, fecha y celular obligatorios.
   (Aunque CURP y fecha puedan ser inventados, aquí solo se revisa que no estén vacíos.)
============================================================ */
function manejarPasoDatosGenerales() {
  // Detectar si estamos en datos.html por el botón "Siguiente" que apunta a confRegistro.html
  const btnSiguiente = document.querySelector(
    'a.btn.btn-cta[href="../Registro_Usuario/confRegistro.html"]'
  );
  if (!btnSiguiente) return;

  const nombre = document.getElementById("nombre");
  const apPaterno = document.getElementById("apPaterno");
  const apMaterno = document.getElementById("apMaterno");
  const curp = document.getElementById("curp");
  const fechaNac = document.getElementById("fechaNac");
  const sexo = document.getElementById("sexo"); // Solo se marcará si viene vacío, pero no detiene tanto.
  const telefono = document.getElementById("telefono");

  //  marca en rojo los campos que falten
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

    // Campos que sí o sí deben ir llenos
    const camposObligatorios = [nombre, apPaterno, apMaterno, curp, fechaNac, telefono];

    camposObligatorios.forEach((campo) => {
      if (!campo || !campo.value.trim()) {
        hayError = true;
        marcarError(campo, true);
      } else {
        marcarError(campo, false);
      }
    });

    // El sexo no lo hacemos ultra obligatorio, pero si está vacío se marca visualmente
    if (sexo && sexo.value === "Selecciona") {
      marcarError(sexo, true);
    } else {
      marcarError(sexo, false);
    }

    if (hayError) {
      e.preventDefault();
      alert("Por favor completa todos los datos generales (nombre, apellidos, CURP, fecha de nacimiento y celular) antes de continuar.");
      return;
    }

    // Opcional: guardar datos básicos para usarlos después (por ejemplo, en el perfil)
    const datosGenerales = {
      nombre: nombre.value.trim(),
      apPaterno: apPaterno.value.trim(),
      apMaterno: apMaterno.value.trim(),
      curp: curp.value.trim(),
      fechaNac: fechaNac.value,
      sexo: sexo ? sexo.value : "",
      telefono: telefono.value.trim()
    };

    try {
      localStorage.setItem("unipass_registro_datos_generales", JSON.stringify(datosGenerales));
    } catch (err) {
      // Si no se puede guardar, no se rompe el flujo.
    }
  });
}

/* ============================================================
   PASO 2: confRegistro.html
   Correo, confirmar correo, contraseña, confirmar contraseña
   y ambos consentimientos obligatorios.
============================================================ */
function manejarPasoConfirmacionRegistro() {
  // Detectar si estamos en confRegistro.html por el botón "Registrar" que va a login.html
  const btnRegistrar = document.querySelector(
    'a.btn.btn-cta[href="../Registro_Usuario/login.html"]'
  );
  if (!btnRegistrar) return;

  const correo = document.getElementById("correo");
  const confCorreo = document.getElementById("confCorreo");
  const contraseña = document.getElementById("contraseña");
  const confContraseña = document.getElementById("confContraseña");
  const consent1 = document.getElementById("consent1");
  const consent2 = document.getElementById("consent2");

  //  función para marcar visualmente los errores
  function marcarError(input, tieneError) {
    if (!input) return;
    if (tieneError) {
      input.classList.add("is-invalid");
    } else {
      input.classList.remove("is-invalid");
    }
  }

  btnRegistrar.addEventListener("click", function (e) {
    let hayError = false;

    // Revisar que correo y confirmación no estén vacíos
    const camposCorreo = [correo, confCorreo];
    camposCorreo.forEach((campo) => {
      if (!campo || !campo.value.trim()) {
        hayError = true;
        marcarError(campo, true);
      } else {
        marcarError(campo, false);
      }
    });

    // Revisar que contraseña y confirmación no estén vacías
    const camposPass = [contraseña, confContraseña];
    camposPass.forEach((campo) => {
      if (!campo || !campo.value.trim()) {
        hayError = true;
        marcarError(campo, true);
      } else {
        marcarError(campo, false);
      }
    });

    // Validar coincidencia de correos
    if (
      correo &&
      confCorreo &&
      correo.value.trim() &&
      confCorreo.value.trim() &&
      correo.value.trim() !== confCorreo.value.trim()
    ) {
      hayError = true;
      marcarError(correo, true);
      marcarError(confCorreo, true);
      alert("El correo y la confirmación de correo deben coincidir.");
    }

    // Validar coincidencia de contraseñas
    if (
      contraseña &&
      confContraseña &&
      contraseña.value.trim() &&
      confContraseña.value.trim() &&
      contraseña.value.trim() !== confContraseña.value.trim()
    ) {
      hayError = true;
      marcarError(contraseña, true);
      marcarError(confContraseña, true);
      alert("La contraseña y su confirmación deben coincidir.");
    }

    // Validar consentimientos
    if (!consent1 || !consent1.checked || !consent2 || !consent2.checked) {
      hayError = true;
      alert("Debes aceptar los términos y el aviso de privacidad para completar tu registro.");
    }

    if (hayError) {
      e.preventDefault();
      return;
    }

    //  aquí podrías preparar el objeto "usuario" para un futuro backend
    const datosCuenta = {
      correo: correo.value.trim(),
      contraseña: contraseña.value.trim() // En un sistema real se enviaría cifrada al servidor, no se guardaría en limpio.
    };

    try {
      localStorage.setItem("unipass_registro_cuenta", JSON.stringify(datosCuenta));
    } catch (err) {
      // Si no se puede guardar, no afecta el flujo visual.
    }

    // Opcional: mensaje de feedback antes de ir al login
    alert("Tu registro en UniPass se ha completado. Ahora puedes iniciar sesión con tu correo y contraseña.");

    // Aquí dejamos que el enlace funcione normalmente y te lleve a login.html
    // (No hacemos preventDefault al final para permitir la navegación.)
  });
}
