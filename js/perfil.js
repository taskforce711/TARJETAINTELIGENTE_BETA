
  window.addEventListener("load", function () {

    //Acciones botones
    const renovacion= this.document.getElementById("renovacion");
    const nuevaTarjeta= this.document.getElementById("nuevaTarjeta");

    renovacion.addEventListener("click", function(){
        alert("Tu cita para renovacion será generada y enviada a tu correo. Si no recibes tu cita, contáctanos.")
    })
    nuevaTarjeta.addEventListener("click", function(){
        alert("Tu cita para solicitar una nueva tarjeta será generada y enviada a tu correo. Si no recibes tu cita, contáctanos.")
    })
    

    // Mostrar/ocultar la sección del QR dentro del perfil
    const btnVerQr = document.getElementById("btnVerQr");
    const qrSection = document.getElementById("qrSection");

    if (!btnVerQr || !qrSection) return;

    btnVerQr.addEventListener("click", function () {
      qrSection.classList.toggle("d-none");
    });
  });