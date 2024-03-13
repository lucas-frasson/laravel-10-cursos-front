$(document).on('click', '#login', function () {
    document.getElementById("login").addEventListener("click", function(event){
        event.preventDefault();
      });

    var email = $('#email').val();
    var password = $('#password').val();

    // Verificar se algum dos campos está vazio
    if (email.trim() === '' || password.trim() === ''){

        // Mensagem de alerta
        $("#alert").removeClass("hidden");

        setTimeout(() => {
            $("#alert").addClass("hidden");
        }, 3000)
    } else {

        // Device name
        var device_name = navigator.platform;

        // Se nenhum campo estiver vazio, criar o objeto e fazer a requisição AJAX
        var objeto = {
            email: email,
            password: password,
            device_name: device_name
        };

        // Transformando objeto em json
        var json = JSON.stringify(objeto);

        $.ajax({
            url: 'http://localhost:8000/login/',
            type: 'post',
            headers: {'Content-Type': 'application/json'},
            data: json,
            beforeSend: function () {
                $("#loading").removeClass("hidden");
            },
        })
        .done(function (msg) {

            $("#loading").addClass("hidden");
    
            console.log(msg);

            // var conteudo = JSON.parse(msg);

            const TOKEN = msg;
            
            localStorage.setItem("userEmail", email);
            // localStorage.setItem("userNome", nome);
            localStorage.setItem("userToken", TOKEN);

            window.location.href = "../cursos/";
        })
        .fail(function (jqXHR, textStatus, msg) {
    
            $("#loading").addClass("hidden");
    
            console.log('Erro');
    
            // Mensagem de erro
            $("#error").removeClass("hidden");
    
            setTimeout(() => {
                $("#error").addClass("hidden");
            }, 3000)
        })
    }
});