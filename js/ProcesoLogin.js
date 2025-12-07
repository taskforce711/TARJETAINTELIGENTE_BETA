// ../js/ProcesoLogin.js

// este JS solo valida que correo y contraseña
// no vayan vacíos antes de permitir el acceso al perfil.

window.addEventListener("load", function () {
  manejarLoginUniPass();
});

function manejarLoginUniPass() {
  // Detectar el botón/link de ingresar al perfil
  const btnIngresar = document.querySelector(
    'a.btn.btn-primary.w-100.mt-3[href="../home/Perfil/Perfil.html"]'
  );
  if (!btnIngresar) return;

  const correo = document.getElementById("correo");
  const password = document.getElementById("password");

  function marcarError(input, tieneError) {
    if (!input) return;
    if (tieneError) {
      input.classList.add("is-invalid");
    } else {
      input.classList.remove("is-invalid");
    }
  }

  btnIngresar.addEventListener("click", function (e) {
    let hayError = false;

    if (!correo || !correo.value.trim()) {
      hayError = true;
      marcarError(correo, true);
    } else {
      marcarError(correo, false);
    }

    if (!password || !password.value.trim()) {
      hayError = true;
      marcarError(password, true);
    } else {
      marcarError(password, false);
    }

    if (hayError) {
      e.preventDefault();
      alert("Por favor ingresa tu correo y tu contraseña para acceder a UniPass.");
      return;
    }


    // Aquí en un sistema real se comprobarían las credenciales con el servidor.
    // Por ahora solo dejamos pasar a la página de perfil si ambos campos tienen algo.
  });
}
