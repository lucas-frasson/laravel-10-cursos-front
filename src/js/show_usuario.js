// Abrir modal Editar Usuário
$(document).on('click', '#show_usuario', function () {
    var modal = $("#edit-modal");
  
    $("#edit-modal").removeClass("hidden");

    // Pegando id do usuario
    var id_usuario = $(this).attr('data-id');
    $('#hidden_id_usuario').val(id_usuario);

    // Pegando token do localStorage
    var TOKEN = localStorage.getItem("userToken");

    $.ajax({
        url: 'http://localhost:8000/usuarios/' + id_usuario,
        type: 'get',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + TOKEN },
        beforeSend: function () {
        //   console.log('ajax...');
          $("#loading").removeClass("hidden");
        },
      })
      .done(function (msg) {

        $("#loading").addClass("hidden");
  
        // console.log(msg);

        var { id, name, email, type } = msg.data;

        $('#edit-nome-usuario').val(name);
        $('#edit-email-usuario').val(email);
        $('#edit-tipo-usuario').val(type);
    })
    .fail(function (jqXHR, textStatus, msg) {

        $("#loading").addClass("hidden");

        console.log('Erro');

        // Mensagem de erro
        Swal.fire({
            title: 'Erro',
            text: 'Erro ao exibir usuário!',
            icon: 'error',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#581C87'
        })
    })
  
    modal.show();
});

// Fechar modal Editar usuario
$(document).on('click', '#close_show_usuario', function () {
    var modal = $("#edit-modal");
  
    $("#edit-modal").addClass("hidden");

    // Limpar borda dos inputs
    $('#edit-nome-usuario').css('border-color', '#ced4da');
    $('#edit-email-usuario').css('border-color', '#ced4da');
    $('#edit-tipo-usuario').css('border-color', '#ced4da');

    modal.hide();
});

