let t=null;function o(t=!1){return function(){if(this.classList.contains("stahp"))return;const o=`#${this.id}`,a=(t?"remove":"add")+"Class";$(`${o} .card-img-overlay`)[a]("hovered"),$(`${o} img`)[a]("hovered")}}$(async()=>{await async function(t){return await Promise.all(t.map(function(){return new Promise(t=>{const o=this.getAttribute("data-src");if(!o)return t(!0);const a=new Image;a.src=o,a.onload=(()=>(this.setAttribute("src",o),t(!0))),a.onerror=(()=>(this.setAttribute("alt","Could not load the image."),t(!0)))})})),$(".container-fluid").addClass("animated popOut")}($(".container-fluid img")),$("#toggle").on("click",function(){$("#toggle span").toggleClass("activated"),setTimeout(()=>$("nav .content").toggleClass("activated"),512)}),$("#about-toggler, #about-dialog-btn").on("click",function(){const t=$(".container-fluid");t.find("content .row:first").toggleClass("about-toggled"),t.find("#about").toggleClass("about-toggled")}),$(".project").on("mouseenter",o()).on("mouseleave",o(!0)),$(".modal").on("show.bs.modal",function(o){t||(t=$(o.relatedTarget)),t.addClass("stahp");const a=t.data(),e=projects[a.prop][a.index],n=$(this),i=/^https?:\/\//.test(e.img)?e.img:`/assets/img/${e.img}`,s=e.stack.filter((t,o,a)=>a.indexOf(t)===o),d=t=>["<ul>",e.names.map((o,a)=>`<li><a href="${e.urls[a][t]}" target="_blank">${o}</a></li>`).join(""),"</ul>"].join("");n.find(".modal-title").text(e.names.join(" / ")),n.find(".modal-background img").attr({src:i}),n.find(".modal-body p").html([e.description,"<br><br>",e.ready?"":' <span class="badge badge-danger">NOT AVAILABLE</span>',s.map(t=>`<span class="badge badge-secondary">${t}</span>`).join(" ")].join(" ")),n.find(".modal-body-home").html(d("home")),n.find(".modal-body-docs").html(d("docs")),n.find(".modal-dialog").addClass("invisible"),setTimeout(()=>n.find(".modal-dialog").attr("class","modal-dialog modal-dialog-centered animated popOut"),256)}).on("hide.bs.modal",function(){const o=$(this);o.find(".modal-dialog").attr("class","modal-dialog modal-dialog-centered animated popIn");const a=t;t=null,setTimeout(()=>{a.removeClass("stahp"),$(`#${a[0].id} .card-img-overlay`).removeClass("hovered"),$(`#${a[0].id} img`).removeClass("hovered")},512)});const a=/(#.+)$/.exec(window.location.href);a&&(t=$(`.project${a[1]}`),setTimeout(()=>$(".modal").modal("show"),1e3))});