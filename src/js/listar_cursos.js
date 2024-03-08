var objeto = new Object();
var json = JSON.stringify(objeto);

function listarCursos() {

  $("#edit-modal").addClass("hidden");
  $("#delete-modal").addClass("hidden");

  $.ajax({
    url: 'http://localhost:8000/cursos',
    type: 'get',
    // headers: { 'Authorization': 'Bearer ' + TOKEN },
    // data: json,
    beforeSend: function () {
      console.log('ajax...');
      // $('.load').css("display", "flex");
    },
  })
    .done(function (msg) {

      // $('.load').css("display", "none");

      console.log(msg);

      // var conteudo = JSON.parse(msg);

      var qtd = Object.keys(msg).length;

      var x = 0;

      while (x < qtd) {
        var { id, nome, plataforma, data_inicio, data_fim, status } = msg.data[x];

        data_fim = data_fim === null ? '-' : data_fim;

        status = status == 'c' ? 'Cursando' : 'Finalizado';

        text = `
        <tr class='flex flex-col flex-no wrap sm:table-row mb-5 sm:mb-0 bg-white hover:bg-gray-200'>
          <td class='border-grey-light p-3'>${nome}</td>
          <td class='border-grey-light p-3'>${plataforma}</td>
          <td class='border-grey-light p-3'>${data_inicio}</td>
          <td class='border-grey-light p-3'>${data_fim}</td>
          <td class='border-grey-light p-3'>${status}</td>
          <td class='border-grey-light p-3 flex gap-4 text-xl'>
            <i id='editar_curso' class='fa-solid fa-pen-to-square cursor-pointer text-neutral-700 hover:text-neutral-900'></i>
            <i id='deletar_curso' data-modal-target="delete-modal" data-modal-toggle="delete-modal" class='fa-solid fa-trash text-red-600 hover:text-red-700 cursor-pointer'></i>
          </td>
        </tr>`;
        x++;
      }

      $("#listar_cursos").html(text);
    })
    .fail(function (jqXHR, textStatus, msg) {

      // $('.load').css("display", "none");

      var text = "Nenhum registro consultado...";

      $("#listar_cursos").html(text);

      console.log('Erro ao listar cursos');
    })
}
listarCursos()
