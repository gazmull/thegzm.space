import { ModalEventHandler } from 'bootstrap';
import { IData, IProject } from './declarations';

declare var projects: Readonly<{ [key: string]: IProject[] }>;
let relatedTarget: JQuery<HTMLElement> = null;

$(async () => {
  await readyImages($('.container-fluid img'));

  $('#toggle')
    .on('click', handleNavClick());
  $('#about-toggler, #about-dialog-btn') // Mobile only
    .on('click', handleAboutClick());
  $('.project')
    .on('mouseenter', handleCardHover())
    .on('mouseleave', handleCardHover(true));
  $('.modal')
    .on('show.bs.modal', handleModalShow())
    .on('hide.bs.modal', handleModalHide());

  const matched = /(#.+)$/.exec(window.location.href);

  if (matched) {
    relatedTarget = $(`.project${matched[1]}`);

    setTimeout(() => $('.modal').modal('show'), 1000);
  }
});

async function readyImages (images: JQuery<HTMLElement>) {
  await Promise.all(images.map(
    function () {
      return new Promise(res => {
        const src = this.getAttribute('data-src');

        if (!src) return res(true);

        const img = new Image();
        img.src = src;
        img.onload = () => {
          this.setAttribute('src', src);

          return res(true);
        };
        img.onerror = () => {
          this.setAttribute('alt', 'Could not load the image.');

          return res(true);
        };
      });
    }
  ));

  return $('.container-fluid').addClass('animated popOut');
}

function handleNavClick (): (this: HTMLElement) => void {
  return function () {
    $('#toggle span').toggleClass('activated');

    setTimeout(() =>
      $('nav .content').toggleClass('activated')
    , 512);
  };
}

function handleAboutClick (): (this: HTMLElement) => void {
  return function () {
    const container = $('.container-fluid');

    container.find('content .row:first').toggleClass('about-toggled');
    container.find('#about').toggleClass('about-toggled');
  };
}

function handleCardHover (remove = false): (this: HTMLElement) => void {
  return function () {
    if (this.classList.contains('stahp')) return;

    const id = `#${this.id}`;
    const method = (remove ? 'remove' : 'add') + 'Class';

    $(`${id} .card-img-overlay`)[method]('hovered');
    $(`${id} img`)[method]('hovered');
  };
}

function handleModalShow (): (this: HTMLElement, e: ModalEventHandler<HTMLElement>) => void {
  return function (e) {
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
    modal.find('.modal-dialog').addClass('invisible');

    setTimeout(() =>
      modal.find('.modal-dialog')
          .attr('class', 'modal-dialog modal-dialog-centered animated popOut')
    , 256);
  };
}

function handleModalHide (): (this: HTMLElement, e: ModalEventHandler<HTMLElement>) => void {
  return function () {
    const modal = $(this);

    modal.find('.modal-dialog')
      .attr('class', 'modal-dialog modal-dialog-centered animated popIn');

    const temp = relatedTarget;
    relatedTarget = null;

    setTimeout(() => {
      temp.removeClass('stahp');
      $(`#${temp[0].id} .card-img-overlay`).removeClass('hovered');
      $(`#${temp[0].id} img`).removeClass('hovered');
    }, 512);
  };
}
