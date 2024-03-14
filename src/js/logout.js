$(document).on('click', '#logout', function () {

    // Pegando token do localStorage
    var TOKEN = localStorage.getItem("userToken");
    
    $.ajax({
        url: 'http://localhost:8000/logout/',
        type: 'post',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + TOKEN },
        beforeSend: function () {
            $("#loading").removeClass("hidden");
        },
    })
    .done(function (msg) {

        $("#loading").addClass("hidden");

        localStorage.removeItem("userEmail");
        // localStorage.removeItem("userNome");
        localStorage.removeItem("userToken");

        window.location.href = "../login/";

    })
    .fail(function (jqXHR, textStatus, msg) {

        $("#loading").addClass("hidden");

        console.log('Erro');

        var text = "Erro ao deslogar!";

        $("#error_mensagem").html(text);

        // Mensagem de erro
        $("#error").removeClass("hidden");

        setTimeout(() => {
            $("#error").addClass("hidden");
        }, 3000)
    })
});
