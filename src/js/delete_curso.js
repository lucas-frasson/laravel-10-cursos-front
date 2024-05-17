$(document).on('click', '#deletar_curso', function (button) {

        // Pegando o id do curso
        var id_curso = this.getAttribute('data-delete-id');

        // Exibindo a mensagem de confirmação
        Swal.fire({
            title: 'Atenção',
            text: "Tem certeza de que deseja excluir este curso?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não'
        }).then((result) => {
            if (result.isConfirmed) {

                // Pegando token do localStorage
                var TOKEN = localStorage.getItem("userToken");

                $.ajax({
                    url: 'http://localhost:8000/delete_curso/' + id_curso,
                    type: 'get',
                    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + TOKEN },
                    beforeSend: function () {
                        $("#loading").removeClass("hidden");
                    },
                })
                .done(function (msg) {

                    $("#loading").addClass("hidden");

                    // Mensagem de sucesso
                    Swal.fire({
                        title: 'Sucesso',
                        text: 'Curso excluído com sucesso!',
                        icon: 'success',
                        confirmButtonText: 'Ok',
                        confirmButtonColor: '#581C87'
                    })

                    listarCursos();

                })
                .fail(function (jqXHR, textStatus, msg) {

                    $("#loading").addClass("hidden");

                    console.log('Erro');
                    console.log(msg);

                    // Mensagem de erro
                    Swal.fire({
                        title: 'Erro',
                        text: 'Erro ao excluir curso!',
                        icon: 'error',
                        confirmButtonText: 'Ok',
                        confirmButtonColor: '#581C87'
                    })
                })
            }
        })
})