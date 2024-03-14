var objeto = new Object();
var json = JSON.stringify(objeto);

function listarCursos() {

  $("#create-modal").addClass("hidden");
  $("#edit-modal").addClass("hidden");
  $("#delete-modal").addClass("hidden");

  // Pegando token do localStorage
  var TOKEN = localStorage.getItem("userToken");

  $.ajax({
    url: 'http://localhost:8000/cursos',
    type: 'get',
    headers: { 'Authorization': 'Bearer ' + TOKEN },
    beforeSend: function () {
      console.log('ajax...');
      $("#loading").removeClass("hidden");
    },
  })
    .done(function (msg) {

      $("#loading").addClass("hidden");

      // console.log(msg);

      var qtd = (msg.data).length;

      var x = 0;
      var tableRows = []; // Array para armazenar todas as linhas da tabela

      while (x < qtd) {
          var { id, nome, plataforma, data_inicio, data_fim, status } = msg.data[x];

          data_fim = data_fim == null ? '-' : data_fim;
          var status_texto = status == 'c' ? 'Cursando' : 'Finalizado';
          var cor = status == 'c' ? 'bg-red-500' : 'bg-green-500';

          tableRows.push(`
          <tr class='flex flex-col flex-no wrap sm:table-row mb-5 sm:mb-0 bg-white hover:bg-gray-200'>
              <td class='border-grey-light p-3'>${nome}</td>
              <td class='border-grey-light p-3'>${plataforma}</td>
              <td class='border-grey-light p-3'>${data_inicio}</td>
              <td class='border-grey-light p-3'>${data_fim}</td>
              <td class='border-grey-light p-3'><span class='${cor} rounded-md p-1'>${status_texto}</span></td>
              <td class='border-grey-light p-3 flex gap-4 text-xl'>
                  <i id='show_curso' data-id=${id} class='fa-solid fa-pen-to-square cursor-pointer text-neutral-500 hover:text-neutral-900'></i>
                  <i id='deletar_curso' data-id=${id} class='fa-solid fa-trash text-red-600 hover:text-red-700 cursor-pointer'></i>
              </td>
          </tr>`);
          x++;
      }

      var finalTable = tableRows.join('');

      $("#listar_cursos").html(finalTable);
    })
    .fail(function (jqXHR, textStatus, msg) {

      $("#loading").addClass("hidden");
      
      var text = "Nenhum curso encontrado";

      $("#listar_cursos").html(text);

      console.log('Erro ao listar cursos');
    })
}
listarCursos()
