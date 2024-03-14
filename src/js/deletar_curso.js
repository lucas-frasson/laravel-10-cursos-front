// Abrir modal Deletar curso
$(document).on('click', '#deletar_curso', function () {
    var modal = $("#delete-modal");
  
    $("#delete-modal").removeClass("hidden");

    // Pegando id do curso
    var id_curso = $(this).attr('data-id');
    $('#hidden_delete_id_curso').val(id_curso);
  
    modal.show();
});

// Fechar modal Deletar curso
$(document).on('click', '#close_deletar_curso', function () {
    var modal = $("#delete-modal");
  
    $("#delete-modal").addClass("hidden");
  
    modal.hide();
});

// Deletar Curso
$(document).on('click', '#destroy_curso', function () {

    var id_curso = $('#hidden_delete_id_curso').val();

    // Pegando token do localStorage
    var TOKEN = localStorage.getItem("userToken");

    $.ajax({
        url: 'http://localhost:8000/cursos/' + id_curso,
        type: 'delete',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + TOKEN },
        data: json,
        beforeSend: function () {
            $("#loading").removeClass("hidden");
        },
    })
    .done(function (msg) {

        $("#loading").addClass("hidden");

        var modal = $("#edit-modal");
  
        $("#edit-modal").addClass("hidden");
    
        modal.hide();

        listarCursos();

        var text = "Curso excluído com sucesso!";

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

        var text = "Erro ao excluir curso!";

        $("#error_mensagem").html(text);

        // Mensagem de erro
        $("#error").removeClass("hidden");

        setTimeout(() => {
            $("#error").addClass("hidden");
        }, 3000)
    })
});
