// ../../js/EditarSolicitud.js

window.addEventListener("load", function () {
  manejarEditarSolicitud();
});

function manejarEditarSolicitud() {
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
      alert(
        "Revisa los campos marcados en rojo.\n\n" +
        "Nombre, apellidos, institución, ciudad, observaciones y la fecha son obligatorios.\n" +
        "La CURP puede ser inventada, pero no debe quedar vacía."
      );
      return;
    }

    const docs = {
      constancia: leerEstadoDocumento("docConstancia"),
      identificacion: leerEstadoDocumento("docIdentificacion"),
      foto: leerEstadoDocumento("docFoto"),
      curp: leerEstadoDocumento("docCurp"),
      acta: leerEstadoDocumento("docActa")
    };

    const solicitudEditada = {
      nombre: nombre.value.trim(),
      apellidos: apellidos.value.trim(),
      curp: curp.value.trim(),
      nivel: nivel.value,
      institucion: institucion.value.trim(),
      ciudad: ciudad.value.trim(),
      tipoTramite: tipoTramite.value,
      estadoTramite: estadoTramite.value,
      fechaSolicitud: fechaSolicitud.value,
      modulo: modulo.value,
      observaciones: observaciones.value.trim(),
      documentos: docs
    };

    const confirmar = confirm(
      "¿Deseas guardar los cambios de esta solicitud?\n" +
      "Estos cambios se verán reflejados en el panel administrativo (modo demo)."
    );

    if (!confirmar) return;

    alert("Los cambios de la solicitud se han actualizado (modo demo). En el futuro, también se actualizarán los colores en el CRUD.");
    console.log("Solicitud editada (demo):", solicitudEditada);
  });
}
