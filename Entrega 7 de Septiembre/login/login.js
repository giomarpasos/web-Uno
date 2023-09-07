
const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const usuarioIngresado = document.getElementById('usuario').value;
    const contrasenaIngresada = document.getElementById('contrasena').value;


    const usuarioRegistrado = localStorage.getItem('usuario');
    const contrasenaRegistrada = localStorage.getItem('contrasena');
    console.log(usuarioRegistrado);
    console.log(contrasenaRegistrada);

    if (usuarioRegistrado === usuarioIngresado && contrasenaRegistrada === contrasenaIngresada) {
        console.log('Inicio de sesión exitoso');
        window.location.href = '../home/home.html';
    } else {
        console.error('Inicio de sesión fallido. Verifica tus credenciales.');
    }
});