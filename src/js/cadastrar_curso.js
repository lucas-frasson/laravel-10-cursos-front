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
        $("#alert").removeClass("hidden");

        setTimeout(() => {
            $("#alert").addClass("hidden");
        }, 3000)
    } else {

    // Se nenhum campo estiver vazio, criar o objeto e fazer a requisição AJAX
    var objeto = {
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

            $('#curso').val('');
            $('#plataforma').val('');
            $('#data_inicio').val('');

            var modal = $("#create-modal");
  
            modal.hide();

            listarCursos();

            // Mensagem de sucesso
            $("#success").removeClass("hidden");

            setTimeout(() => {
                $("#success").addClass("hidden");
            }, 3000)

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
