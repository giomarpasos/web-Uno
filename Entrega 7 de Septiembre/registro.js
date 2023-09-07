const registroForm = document.getElementById('registro-form');

registroForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const nuevoUsuario = document.getElementById('nuevo-usuario').value;
    const nuevaContrasena = document.getElementById('nueva-contrasena').value;

    localStorage.setItem('usuario', nuevoUsuario);
    localStorage.setItem('contrasena', nuevaContrasena);

    console.log('Usuario registrado:', nuevoUsuario);

    window.location.href = '../login/login.html';

});
