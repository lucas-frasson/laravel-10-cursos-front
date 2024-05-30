function verificaAdmin() {

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
    url: 'http://localhost:8000/verifica_admin',
    type: 'post',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + TOKEN },
    data: json,
    beforeSend: function () {
      console.log('ajax...');
      // $("#loading").removeClass("hidden");
    },
  })
   .done(function (msg) {
    
      if (msg == 200) {
        $("#link-usuarios").css("display", "block");
      }

    })
    .fail(function (jqXHR, textStatus, msg) {

      // console.log(msg);

    });
}

// Função para verificar se o usuário é admin
verificaAdmin();