import { IData, IProject } from './declarations';

declare const projects: {
  [key: string]: IProject[];
};

$(() => {
  let relatedTarget: JQuery<HTMLElement> = null;

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

  $('.modal')
    .on('show.bs.modal', function (e) {
      if (!relatedTarget) relatedTarget = $(e.relatedTarget);

      const data = relatedTarget.data() as IData;
      const project = projects[data.prop][data.index];
      const modal = $(this);
      const src = /^https?:\/\//.test(project.img) ? project.img : `/assets/img/${project.img}`;
      const linkify = (prop: string) => [
        '<ul>',
        project.names
          .map((v, i) => `<li><a href="${project.urls[i][prop]}" target="_blank">${v}</a></li>`)
          .join(''),
        '</ul>',
      ].join('');

      modal.find('.modal-title').html([
        project.names.join(' / '),
        !project.ready ? ' <span class="badge badge-danger">NOT AVAILABLE' : '',
      ].join(''));
      modal.find('.modal-background img').attr({ src });
      modal.find('.modal-body p').text(project.description);
      modal.find('.modal-body-home').html(linkify('home'));
      modal.find('.modal-body-docs').html(linkify('docs'));

      modal.find('.modal-dialog')
          .attr('class', 'modal-dialog modal-dialog-centered animated popOut');

      setTimeout(() => relatedTarget.addClass('selected'), 400);
    })
    .on('hide.bs.modal', function () {
      const modal = $(this);

      modal.find('.modal-dialog')
        .attr('class', 'modal-dialog modal-dialog-centered animated popIn');

      setTimeout(() => {
        relatedTarget.removeClass('selected');

        relatedTarget = null;
      }, 400);
    });

  const matched = /(#.+)$/.exec(window.location.href);

  if (matched) {
    relatedTarget = $(`.project${matched[1]}`);

    $('.modal').modal('show');
  }
});
