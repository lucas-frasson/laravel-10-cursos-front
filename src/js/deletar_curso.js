// Abrir modal Deletar curso
$(document).on('click', '#deletar_curso', function () {
    var modal = $("#delete-modal");
  
    $("#delete-modal").removeClass("hidden");
  
    modal.show();
});

// Fechar modal Deletar curso
$(document).on('click', '#close_deletar_curso', function () {
    var modal = $("#delete-modal");
  
    $("#delete-modal").addClass("hidden");
  
    modal.hide();
});
