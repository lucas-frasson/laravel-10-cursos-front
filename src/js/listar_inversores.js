var objeto = new Object();
var json = JSON.stringify(objeto);

function listarInversores() {
  $.ajax({
    url: '../app/api/InversoresListar.php',
    type: 'post',
    headers: { 'Authorization': 'Bearer ' + TOKEN },
    data: json,
    beforeSend: function () {
      console.log('ajax...');
      $('.load').css("display", "flex");

    },
  })
    .done(function (msg) {

      $('.load').css("display", "none");

      // retorno ok

      console.log(msg);

      var conteudo = msg;

      // var conteudo = JSON.parse(msg);

      // console.log(dadosAPI1);

      // console.log(Object.keys(dadosAPI1).length);

      var qtd = Object.keys(conteudo).length;

      var x = 0;

      var text = "";

      while (x < qtd) {
        var id = conteudo[x].id;
        var uc = conteudo[x].uc;
        var grupo = conteudo[x].grupo;
        var unidade = conteudo[x].unidade;
        var potencia = conteudo[x].potencia;
        
        text += "<tr>";
        text+= "<input type='hidden' id='uc_hidden' value="+uc+">";
        text += "<td class='texto_tabela_esquerda'>" + grupo + "</td>";
        text += "<td class='texto_tabela_esquerda'>" + unidade + "</td>";
        text += "<td class='texto_tabela_centro' id='nome_usuario" + x + "'>" + potencia + "</td>";
        text += "<td class='img_tabela'><a class='btn-primary' data-bs-toggle='modal' data-bs-target='#exampleModal4'><img src='../src/img/editar-codigo.png' alt='editar' data-editar-inversor='" + id + "' data-bs-toggle='tooltip' data-bs-placement='left' id='editar_inversor' data-bs-title='Editar'></a></td>";
        text += "<td class='tabela_tabela' id='tabela_tabela'><a class='btn-primary' data-bs-toggle='modal' data-bs-target='#exampleModal2'> <img src='../src/img/excluir.png' alt='excluir' data-excluir-inversor='" + id + "' data-bs-toggle='tooltip' data-bs-placement='left' id='excluir_inversor' data-bs-title='Excluir'></a></td>";
        text += "</tr>";
        x++;
      }

      var text1 = qtd + " usuário(s) consultado(s)...";

      document.getElementById("listar_inversores").innerHTML = text;
      document.getElementById("qtd_inversores").innerHTML = text1;
    })
    .fail(function (jqXHR, textStatus, msg) {

      $('.load').css("display", "none");

      var text = "";

      var text1 = "Nenhum registro consultado...";

      document.getElementById("listar_inversores").innerHTML = text;
      document.getElementById("qtd_inversores").innerHTML = text1;

      console.log('Erro ao listar inversores');
    })
}
listarInversores()