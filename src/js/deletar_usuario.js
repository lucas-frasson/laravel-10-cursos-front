// Abrir modal Deletar Usuário
$(document).on('click', '#deletar_usuario', function () {
    var modal = $("#delete-modal");
  
    $("#delete-modal").removeClass("hidden");

    // Pegando id do curso
    var id_usuario = $(this).attr('data-delete-id');
    $('#hidden_delete_id_usuario').val(id_usuario);
  
    modal.show();
});

// Fechar modal Deletar Usuário
$(document).on('click', '#close_deletar_usuario', function () {
    var modal = $("#delete-modal");
  
    $("#delete-modal").addClass("hidden");
  
    modal.hide();
});

// Deletar Usuário
$(document).on('click', '#destroy_usuario', function () {

    var id_usuario = $('#hidden_delete_id_usuario').val();

    // Pegar email do localStorage
    var email = localStorage.getItem("userEmail");

    // Cria objeto com o email do usuário
    var objeto = {
        email: email,
    };

    // Transformando objeto em json
    var json = JSON.stringify(objeto);

    // Pegando token do localStorage
    var TOKEN = localStorage.getItem("userToken");

    $.ajax({
        url: 'http://localhost:8000/destroy_usuario/' + id_usuario,
        type: 'post',
        data: json,
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + TOKEN },
        beforeSend: function () {
            $("#loading").removeClass("hidden");
        },
    })
    .done(function (msg) {

        $("#loading").addClass("hidden");

        var modal = $("#edit-modal");
  
        $("#edit-modal").addClass("hidden");
    
        modal.hide();

        // Mensagem de sucesso
        Swal.fire({
            title: 'Sucesso',
            text: 'Usuário excluído com sucesso!',
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

        // Mensagem de erro
        Swal.fire({
            title: 'Erro',
            text: 'Erro ao excluir usuário!',
            icon: 'error',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#581C87'
        })
    })
});
