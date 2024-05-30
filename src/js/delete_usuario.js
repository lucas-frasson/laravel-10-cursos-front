$(document).on('click', '#deletar_usuario', function (button) {

        // Pegando o id do usuario
        var id_usuario = this.getAttribute('data-delete-id');

        // Exibindo a mensagem de confirmação
        Swal.fire({
            title: 'Atenção',
            text: "Tem certeza de que deseja excluir este usuário?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não'
        }).then((result) => {
            if (result.isConfirmed) {

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
                    url: 'http://localhost:8000/delete_usuario/' + id_usuario,
                    type: 'post',
                    data: json,
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
        }
    })
})