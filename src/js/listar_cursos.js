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
      $('.load').css("display", "flex");
    },
  })
    .done(function (msg) {

      $('.load').css("display", "none");

      console.log(msg);

      var conteudo = msg;

      var conteudo = JSON.parse(msg);

      console.log(conteudo.data);

      var qtd = Object.keys(conteudo).length;

      var x = 0;

      var text = "";

      while (x < qtd) {
        var id = conteudo[x].id;
        var nome = conteudo[x].nome;
        var plataforma = conteudo[x].plataforma;
        var data_inicio = conteudo[x].data_inicio;
        var data_fim = conteudo[x].data_fim;
        var status = conteudo[x].status;
        
        text += "<tr>";
        text += "<input type='hidden' id='uc_hidden' value="+uc+">";
        text += "<td class='texto_tabela_esquerda'>" + grupo + "</td>";
        text += "<td class='texto_tabela_esquerda'>" + unidade + "</td>";
        text += "<td class='texto_tabela_centro' id='nome_usuario" + x + "'>" + potencia + "</td>";
        text += "<td class='img_tabela'><a class='btn-primary' data-bs-toggle='modal' data-bs-target='#exampleModal4'><img src='../src/img/editar-codigo.png' alt='editar' data-editar-inversor='" + id + "' data-bs-toggle='tooltip' data-bs-placement='left' id='editar_inversor' data-bs-title='Editar'></a></td>";
        text += "<td class='tabela_tabela' id='tabela_tabela'><a class='btn-primary' data-bs-toggle='modal' data-bs-target='#exampleModal2'> <img src='../src/img/excluir.png' alt='excluir' data-excluir-inversor='" + id + "' data-bs-toggle='tooltip' data-bs-placement='left' id='excluir_inversor' data-bs-title='Excluir'></a></td>";
        text += "</tr>";
        x++;
      }

      document.getElementById("listar_cursos").innerHTML = text;
    })
    .fail(function (jqXHR, textStatus, msg) {

      $('.load').css("display", "none");

      var text = "Nenhum registro consultado...";

      document.getElementById("listar_cursos").innerHTML = text;

      console.log('Erro ao listar cursos');
    })
}
listarCursos()