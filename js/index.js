var t=this&&this.__awaiter||function(t,e,o,a){return new(o||(o=Promise))(function(i,n){function s(t){try{l(a.next(t))}catch(t){n(t)}}function d(t){try{l(a.throw(t))}catch(t){n(t)}}function l(t){t.done?i(t.value):new o(function(e){e(t.value)}).then(s,d)}l((a=a.apply(t,e||[])).next())})};$(()=>t(this,void 0,void 0,function*(){let e=null;yield function(e){return t(this,void 0,void 0,function*(){return yield Promise.all(e.map(function(){return new Promise(t=>{const e=this.getAttribute("data-src");if(!e)return t(!0);const o=new Image;o.src=e,o.onload=(()=>(this.setAttribute("src",e),t(!0))),o.onerror=(()=>(this.setAttribute("alt","Could not load the image."),t(!0)))})})),$(".container-fluid").addClass("animated popOut")})}($(".container-fluid img")),$(".project").on("mouseenter",function(){if(this.classList.contains("stahp"))return;const t=`#${this.id}`;$(`${t} .card-img-overlay`).addClass("hovered"),$(`${t} img`).addClass("hovered")}).on("mouseleave",function(){if(this.classList.contains("stahp"))return;const t=`#${this.id}`;$(`${t} .card-img-overlay`).removeClass("hovered"),$(`${t} img`).removeClass("hovered")}),$(".modal").on("show.bs.modal",function(t){e||(e=$(t.relatedTarget)),e.addClass("stahp");const o=e.data(),a=projects[o.prop][o.index],i=$(this),n=/^https?:\/\//.test(a.img)?a.img:`/assets/img/${a.img}`,s=a.stack.filter((t,e,o)=>o.indexOf(t)===e),d=t=>["<ul>",a.names.map((e,o)=>`<li><a href="${a.urls[o][t]}" target="_blank">${e}</a></li>`).join(""),"</ul>"].join("");i.find(".modal-title").text(a.names.join(" / ")),i.find(".modal-background img").attr({src:n}),i.find(".modal-body p").html([a.description,"<br><br>",a.ready?"":' <span class="badge badge-danger">NOT AVAILABLE</span>',s.map(t=>`<span class="badge badge-secondary">${t}</span>`).join(" ")].join(" ")),i.find(".modal-body-home").html(d("home")),i.find(".modal-body-docs").html(d("docs")),i.find(".modal-dialog").addClass("invisible"),setTimeout(()=>i.find(".modal-dialog").attr("class","modal-dialog modal-dialog-centered animated popOut"),512)}).on("hide.bs.modal",function(){$(this).find(".modal-dialog").attr("class","modal-dialog modal-dialog-centered animated popIn"),setTimeout(()=>{e.removeClass("stahp"),$(`#${e[0].id} .card-img-overlay`).removeClass("hovered"),$(`#${e[0].id} img`).removeClass("hovered"),e=null},512)});const o=/(#.+)$/.exec(window.location.href);o&&(e=$(`.project${o[1]}`),setTimeout(()=>$(".modal").modal("show"),1e3))}));