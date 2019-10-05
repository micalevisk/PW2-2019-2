/* eslint-env browser, jquery */
/* eslint-disable prefer-arrow-callback */

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
  const id = $('#delete-curso-confirma').data('id');
  const csrfToken = $('meta[name="csrf-token"]').attr('content');

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
      $('#modal-delete').modal('hide');
      $(`#row-curso-${id}`).remove();
      console.info(data);
    },
  });
});
