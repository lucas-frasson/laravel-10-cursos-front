// Editar Curso
$(document).on('click', '#editar_curso', function () {
    var id_curso = $('#hidden_id_curso').val();
    var curso = $('#edit-curso').val();
    var plataforma = $('#edit-plataforma').val();
    var data_inicio = $('#edit-data_inicio').val();
    var data_fim = $('#edit-data_fim').val();
    var status = $('#edit-status').val();

    // Verificar se algum dos campos está vazio
    if (curso.trim() === '' || plataforma.trim() === '' || status.trim() === '' || data_inicio.trim() === ''){

        // Mensagem de alerta
        Swal.fire({
            title: 'Atenção',
            text: 'Preencha todos os campos obrigatórios!',
            icon: 'info',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#581C87'
        });

        // Pintar borda dos inputs curso, plataforma e data_inicio de vermelho se estiverem vazios
        if (curso.trim() === '') {
            $('#edit-curso').css('border-color','red');
        }
        if (plataforma.trim() === '') {
            $('#edit-plataforma').css('border-color','red');
        }
        if (status.trim() === '') {
            $('#edit-status').css('border-color','red');
        }
        if (data_inicio.trim() === '') {
            $('#edit-data_inicio').css('border-color','red');
        }
    } else {

        if(status == 'f' && data_fim == ''){
            Swal.fire({
                title: 'Atenção',
                text: 'Informe a data fim do curso!',
                icon: 'info',
                confirmButtonText: 'Ok',
                confirmButtonColor: '#581C87'
            });

            $('#edit-data_fim').css('border-color','red');

            return false;
        }

        // Se nenhum campo estiver vazio, criar o objeto e fazer a requisição AJAX
        var objeto = {
            nome: curso,
            plataforma: plataforma,
            data_inicio: data_inicio,
            data_fim: data_fim,
            status: status,
        };

        // Transformando objeto em json
        var json = JSON.stringify(objeto);

        // Pegando token do localStorage
        var TOKEN = localStorage.getItem("userToken");

        $.ajax({
            url: 'http://localhost:8000/cursos/' + id_curso,
            type: 'patch',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + TOKEN },
            data: json,
            beforeSend: function () {
                $("#loading").removeClass("hidden");
            },
        })
        .done(function (msg) {

            $("#loading").addClass("hidden");

            console.log(msg);

            var modal = $("#edit-modal");
    
            $("#edit-modal").addClass("hidden");
        
            modal.hide();

            // Mensagem de sucesso
            Swal.fire({
                title: 'Sucesso',
                text: 'Curso editado com sucesso!',
                icon: 'success',
                confirmButtonText: 'Ok',
                confirmButtonColor: '#581C87'
            })

            // Limpar borda do input edit-data_fim
            $('#edit-data_fim').css('border-color', '#ced4da');

            listarCursos();

        })
        .fail(function (jqXHR, textStatus, msg) {

            $("#loading").addClass("hidden");

            console.log('Erro');
            console.log(msg);

            // Mensagem de erro
            Swal.fire({
                title: 'Erro',
                text: 'Erro ao editar curso!',
                icon: 'error',
                confirmButtonText: 'Ok',
                confirmButtonColor: '#581C87'
            })
        })
    }
})
