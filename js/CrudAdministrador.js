// ../../js/CrudAdministrador.js

window.addEventListener("load", function () {
  manejarCrudSolicitudes();
});

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
      manejarEliminarFila(fila);
    } else if (textoBoton === "Cambiar estado") {
      manejarCambiarEstado(fila);
    } else if (textoBoton === "Editar") {
      manejarEditarFila(fila);
    } else if (textoBoton === "Ver") {
      manejarVerFila(fila);
    }
  });
}

function manejarEliminarFila(fila) {
  const nombreAlumno = fila.cells[0]?.innerText || "este registro";
  const deseaEliminar = confirm(`¿Seguro que deseas eliminar la solicitud de ${nombreAlumno}?`);
  if (!deseaEliminar) return;

  const cuerpo = fila.parentNode;
  cuerpo.removeChild(fila);
  alert("La solicitud ha sido eliminada de la tabla (solo a nivel visual).");
}

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
