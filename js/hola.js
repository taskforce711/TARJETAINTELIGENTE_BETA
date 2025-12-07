window.addEventListener("load", function () {

    // 1. Seleccionar elementos
    const inputNombre = document.getElementById("nombre");
    const btnAgregar = document.getElementById("agregar");
    const btnEliminar = document.getElementById("eliminar");
    const lista = document.getElementById("lista");

    // 2. Evento para agregar usuario
    btnAgregar.addEventListener("click", function () {

        const nombre = inputNombre.value;

        // Validar
        if (nombre === "") {
            alert("Escribe un nombre");
            return;
        }

        // 3. Crear elemento
        const usuario = document.createElement("div");

        // 4. Agregar clase
        usuario.classList.add("usuario");

        // 5. Agregar texto interno
        usuario.innerText = nombre;

        // 6. Agregarlo a la página
        lista.appendChild(usuario);

        // Limpiar input
        inputNombre.value = "";
    });

    // 7. Evento para eliminar último usuario
    btnEliminar.addEventListener("click", function () {

        // Validar si hay elementos
        if (lista.lastElementChild === null) {
            alert("No hay usuarios para eliminar.");
            return;
        }

        // 8. Eliminar último usuario
        lista.removeChild(lista.lastElementChild);
    });

});
