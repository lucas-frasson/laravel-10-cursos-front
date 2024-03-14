$(document).ready(function() {
    // Verificar se o token do usuário está presente no localStorage
    var userToken = localStorage.getItem('userToken');

    if (!userToken) {
        // Se o token não estiver presente, deslogue o usuário
        deslogarUsuario();
    }

    function deslogarUsuario() {
        // Redirecionar usuário para a página de login
        window.location.href = "../login/";
    }
});