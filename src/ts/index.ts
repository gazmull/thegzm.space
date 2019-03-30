$(() => {
  $('.project')
    .on('mouseenter', function () {
      const name = $(this).attr('name');

      if (!name) return;

      $(`#img-${name.replace(/[^\w]/g, '')}`).removeClass('invisible');
    })
    .on('mouseleave', function () {
      const name = $(this).attr('name');

      if (!name) return;

      $(`#img-${name.replace(/[^\w]/g, '')}`).addClass('invisible');
    });
});
