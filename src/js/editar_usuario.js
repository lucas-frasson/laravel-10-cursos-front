// Editar Usuário
$(document).on('click', '#editar_usuario', function () {
    var id_usuario = $('#hidden_id_usuario').val();
    var name = $('#edit-nome-usuario').val();
    var email = $('#edit-email-usuario').val();
    var tipo = $('#edit-tipo-usuario').val();

    // Verificar se algum dos campos está vazio
    if (name.trim() === '' || email.trim() === '' || tipo.trim() === ''){

        // Mensagem de alerta
        Swal.fire({
            title: 'Atenção',
            text: 'Preencha todos os campos obrigatórios!',
            icon: 'info',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#581C87'
        });

        // Pintar borda dos inputs curso, plataforma e data_inicio de vermelho se estiverem vazios
        if (name.trim() === '') {
            $('#edit-nome-usuario').css('border-color','red');
        }
        if (email.trim() === '') {
            $('#edit-email-usuario').css('border-color','red');
        }
        if (tipo.trim() === '') {
            $('#edit-tipo-usuario').css('border-color','red');
        }
    } else {

        // Pegar email do localStorage
        var email_usuario = localStorage.getItem("userEmail");

        // Se nenhum campo estiver vazio, criar o objeto e fazer a requisição AJAX
        var objeto = {
            email_usuario: email_usuario,
            name: name,
            email: email,
            type: tipo,
        };

        // Transformando objeto em json
        var json = JSON.stringify(objeto);

        // Pegando token do localStorage
        var TOKEN = localStorage.getItem("userToken");

        $.ajax({
            url: 'http://localhost:8000/update_usuario/' + id_usuario,
            type: 'post',
            data: json,
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + TOKEN },
            beforeSend: function () {
                $("#loading").removeClass("hidden");
            },
        })
        .done(function (msg) {

            $("#loading").addClass("hidden");

            // console.log(msg);

            var modal = $("#edit-modal");
    
            $("#edit-modal").addClass("hidden");
        
            modal.hide();

            // Mensagem de sucesso
            Swal.fire({
                title: 'Sucesso',
                text: 'Usuário editado com sucesso!',
                icon: 'success',
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
                    text: 'Erro ao editar usuário! Verifique as informações digitadas!',
                    icon: 'error',
                    confirmButtonText: 'Ok',
                    confirmButtonColor: '#581C87'
                });
            }
        })
    }
})
