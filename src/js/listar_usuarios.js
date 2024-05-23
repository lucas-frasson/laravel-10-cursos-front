function listarUsuarios() {

  // Escondendo os modais
  $("#create-modal").addClass("hidden");
  $("#edit-modal").addClass("hidden");
  $("#delete-modal").addClass("hidden");

  // Pegando token do localStorage
  var TOKEN = localStorage.getItem("userToken");

  $.ajax({
    url: 'http://localhost:8000/usuarios/',
    type: 'get',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + TOKEN },
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
          var { id, name, email } = msg.data[x];

          tableRows.push(`
          <tr class='flex flex-col flex-no wrap sm:table-row mb-5 sm:mb-0 bg-white hover:bg-gray-200'>
              <td class='border-grey-light p-3'>${name}</td>
              <td class='border-grey-light p-3'>${email}</td>
              <td class='border-grey-light p-3 flex gap-4 text-xl'>
                  <i id='show_usuario' data-id=${id} class='fa-solid fa-pen-to-square cursor-pointer text-neutral-500 hover:text-neutral-900'></i>
                  <i id='deletar_usuario' data-delete-id=${id} class='fa-solid fa-trash text-red-600 hover:text-red-700 cursor-pointer btn_delete'></i>
              </td>
          </tr>`);
          x++;
      }

      var finalTable = tableRows.join('');

      $("#listar_usuarios").html(finalTable);

      // Inicializar DataTables após carregar os dados
      $('#tabela_usuarios').DataTable({
        "retrieve": true,
        "paging": false,
        "language": {
            "sEmptyTable": "Nenhum usuário encontrado",
            "sInfo": "",
            "sInfoEmpty": "",
            "sInfoFiltered": "",
            "sInfoThousands": ".",
            "sLengthMenu": "_MENU_ resultados por página",
            "sLoadingRecords": "Carregando...",
            "sProcessing": "Processando...",
            "sZeroRecords": "Nenhum usuário encontrado",
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
      
      var text = "Nenhum usuário encontrado";

      $("#listar_usuarios").html(text);

      console.log(msg);
      console.log('Erro ao listar usuários');
    })
}

// Listar usuários
listarUsuarios();
