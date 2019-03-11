$(() => {
  $('.project')
    .on('mouseenter', ({ currentTarget: $this }) => {
      const name = $($this).attr('name');

      if (!name) return;

      $(`#img-${name.replace(/[^\w]/g, '')}`).removeClass('invisible');
    })
    .on('mouseleave', ({ currentTarget: $this }) =>  {
      const name = $($this).attr('name');

      if (!name) return;

      $(`#img-${name.replace(/[^\w]/g, '')}`).addClass('invisible');
    });
});
