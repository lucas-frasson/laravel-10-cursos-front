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
        alert('Preencha todos os campos antes de enviar a requisição.');
    } else {

    // Se nenhum campo estiver vazio, criar o objeto e fazer a requisição AJAX
    var objeto = {
        nome: curso,
        plataforma: plataforma,
        data_inicio: data_inicio
    };

    // Transformando objeto em json
    var json = JSON.stringify(objeto);

    $.ajax({
        url: 'http://localhost:8000/cursos',
        type: 'post',
        // headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + TOKEN },
        headers: {'Content-Type': 'application/json'},
        data: json,
        beforeSend: function () {
            // $('.load').css("display", "flex");
        },
    })
        .done(function (msg) {

            // $('.load').css("display", "none");

            console.log(msg);

            $('#curso').val('');
            $('#plataforma').val('');
            $('#data_inicio').val('');

            var modal = $("#create-modal");
  
            modal.hide();

            listarCursos();

            // var text = "Inversor cadastrado com sucesso!";

            // document.getElementById("jmalerta").innerHTML = text;

            // $('.jmalerta').css("background-color", "rgba(36, 70, 4, 0.8)");
            // $('.jmalerta').css("display", "block");

            // setTimeout(() => {
            //     $('.jmalerta').css("display", "none");
            // }, 2000)

        })
        .fail(function (jqXHR, textStatus, msg) {

            // $('.load').css("display", "none");

            console.log('Erro');

        //     var text = "Erro ao cadastrar inversor!";

        //     document.getElementById("jmalerta").innerHTML = text;

        //     $('.jmalerta').css("background-color", "rgba(158, 8, 8, 0.8)");
        //     $('.jmalerta').css("display", "block");

        //     setTimeout(() => {
        //         $('.jmalerta').css("display", "none");
        //     }, 2000)
        })
    }
});
