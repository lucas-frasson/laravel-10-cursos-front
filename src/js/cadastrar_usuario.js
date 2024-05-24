// Abrir modal Cadastrar Usuário
$(document).on('click', '#novo_usuario', function () {
    var modal = $("#create-modal");
  
    $("#create-modal").removeClass("hidden");

    modal.show();
});

// Fechar modal Cadastrar Usuário
$(document).on('click', '#close_novo_usuario', function () {
    var modal = $("#create-modal");
  
    $("#create-modal").addClass("hidden");

    // Limpar campos
    $('#nome_usuario').val('');
    $('#email_usuario').val('');
    $('#tipo_usuario').val('cliente');

    // Limpar borda dos inputs
    $('#nome_usuario').css('border-color', '#ced4da');
    $('#email_usuario').css('border-color', '#ced4da');
    $('#tipo_usuario').css('border-color', '#ced4da');
  
    modal.hide();
});

// Cadastrar Usuário
$(document).on('click', '#cadastrar_usuario', function () {
    var nome_usuario = $('#nome_usuario').val();
    var email_usuario = $('#email_usuario').val();
    // var tipo_usuario = $('#tipo_usuario').val();

    // Verificar se algum dos campos está vazio
    if (nome_usuario.trim() === '' || email_usuario.trim() === ''){

        // Mensagem de alerta
        Swal.fire({
            title: 'Atenção',
            text: 'Preencha todos os campos!',
            icon: 'info',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#581C87'
        });

        // Pintar borda dos inputs #nome_usuario e #email_usuario de vermelho se estiverem vazios
        if (nome_usuario.trim() === ''){
            $('#nome_usuario').css('border-color','red');
        }

        if (email_usuario.trim() === ''){
            $('#email_usuario').css('border-color','red');
        }

        // if (tipo_usuario.trim() === ''){
        //     $('#tipo_usuario').css('border-color','red');
        // }
    } else {

        // Pegar email do localStorage
        // var email = localStorage.getItem("userEmail");
    
        // Se nenhum campo estiver vazio, criar o objeto e fazer a requisição AJAX
        var objeto = {
            // email: email,
            name: nome_usuario,
            email: email_usuario,
            // tipo: tipo_usuario
        };
    
        // Transformando objeto em json
        var json = JSON.stringify(objeto);
    
        // Pegando token do localStorage
        var TOKEN = localStorage.getItem("userToken");
    
        $.ajax({
            url: 'http://localhost:8000/usuarios',
            type: 'post',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + TOKEN },
            data: json,
            beforeSend: function () {
                $("#loading").removeClass("hidden");
            },
        })
            .done(function (msg) {
    
                $("#loading").addClass("hidden");
    
                // console.log(msg);
    
                // Limpar campos
                $('#nome_usuario').val('');
                $('#email_usuario').val('');
                $('#tipo_usuario').val('cliente');
    
                var modal = $("#create-modal");
      
                modal.hide();
    
                // Mensagem de sucesso
                Swal.fire({
                    title: 'Sucesso',
                    text: 'Usuário cadastrado com sucesso!',
                    icon:'success',
                    confirmButtonText: 'Ok',
                    confirmButtonColor: '#581C87'
                })
    
                listarUsuarios();
    
            })
            .fail(function (jqXHR, textStatus, msg) {
    
                $("#loading").addClass("hidden");
    
                console.log('Erro');
                console.log(msg);
                console.log(jqXHR);
    
                // Verificando se o status http code é 422
                if (jqXHR.status === 422) {
                    var response = JSON.parse(jqXHR.responseText);
                    // Mensagem de erro se já existir um usuário com o mesmo email
                    Swal.fire({
                        title: 'Erro',
                        text: response.error,
                        icon: 'error',
                        confirmButtonText: 'Ok',
                        confirmButtonColor: '#581C87'
                    });
                } else {
                    // Trata outros possíveis erros
                    Swal.fire({
                        title: 'Erro',
                        text: 'Erro ao cadastrar usuário! Verifique as informações digitadas!',
                        icon: 'error',
                        confirmButtonText: 'Ok',
                        confirmButtonColor: '#581C87'
                    });
                }
            })
        }
});
