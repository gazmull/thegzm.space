$(() => {
  const anchor = /(#.+)$/.exec(window.location.href);

  if (anchor)
    $(`.project${anchor[1]}`).css({ border: '#FF00AE 1px solid' });

  $('.project')
    .on('mouseenter', function () {
      const id = `#${this.id}`;

      $(`${id} .card-img-overlay`).addClass('hovered');
      $(`${id} img`).addClass('hovered');
    })
    .on('mouseleave', function () {
      const id = `#${this.id}`;

      $(`${id} .card-img-overlay`).removeClass('hovered');
      $(`${id} img`).removeClass('hovered');
    });
});
