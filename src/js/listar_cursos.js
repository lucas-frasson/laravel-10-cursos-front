var objeto = new Object();
var json = JSON.stringify(objeto);

function listarCursos() {
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

      var text = "";

      while (x < qtd) {
        var conteudo = msg.data[x];
        var id = conteudo.id;
        var nome = conteudo.nome;
        var plataforma = conteudo.plataforma;
        var data_inicio = conteudo.data_inicio;
        var data_fim = conteudo.data_fim;
        var status = conteudo.status;

        if(data_fim == null) {
          data_fim = '-';
        }

        var status = status == 'c' ? 'Cursando' : 'Finalizado';

        text += "<tr class='flex flex-col flex-no wrap sm:table-row mb-5 sm:mb-0 bg-white hover:bg-gray-200'>";
				text += "<td class='border-grey-light p-3'>"+ nome +"</td>";
				text +=	"<td class='border-grey-light p-3'>"+ plataforma +"</td>";
        text +=	"<td class='border-grey-light p-3'>"+ data_inicio +"</td>";
        text +=	"<td class='border-grey-light p-3'>"+ data_fim +"</td>";
        text +=	"<td class='border-grey-light p-3'>"+ status +"</p></td>";
				text +=	"<td class='border-grey-light p-3 flex gap-4 text-xl'>";
        text +=	"<i class='fa-solid fa-pen-to-square cursor-pointer text-neutral-700 hover:text-neutral-900'></i>";
        text +=	"<i class='fa-solid fa-trash text-red-600 hover:text-red-700 cursor-pointer'></i>";
        text +=	"</td>";
        text += "</tr>";
        x++;
      }

      document.getElementById("listar_cursos").innerHTML = text;
    })
    .fail(function (jqXHR, textStatus, msg) {

      // $('.load').css("display", "none");

      var text = "Nenhum registro consultado...";

      document.getElementById("listar_cursos").innerHTML = text;

      console.log('Erro ao listar cursos');
    })
}
listarCursos()