import { IData, IProject } from './declarations';

declare const projects: {
  [key: string]: IProject[];
};

$(() => {
  let relatedTarget: JQuery<HTMLElement> = null;

  $('.project')
    .on('mouseenter', function () {
      if (this.classList.contains('stahp')) return;

      const id = `#${this.id}`;

      $(`${id} .card-img-overlay`).addClass('hovered');
      $(`${id} img`).addClass('hovered');
    })
    .on('mouseleave', function () {
      if (this.classList.contains('stahp')) return;

      const id = `#${this.id}`;

      $(`${id} .card-img-overlay`).removeClass('hovered');
      $(`${id} img`).removeClass('hovered');
    });

  $('.modal')
  .on('show.bs.modal', function (e) {
    if (!relatedTarget) relatedTarget = $(e.relatedTarget);

    relatedTarget.addClass('stahp');

    const data = relatedTarget.data() as IData;
    const project = projects[data.prop][data.index];
    const modal = $(this);
    const src = /^https?:\/\//.test(project.img) ? project.img : `/assets/img/${project.img}`;
    const cleanedLangs = project.stack.filter((v, i, arr) => arr.indexOf(v) === i);
    const linkify = (prop: string) => [
      '<ul>',
      project.names
        .map((v, i) => `<li><a href="${project.urls[i][prop]}" target="_blank">${v}</a></li>`)
        .join(''),
      '</ul>',
    ].join('');

    modal.find('.modal-title').text(project.names.join(' / '));
    modal.find('.modal-background img').attr({ src });
    modal.find('.modal-body p').html([
      project.description,
      '<br><br>',
      !project.ready ? ' <span class="badge badge-danger">NOT AVAILABLE</span>' : '',
      cleanedLangs.map(v => `<span class="badge badge-secondary">${v}</span>`).join(' '),
    ].join(' '));
    modal.find('.modal-body-home').html(linkify('home'));
    modal.find('.modal-body-docs').html(linkify('docs'));

    modal.find('.modal-dialog')
        .attr('class', 'modal-dialog modal-dialog-centered animated popOut');

    setTimeout(() => {
      $(`#${relatedTarget[0].id} .card-img-overlay`).addClass('hovered');
      $(`#${relatedTarget[0].id} img`).addClass('hovered');
    }, 400);
  })
  .on('hide.bs.modal', function () {
    const modal = $(this);

    modal.find('.modal-dialog')
      .attr('class', 'modal-dialog modal-dialog-centered animated popIn');

    setTimeout(() => {
      relatedTarget.removeClass('stahp');
      $(`#${relatedTarget[0].id} .card-img-overlay`).removeClass('hovered');
      $(`#${relatedTarget[0].id} img`).removeClass('hovered');

      relatedTarget = null;
    }, 400);
  });

  const matched = /(#.+)$/.exec(window.location.href);

  if (matched) {
    relatedTarget = $(`.project${matched[1]}`);

    $('.modal').modal('show');
  }
});
