function listarCursos() {

  // Pegar email do localStorage
  var email = localStorage.getItem("userEmail");

  // Cria objeto com o email do usuário
  var objeto = {
    email: email
  };

  // Transformando objeto em json
  var json = JSON.stringify(objeto);

  // Escondendo os modais
  $("#create-modal").addClass("hidden");
  $("#edit-modal").addClass("hidden");
  $("#delete-modal").addClass("hidden");

  // Pegando token do localStorage
  var TOKEN = localStorage.getItem("userToken");

  $.ajax({
    url: 'http://localhost:8000/cursos/index',
    type: 'post',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + TOKEN },
    data: json,
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

          // switch case status do curso
          switch(status){
            case 'c':
              status_texto = 'Cursando';
              cor = 'bg-red-500';
              break;
            case 'f':
              status_texto = 'Finalizado';
              cor = 'bg-green-500';
              break;
            case 'p':
              status_texto = 'Pausado';
              cor = 'bg-yellow-500';
              break;
            default:
              status_texto = 'Cursando';
              cor = 'bg-red-500';
              break;
          }

          tableRows.push(`
          <tr class='flex flex-col flex-no wrap sm:table-row mb-5 sm:mb-0 bg-white hover:bg-gray-200'>
              <td class='border-grey-light p-3'>${nome}</td>
              <td class='border-grey-light p-3'>${plataforma}</td>
              <td class='border-grey-light p-3'>${data_inicio}</td>
              <td class='border-grey-light p-3'>${data_fim}</td>
              <td class='border-grey-light p-3'><span class='${cor} rounded-md p-1'>${status_texto}</span></td>
              <td class='border-grey-light p-3 flex gap-4 text-xl'>
                  <i id='show_curso' data-id=${id} class='fa-solid fa-pen-to-square cursor-pointer text-neutral-500 hover:text-neutral-900'></i>
                  <i id='deletar_curso' data-delete-id=${id} class='fa-solid fa-trash text-red-600 hover:text-red-700 cursor-pointer btn_delete'></i>
              </td>
          </tr>`);
          x++;
      }

      var finalTable = tableRows.join('');

      $("#listar_cursos").html(finalTable);

      // Inicializar DataTables após carregar os dados
      $('#tabela_cursos').DataTable({
        "retrieve": true,
        "paging": false,
        "language": {
            "sEmptyTable": "Nenhum curso encontrado",
            "sInfo": "",
            "sInfoEmpty": "",
            "sInfoFiltered": "",
            "sInfoThousands": ".",
            "sLengthMenu": "_MENU_ resultados por página",
            "sLoadingRecords": "Carregando...",
            "sProcessing": "Processando...",
            "sZeroRecords": "Nenhum curso encontrado",
            "sSearch": "Pesquisar ",
            "oAria": {
                "sSortAscending": ": Ordenar colunas de forma ascendente",
                "sSortDescending": ": Ordenar colunas de forma descendente"
            },
            "select": {
                "rows": {
                    "_": "Selecionado %d linhas",
                    "0": "Nenhuma linha selecionada",
                    "1": "Selecionado 1 linha"
                }
            }
        }
      });
    })
    .fail(function (jqXHR, textStatus, msg) {

      $("#loading").addClass("hidden");
      
      var text = "Nenhum curso encontrado";

      $("#listar_cursos").html(text);

      console.log(msg);
      console.log('Erro ao listar cursos');
    })
}

// Listar cursos
listarCursos();
