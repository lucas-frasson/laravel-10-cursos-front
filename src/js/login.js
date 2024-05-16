$(document).on('click', '#login', function () {

    event.preventDefault();

    var email = $('#email').val();
    var password = $('#password').val();

    // Verificar se algum dos campos está vazio
    if (email.trim() === '' || password.trim() === ''){

        // Mensagem de alerta
        Swal.fire({
            title: 'Atenção',
            text: 'Preencha todos os campos!',
            icon: 'info',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#581C87'
        });

        // Pintar borda dos inputs email e password de vermelho
        if (email.trim() === ''){
            $('#email').css('border-color','red');
        } 

        if (password.trim() === ''){
            $('#password').css('border-color','red');
        }

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

            const TOKEN = (msg.token);
            
            localStorage.setItem("userEmail", email);
            // localStorage.setItem("userNome", nome);
            localStorage.setItem("userToken", TOKEN);

            window.location.href = "../cursos/";
        })
        .fail(function (jqXHR, textStatus, msg) {
    
            $("#loading").addClass("hidden");
    
            console.log('Erro');
    
            // Mensagem de erro
            Swal.fire({
                title: 'Erro',
                text: 'Erro ao realizar login!',
                icon: 'error',
                confirmButtonText: 'Ok',
                confirmButtonColor: '#581C87'
            })
        })
    }
});