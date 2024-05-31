// Abrir modal Editar curso
$(document).on('click', '#show_curso', function () {
    var modal = $("#edit-modal");
  
    $("#edit-modal").removeClass("hidden");

    // Pegando id do curso
    var id_curso = $(this).attr('data-id');
    $('#hidden_id_curso').val(id_curso);

    // Pegando token do localStorage
    var TOKEN = localStorage.getItem("userToken");

    $.ajax({
        url: 'http://localhost:8000/cursos/' + id_curso,
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

        var { id, nome, plataforma, data_inicio, data_fim, status } = msg.data;

        // Função que formata as datas para colocar no input
        function formatarData(data) {

            if (data === null) {
                return null; // Retorna null se a data for nula
            }

            var partes = data.split('/');
            return new Date(partes[2], partes[1] - 1, partes[0]).toISOString().split('T')[0];
        }

        var data_inicio_formatada = formatarData(data_inicio);
        var data_fim_formatada = formatarData(data_fim);

        $('#edit-curso').val(nome);
        $('#edit-plataforma').val(plataforma);
        $('#edit-data_inicio').val(data_inicio_formatada);
        $('#edit-data_fim').val(data_fim_formatada);
        $('#edit-status').val(status);
    })
    .fail(function (jqXHR, textStatus, msg) {

        $("#loading").addClass("hidden");

        console.log('Erro');

        // Mensagem de erro
        Swal.fire({
            title: 'Erro',
            text: 'Erro ao exibir curso!',
            icon: 'error',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#581C87'
        })
    })
  
    modal.show();
});

// Fechar modal Editar curso
$(document).on('click', '#close_show_curso', function () {
    var modal = $("#edit-modal");
  
    $("#edit-modal").addClass("hidden");

    // Limpar borda dos inputs
    $('#edit-curso').css('border-color', '#ced4da');
    $('#edit-plataforma').css('border-color', '#ced4da');
    $('#edit-data_inicio').css('border-color', '#ced4da');
    $('#edit-data_fim').css('border-color', '#ced4da');

    modal.hide();
});

