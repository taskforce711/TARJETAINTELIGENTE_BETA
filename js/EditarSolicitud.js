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

  // Cargar datos que vienen del CRUD
  cargarDatosDesdeCrud();

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
        "Ingresa todos los datos por favor.\n"
        
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
      "Estos cambios se verán reflejados en el panel administrativo."
    );

    if (!confirmar) return;

    alert("Los cambios de la solicitud se han actualizado.");
    console.log("Solicitud editada.", solicitudEditada);
  });
}

function cargarDatosDesdeCrud() {
  let datos;
  try {
    const raw = localStorage.getItem("unipass_solicitud_en_edicion");
    if (!raw) return;
    datos = JSON.parse(raw);
  } catch (err) {
    console.log("No se pudo leer la solicitud en edición", err);
    return;
  }

  if (!datos) return;

  // Resumen rápido
  const alertaResumen = document.querySelector(".alert.alert-info.small");
  if (alertaResumen) {
    alertaResumen.innerHTML =
      `<strong>Solicitud seleccionada:</strong> ${datos.alumno || "Alumno"} — CURP: ${datos.curp || ""} — ` +
      `Tipo: ${datos.tipoTramite || ""} — Estado actual: ${datos.estadoTexto || ""}.`;
  }

  // Campos del trámite (si hay datos)
  if (tipoTramite && datos.tipoTramite) {
    tipoTramite.value = datos.tipoTramite;
  }
  if (estadoTramite && datos.estadoTexto) {
    // Intentar seleccionar el estado que coincide con el texto
    for (let i = 0; i < estadoTramite.options.length; i++) {
      if (estadoTramite.options[i].text.trim() === datos.estadoTexto.trim()) {
        estadoTramite.selectedIndex = i;
        break;
      }
    }
  }
  if (fechaSolicitud && datos.fechaSolicitud) {
    // Si en el CRUD la fecha está como 25/11/2025 necesitarías convertirla a 2025-11-25.
    // Por ahora solo la asignamos si ya viene en formato yyyy-mm-dd
    if (datos.fechaSolicitud.includes("-")) {
      fechaSolicitud.value = datos.fechaSolicitud;
    }
  }
  if (modulo && datos.modulo) {
    modulo.value = datos.modulo;
  }

  // Documentos: marcar radios según lo guardado
  const docs = datos.documentos || {};

  function marcarRadioDoc(nombreGrupo, estado) {
    const valor = estado === "aprobado" ? "aprobado" : "rechazado";
    const radio = document.querySelector(`input[name="${nombreGrupo}"][value="${valor}"]`);
    if (radio) {
      radio.checked = true;
    }
  }

  marcarRadioDoc("docConstancia", docs.constancia);
  marcarRadioDoc("docIdentificacion", docs.identificacion);
  marcarRadioDoc("docFoto", docs.foto);
  marcarRadioDoc("docCurp", docs.curp);
  marcarRadioDoc("docActa", docs.acta);
}
