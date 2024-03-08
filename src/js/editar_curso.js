// Abrir modal Editar curso
$(document).on('click', '#editar_curso', function () {
    var modal = $("#edit-modal");
  
    $("#edit-modal").removeClass("hidden");
  
    modal.show();
});

// Fechar modal Editar curso
$(document).on('click', '#close_editar_curso', function () {
    var modal = $("#edit-modal");
  
    $("#edit-modal").addClass("hidden");
  
    modal.hide();
});