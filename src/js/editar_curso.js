// Editar Curso
$(document).on('click', '#editar_curso', function () {
    var id_curso = $('#hidden_id_curso').val();
    var curso = $('#edit-curso').val();
    var plataforma = $('#edit-plataforma').val();
    var data_inicio = $('#edit-data_inicio').val();
    var data_fim = $('#edit-data_fim').val();

    // Verificar se algum dos campos está vazio
    if (curso.trim() === '' || plataforma.trim() === '' || data_inicio.trim() === ''){

        var text = "Preencha todos os campos!";

        $("#alert_mensagem").html(text);

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
        data_inicio: data_inicio,
        data_fim: data_fim
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

        listarCursos();

        var text = "Curso editado com sucesso!";

        $("#success_mensagem").html(text);

        // Mensagem de sucesso
        $("#success").removeClass("hidden");

        setTimeout(() => {
            $("#success").addClass("hidden");
        }, 3000)

    })
    .fail(function (jqXHR, textStatus, msg) {

        $("#loading").addClass("hidden");

        console.log('Erro');

        var text = "Erro ao editar curso!";

        $("#error_mensagem").html(text);

        // Mensagem de erro
        $("#error").removeClass("hidden");

        setTimeout(() => {
            $("#error").addClass("hidden");
        }, 3000)
    })
    }
})
