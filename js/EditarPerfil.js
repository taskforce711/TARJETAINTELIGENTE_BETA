// ../js/EditarPerfil.js

window.addEventListener("load", function () {
  manejarEdicionPerfil();
});

function manejarEdicionPerfil() {
  // Detectar botones de Salir y Aceptar
  const btnSalir = document.querySelector('a.btn.btn-danger[href="../perfil/perfil.html"]');
  const btnAceptar = document.querySelector('a.btn.btn-aceptar[href="../perfil/perfil.html"]');
  if (!btnSalir && !btnAceptar) return;

  const nombre = document.getElementById("nombre");
  const apellidos = document.getElementById("apellidos");
  const curp = document.getElementById("curp");
  const fechaNac = document.getElementById("fechaNac");
  const nivel = document.getElementById("nivel");
  const telefono = document.getElementById("telefono");
  const correo = document.getElementById("correo");
  const direccion = document.getElementById("direccion");
  const cp = document.getElementById("cp");
  const ciudad = document.getElementById("ciudad");

  // Marca o limpia errores visuales
  function marcarError(input, tieneError) {
    if (!input) return;
    if (tieneError) {
      input.classList.add("is-invalid");
    } else {
      input.classList.remove("is-invalid");
    }
  }

  // Validar formato simple de correo (debe contener @)
  function correoValido(valor) {
    return valor.includes("@") && valor.indexOf("@") > 0 && valor.indexOf("@") < valor.length - 1;
  }

  btnAceptar.addEventListener("click", function (e) {
    let hayError = false;

    // Nombre y apellidos obligatorios
    if (!nombre || !nombre.value.trim()) {
      hayError = true;
      marcarError(nombre, true);
    } else {
      marcarError(nombre, false);
    }

    if (!apellidos || !apellidos.value.trim()) {
      hayError = true;
      marcarError(apellidos, true);
    } else {
      marcarError(apellidos, false);
    }

    // CORREO: obligatorio y debe tener @
    if (!correo || !correo.value.trim() || !correoValido(correo.value.trim())) {
      hayError = true;
      marcarError(correo, true);
    } else {
      marcarError(correo, false);
    }

    // Teléfono: obligatorio
    if (!telefono || !telefono.value.trim()) {
      hayError = true;
      marcarError(telefono, true);
    } else {
      marcarError(telefono, false);
    }

    // CURP, fecha, nivel, dirección, CP y ciudad pueden ser inventados, pero si se dejan vacíos se marcan
    const camposInventables = [curp, fechaNac, nivel, direccion, cp, ciudad];
    camposInventables.forEach((campo) => {
      if (!campo) return;
      if (!campo.value || !campo.value.toString().trim()) {
        // No se detiene el flujo por esto, solo se marca como advertencia visual
        marcarError(campo, true);
      } else {
        marcarError(campo, false);
      }
    });

    if (hayError) {
      e.preventDefault();
      alert("Corrige los campos marcados en rojo. El nombre, los apellidos, el teléfono y un correo válido son obligatorios.");
      return;
    }

    alert("Los cambios de tu perfil se han registrado.");
    // Se deja que el enlace navegue a perfil.html
  }); 

  // Salir: confirmar si el usuario quiere abandonar sin validar nada
  if (btnSalir) {
    btnSalir.addEventListener("click", function (e) {
      const deseaSalir = confirm("¿Seguro que deseas salir sin revisar los cambios?");
      if (!deseaSalir) {
        e.preventDefault();
      }
    });
  }
}
