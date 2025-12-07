// ../../js/RegistrarSolicitud.js

window.addEventListener("load", function () {
  manejarRegistrarSolicitud();
});

function manejarRegistrarSolicitud() {
  const form = document.querySelector("form");
  if (!form) return;

  const nombre = document.getElementById("nombre");
  const apellidos = document.getElementById("apellidos");
  const curp = document.getElementById("curp");
  const nivel = document.getElementById("nivel");
  const institucion = document.getElementById("institucion");
  const ciudad = document.getElementById("ciudad");

  const tipoTramite = document.getElementById("tipoTramite");
  const estadoTramite = document.getElementById("estadoTramite");
  const fechaSolicitud = document.getElementById("fechaSolicitud");
  const modulo = document.getElementById("modulo");
  const observaciones = document.getElementById("observaciones");

  function marcarError(input, tieneError) {
    if (!input) return;
    if (tieneError) {
      input.classList.add("is-invalid");
    } else {
      input.classList.remove("is-invalid");
    }
  }

  function leerEstadoDocumento(nombreGrupo) {
    const seleccion = document.querySelector(`input[name="${nombreGrupo}"]:checked`);
    if (!seleccion) return "pendiente";
    return seleccion.value === "aprobado" ? "aprobado" : "rechazado";
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let hayError = false;

    const camposTextoObligatorios = [
      nombre,
      apellidos,
      curp,        
      institucion,
      ciudad,
      observaciones
    ];

    camposTextoObligatorios.forEach((campo) => {
      if (!campo || !campo.value.trim()) {
        hayError = true;
        marcarError(campo, true);
      } else {
        marcarError(campo, false);
      }
    });

    const selectsObligatorios = [
      nivel,
      tipoTramite,
      estadoTramite,
      modulo
    ];

    selectsObligatorios.forEach((select) => {
      if (!select || !select.value || select.value === "" || select.value.startsWith("Selecciona")) {
        hayError = true;
        marcarError(select, true);
      } else {
        marcarError(select, false);
      }
    });

    if (!fechaSolicitud || !fechaSolicitud.value) {
      hayError = true;
      marcarError(fechaSolicitud, true);
    } else {
      marcarError(fechaSolicitud, false);
    }

    if (hayError) {
      alert("Por favor completa todos los campos obligatorios antes de registrar la solicitud.\n\nLa CURP puede ser inventada, pero no debe quedar vacía.");
      return;
    }

    // Estados de documentos desde radios
    const docs = {
      constancia: leerEstadoDocumento("docConstancia"),
      identificacion: leerEstadoDocumento("docIdentificacion"),
      foto: leerEstadoDocumento("docFoto"),
      curp: leerEstadoDocumento("docCurp"),
      acta: leerEstadoDocumento("docActa")
    };

 
    alert(
      "La solicitud se ha registrado (modo demo).\n\n" +
      "Más adelante, estos datos se usarán para crear la fila en el panel CRUD con los colores de documentos."
    );
  });

}
