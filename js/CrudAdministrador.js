// ../../js/CrudAdministrador.js

window.addEventListener("load", function () {
  manejarCrudSolicitudes();
});

//Seleccionar el boton pulsado de los botones ver, editar, cambiar estado, eliminar y realizar la acciones pertinentes
function manejarCrudSolicitudes() {
  const tabla = document.querySelector(".table.table-hover tbody");
  if (!tabla) return;

  // Delegación de eventos: un solo listener para todos los botones
  tabla.addEventListener("click", function (e) {
    const boton = e.target.closest("a.btn");
    if (!boton) return;

    const fila = boton.closest("tr");
    if (!fila) return;

    const textoBoton = boton.innerText.trim();

    if (textoBoton === "Eliminar") {
      e.preventDefault();
      manejarEliminarFila(fila);
    } else if (textoBoton === "Cambiar estado") {
      e.preventDefault();
      manejarCambiarEstado(fila);
    } else if (textoBoton === "Ver") {
      e.preventDefault();
      manejarVerFila(fila);
    } else if (textoBoton === "Editar") {
      // Antes de ir a EditarSolicitud, guardamos la info de la fila
      guardarSolicitudEnEdicion(fila);
      // No hacemos preventDefault: dejamos que el enlace navegue a EditarSolicitud.html
    }
  });
}

//Eliminar registro
function manejarEliminarFila(fila) {
  const nombreAlumno = fila.cells[0]?.innerText || "este registro";
  const deseaEliminar = confirm(`¿Seguro que deseas eliminar la solicitud de ${nombreAlumno}?`);
  if (!deseaEliminar) return;

  const cuerpo = fila.parentNode;
  cuerpo.removeChild(fila);
  alert("La solicitud ha sido eliminada de la tabla.");
}

//Cambiar el estado de la solicitud
function manejarCambiarEstado(fila) {
  const celdaEstado = fila.cells[3];
  if (!celdaEstado) return;

  const estadoActualTexto = celdaEstado.innerText.trim();

  // Opciones válidas de estado
  const opciones = [
    "Pendiente revisión",
    "Aprobado",
    "Rechazado",
    "En espera de documentos"
  ];

  // Construir mensaje con menú numerado
  let mensaje = "Selecciona el nuevo estado del trámite (escribe el número):\n\n";
  opciones.forEach((op, i) => {
    mensaje += `${i + 1}. ${op}\n`;
  });
  mensaje += `\nEstado actual: ${estadoActualTexto}`;

  const seleccion = prompt(mensaje, "1");

  if (!seleccion) {
    alert("No se realizó ningún cambio de estado.");
    return;
  }

  const index = parseInt(seleccion, 10) - 1;
  if (isNaN(index) || index < 0 || index >= opciones.length) {
    alert("Opción inválida. No se realizó ningún cambio.");
    return;
  }

  const nuevoEstado = opciones[index];

  // Determinar color de badge según el estado
  let claseBadge = "bg-secondary";
  if (nuevoEstado === "Pendiente revisión") {
    claseBadge = "bg-warning text-dark";
  } else if (nuevoEstado === "Aprobado") {
    claseBadge = "bg-success";
  } else if (nuevoEstado === "Rechazado") {
    claseBadge = "bg-danger";
  } else if (nuevoEstado === "En espera de documentos") {
    claseBadge = "bg-info text-dark";
  }

  celdaEstado.innerHTML = `<span class="badge ${claseBadge}">${nuevoEstado}</span>`;
  alert("El estado de la solicitud se actualizó en la tabla.");
}



function manejarVerFila(fila) {
  const alumno = fila.cells[0]?.innerText || "Alumno";
  const curp = fila.cells[1]?.innerText || "";
  const tipo = fila.cells[2]?.innerText || "";
  const estado = fila.cells[3]?.innerText || "";
  const fecha = fila.cells[4]?.innerText || "";
  const modulo = fila.cells[5]?.innerText || "";

  alert(
    "Detalle rápido de la solicitud:\n\n" +
    `Alumno: ${alumno}\n` +
    `CURP: ${curp}\n` +
    `Tipo de trámite: ${tipo}\n` +
    `Estado: ${estado}\n` +
    `Fecha de solicitud: ${fecha}\n` +
    `Ciudad / Módulo: ${modulo}`
  );
}

function guardarSolicitudEnEdicion(fila) {
  const alumno = fila.cells[0]?.innerText || "";
  const curp = fila.cells[1]?.innerText || "";
  const tipo = fila.cells[2]?.innerText || "";
  const estadoTexto = fila.cells[3]?.innerText.trim() || "";
  const fecha = fila.cells[4]?.innerText || "";
  const modulo = fila.cells[5]?.innerText || "";

  // Documentos según badges (si no tienes todas, puedes ajustar)
  const celdaDocs = fila.cells[6];
  const badges = celdaDocs ? celdaDocs.querySelectorAll("span.badge") : [];
  const docs = {
    constancia: "pendiente",
    identificacion: "pendiente",
    foto: "pendiente",
    curp: "pendiente",
    acta: "pendiente"
  };

  badges.forEach((badge) => {
    const texto = badge.innerText.toLowerCase();
    const aprobado = badge.classList.contains("bg-success");

    if (texto.includes("constancia")) {
      docs.constancia = aprobado ? "aprobado" : "rechazado";
    } else if (texto.includes("identificación")) {
      docs.identificacion = aprobado ? "aprobado" : "rechazado";
    } else if (texto.includes("foto")) {
      docs.foto = aprobado ? "aprobado" : "rechazado";
    } else if (texto.includes("curp")) {
      docs.curp = aprobado ? "aprobado" : "rechazado";
    } else if (texto.includes("acta")) {
      docs.acta = aprobado ? "aprobado" : "rechazado";
    }
  });

  const solicitud = {
    alumno,
    curp,
    tipoTramite: tipo,
    estadoTexto,
    fechaSolicitud: fecha,
    modulo,
    documentos: docs
    // Aquí podrías agregar más datos si luego los tienes en columnas ocultas
  };

  try {
    localStorage.setItem("unipass_solicitud_en_edicion", JSON.stringify(solicitud));
  } catch (err) {
    console.log("No se pudo guardar en localStorage", err);
  }
}
