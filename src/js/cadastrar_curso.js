// Abrir modal Cadastrar Curso
$(document).on('click', '#novo_curso', function () {
    var modal = $("#create-modal");
  
    $("#create-modal").removeClass("hidden");

    modal.show();
});

// Fechar modal Cadastrar Curso
$(document).on('click', '#close_novo_curso', function () {
    var modal = $("#create-modal");
  
    $("#create-modal").addClass("hidden");

    // Limpar campos
    $('#curso').val('');
    $('#plataforma').val('');
    $('#data_inicio').val('');

    // Limpar borda dos inputs
    $('#curso').css('border-color', '#ced4da');
    $('#plataforma').css('border-color', '#ced4da');
    $('#data_inicio').css('border-color', '#ced4da');
  
    modal.hide();
});

// Cadastrar Curso
$(document).on('click', '#cadastrar_curso', function () {
    var curso = $('#curso').val();
    var plataforma = $('#plataforma').val();
    var data_inicio = $('#data_inicio').val();

    // Verificar se algum dos campos está vazio
    if (curso.trim() === '' || plataforma.trim() === '' || data_inicio.trim() === ''){

        // Mensagem de alerta
        Swal.fire({
            title: 'Atenção',
            text: 'Preencha todos os campos!',
            icon: 'info',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#581C87'
        });

        // Pintar borda dos inputs #curso, #plataforma e #data_inicio de vermelho se estiverem vazios
        if (curso.trim() === ''){
            $('#curso').css('border-color','red');
        }

        if (plataforma.trim() === ''){
            $('#plataforma').css('border-color','red');
        }

        if (data_inicio.trim() === ''){
            $('#data_inicio').css('border-color','red');
        }

    } else {

    // Pegar email do localStorage
    var email = localStorage.getItem("userEmail");

    // Se nenhum campo estiver vazio, criar o objeto e fazer a requisição AJAX
    var objeto = {
        email: email,
        nome: curso,
        plataforma: plataforma,
        data_inicio: data_inicio
    };

    // Transformando objeto em json
    var json = JSON.stringify(objeto);

    // Pegando token do localStorage
    var TOKEN = localStorage.getItem("userToken");

    $.ajax({
        url: 'http://localhost:8000/cursos',
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
            $('#curso').val('');
            $('#plataforma').val('');
            $('#data_inicio').val('');

            var modal = $("#create-modal");
  
            modal.hide();

            // Mensagem de sucesso
            Swal.fire({
                title: 'Sucesso',
                text: 'Curso cadastrado com sucesso!',
                icon:'success',
                confirmButtonText: 'Ok',
                confirmButtonColor: '#581C87'
            })

            listarCursos();

        })
        .fail(function (jqXHR, textStatus, msg) {

            $("#loading").addClass("hidden");

            console.log('Erro');
            console.log(msg);

            // Verificando se o status http code é 422
            if (jqXHR.status === 422) {
                var response = JSON.parse(jqXHR.responseText);
                // Mensagem de erro se já existir um curso com o mesmo nome
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
                    text: 'Erro ao cadastrar curso!',
                    icon: 'error',
                    confirmButtonText: 'Ok',
                    confirmButtonColor: '#581C87'
                });
            }
        })
    }
});
