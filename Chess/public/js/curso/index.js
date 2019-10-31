/**
 * Initialize all tooltips on a page.
 * (c) https://getbootstrap.com/docs/4.0/components/tooltips
 */
$(function initializeTooltips() {
  $('[data-toggle="tooltip"]').tooltip();
});


$('.delete-curso').click(function onClickDelete() {
  $('#delete-curso-confirma').data('id', $(this).data('cursoId'));
  $('#delete-curso-confirma').data('name', $(this).data('cursoName'));

  $('#curso-name').html($('#delete-curso-confirma').data('name'));

  $('#modal-delete').modal('show');
});

$('#delete-curso-confirma').click(function onClickConfirmDelete() {
  const csrfToken = $('meta[name="csrf-token"]').attr('content');
  const id = $('#delete-curso-confirma').data('id');
  const hideModal = () => $('#modal-delete').modal('hide');

  $.ajax({
    method: 'DELETE',
    url: '/cursos/remove',
    headers: {
      'CSRF-Token': csrfToken,
    },
    data: {
      id,
    },
    success(data) {
      console.info(data);
      $(`#row-curso-${id}`).remove();
      hideModal();
    },
    error(jqXHR, textStatus) {
      console.error(textStatus, jqXHR);
    },
    statusCode: {
      403() {
        hideModal();
        alert('Acesso negado, CSRF Token inválido!');
      },
    },
  });
});
