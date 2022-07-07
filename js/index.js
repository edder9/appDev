let jsonDatas;
let jsonDataRepInfo;
let jsonAtribuciones;
let jsonMapa;
//alert(location.host)

//window.screen.orientation
//    .lock("landscape-primary")
//    .then(
//        success => console.log(success),
//        failure => console.log(failure)
//    )
//
//
//
//
//window.addEventListener("orientationchange", function(){
//  console.log(screen.orientation.type); // e.g. portrait
//
//  console.log(screen);
//});
//
//screen.orientation.lock('landscape');

//SPLASH
$(document).ready(function () {
// var anchor = location;
// var result = anchor.pathname;
//
// if (result != "/") {
//   location.pathname = "/";
// }
  
  //$('#exampleModal').modal('show');

  document.getElementById("optionsDiv2").style.display = "none";
  document.getElementById("tablaDatos").style.marginTop = "none";

  $(".loader-wrapper").addClass("is-active");
  $("body").fadeIn(800);
  /*NAVIgation*/
  ocultarMapa();
  $(".item").click(function () {
    $(".item").removeClass("activeBtn");
    $(this).addClass("activeBtn");
  });

  /*FIN*/
  $(".navbar").css("display", "none");
  $("#menu").css("display", "none");

  setTimeout(function () {
    $(".loader-wrapper").removeClass("is-active");
    $(".navbar").css("display", "block");
    $("#menu").css("display", "block");
  }, 4000);
  //FIN SPLASH

  setTimeout(() => {
    //CARDS BULMA
    $("#server").click(function () {
      $("#server-content").toggleClass("is-hidden");
    });
    //FIN CARDS BULMA

    //Load JSON
    $.getJSON(
      //"https://raw.githubusercontent.com/edder9/app/main/index.json",
      "json/index.json",
      function (json) {
        jsonDatas = json;
      }
    );

    $.getJSON(
      //"https://raw.githubusercontent.com/edder9/app/main/index.json",
      "json/reporteInfo.json",
      function (json) {
        jsonDataRepInfo = json;
        console.log(jsonDataRepInfo);
      }
    );

    $.getJSON(
      //"https://raw.githubusercontent.com/edder9/app/main/index.json",
      "json/atribuciones.json",
      function (json) {
        jsonAtribuciones = json;
        console.log(jsonAtribuciones);
      }
    );

    $.getJSON(
      //"https://raw.githubusercontent.com/edder9/app/main/index.json",
      "json/mapa.json",
      function (json) {
        jsonMapa = json;
        console.log(jsonMapa);
      }
    );

    page("/", index);
    //page("*", notFound);
    page("/buscar", buscar);
    page("/info", informacionACD);
    page("/mapa", mapa);
    page("/mapa/:id/", mapaDireccion);
    page("/tramites", tramites);
    page("/atribuciones", atribuciones);
    page("/atribuciones/:tema/:id", atribucionesTema);
    page("/dependencias", dependencias);
    //page("/dependencias/:urs/", urs);
    page("/dependencias/:id", idDependenciaDet);
    page("/dependencias/:id/:detalle", detalleDependencia);
    page("/dependencias/:id/:detalle/:temas", dependenciaTemas);
    page("/temas", temas);
    page("/temas/:id/", temasDetalle);
    page("/temas/:id/:sadt", temasDetSADT);
    page("/temas/:id/:sadt/:idSelect", temasSelect);
    page("/apoyos", tramites);
    page("/servicios", tramites);
    page("/reporte", reporte);
    page("/reporte/:detalle", detalleReportes);
    page("/informacion", informacion);
    page("/informacion/:sistemas", informacionSistemas);

    page();
    //FIN LOAD JSON
  }, 2500);
});

function reporte(ctx) {
  
  $("#menu").html("");
  muestraRegresa();
  //$("#menu").css("display", "block");
  escondeMapa();
  escondeFiltro();
  $("section").css("padding", "5rem 0.5rem 5rem");
  console.log(ctx);
  $( "#menu" ).scrollTop(0);
  document.getElementById("tituloNav").innerHTML =
    "REPORTE CIUDADANO";

  // const contenedorReporte = document.createElement("div");
  // contenedorReporte.classList = "is-fluid";
  // contenedorReporte.style.marginTop = "3em";
  //
  // $("#menu").append(contenedorReporte);
  //
  // const DivContainerReporte = document.createElement("div");
  // DivContainerReporte.classList = "";
  //
  // $("#menu").append(DivContainerReporte);

  const DBReporte = TAFFY(jsonDataRepInfo);

  const reporteTotal = DBReporte({ tipo: "reporteAMC" }).get();

  for (let i = 0; i < reporteTotal.length; i++) {
    const elemento = reporteTotal[i];

    // const botonesURS = document.createElement("a");
    // botonesURS.classList = "button";
    // botonesURS.id = elemento.tipo;
    // botonesURS.innerHTML =
    //   `<div class="is-mobile"><img src="` +
    //   elemento.img +
    //   `"><p class=""is-small>` +
    //   elemento.titulo +
    //   `</p></div>`;
    // botonesURS.href = ctx.path + "/" + elemento.id;
    // //  crearHref.appendChild(botonesURS);
    // DivContainerReporte.appendChild(botonesURS);

    $("#menu").append(
      `
   
    <a  class="fadeInUp is-mobile" id="` +
        elemento.id +
        `" href="` +
        ctx.pathname +
        "/" +
        elemento.id +
        `"><div class="row btnMReporte is-flex-tablet-only"><div class="col-4 col4BckDenMenu"><img class="imgTemasSizeRep" src="` +
        elemento.img +
        `"></div><div class="col-8 centerTxt">` +
        elemento.titulo +
        `</div></div></a>
  
    `
    );
  }
}

function detalleReportes(ctx) {
  console.log(ctx);
  escondeMapa();
  $("#menu").css("display", "block");
  document.getElementById("tituloNav").innerHTML =
    "REPORTE CIUDADANO";
  escondeFiltro();
  $("section").css("padding", "4rem 1.2rem");
  $("#menu").html("");
  $( "#menu" ).scrollTop(0);
  const DBReporte = TAFFY(jsonDataRepInfo);

  const reporteTotal = DBReporte({ id: ctx.params.detalle }).get();

  console.log(reporteTotal);
  const createheaderImg = document.createElement("figure");
  createheaderImg.classList = "image";
  createheaderImg.style = "display: flex;justify-content: center;";

  const ImgReporte = document.createElement("img");
  ImgReporte.src = reporteTotal[0].imgbck;
  ImgReporte.classList = "imgDep";

  //$("#menu").append(createheaderImg);
  //$("#menu").append(`<p>` + reporteTotal[0].describe + `</p>`);
  $("#menu").append(`
  <div class="card fadeInUp">
  <div class="">
    <div class="content">
    
    <img class="imgDep" src="`+reporteTotal[0].imgbck+`">
<br>
  <div class="col-md-12" style="padding:10px">` + reporteTotal[0].describe + `</div>
    </div>
  </div>
</div>
  `)

  if ((reporteTotal[0].id == "reporteCiudadano")) {
    $("#menu").append(
      `<div class="fadeInUp card accordion accordion-flush" id="accordionFlushExample">
      <div class="accordion-item">
        <h2 class="accordion-header" id="flush-headingOne">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
            ¿Qué puedes denunciar?
          </button>
        </h2>
        <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
          <div class="accordion-body">
          ` +
        reporteTotal[0].queReportar +
        `
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="flush-headingTwo">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
            Requisitos
          </button>
        </h2>
        <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
          <div class="accordion-body">
          ` +
        reporteTotal[0].requisitos +
        `
          </div>
        </div>
      </div>
    </div>`
    );

    $("#menu").append(`
    <div class="card fadeInUp">
    <div class="card-content">
      <div class="content">
      
      <div class="row">
      <div class="col-2"><span class="material-icons">&#xe157;</span></div>
     <div class="col-10"> Denuncia a través de la página de internet de la <a target="_blank" href="` +
        reporteTotal[0].link +
        `">` +
        reporteTotal[0].tituloCorto +
        `</a></div></div><br>

        <div class="row">
      <div class="col-2"><span class="material-icons">&#xe0b0;</span></div>
     <div class="col-10">A través del número <a href='tel:` +
        reporteTotal[0].telefono +
        `' class='disable-link' cm_dontconvertlink"> 800 PROFEPA (7763372)</a>. Recuerda que en este caso, tienes 3 días hábiles para ratificar tu denuncia.</div></div><br>
    

        <div class="row">
      <div class="col-2"><span class="material-icons">&#xe158;</span></div>
     <div class="col-10">Por correo electrónico <a href='mailto:` +
        reporteTotal[0].correo +
        `' class='disable-link' cm_dontconvertlink"> denuncias@profepa.gob.mx</a></div></div><br>

        <div class="row">
        <div class="col-2"><span class="material-icons">&#xe0c8;</span></div>
       <div class="col-10">En oficinas centrales ubicadas en <a href='/mapa/` +
          reporteTotal[0].id_map +
          `' class='disable-link' cm_dontconvertlink"> ` +
          reporteTotal[0].direccion +
          `</a></div></div><br>

      </div>
    </div>
  </div>
    `)
    /*$("#menu").append(
      `<div class="row">
      <div class="col-2"><span class="material-icons">&#xe157;</span></div>
     <div class="col-10"> Denuncia a través de la página de internet de la <a target="_blank" href="` +
        reporteTotal[0].link +
        `">` +
        reporteTotal[0].tituloCorto +
        `</a></div></div><br>`
    );*/
    /*$("#menu").append(
      `<div class="row">
      <div class="col-2"><span class="material-icons">&#xe0b0;</span></div>
     <div class="col-10">A través del número <a href='tel:` +
        reporteTotal[0].telefono +
        `' class='disable-link' cm_dontconvertlink"> 800 PROFEPA (7763372)</a>. Recuerda que en este caso, tienes 3 días hábiles para ratificar tu denuncia.</div></div><br>`
    );*/

   /* $("#menu").append(
      `<div class="row">
      <div class="col-2"><span class="material-icons">&#xe158;</span></div>
     <div class="col-10">Por correo electrónico <a href='mailto:` +
        reporteTotal[0].correo +
        `' class='disable-link' cm_dontconvertlink"> denuncias@profepa.gob.mx</a></div></div><br>`
    );*/

    /*$("#menu").append(
      `<div class="row">
      <div class="col-2"><span class="material-icons">&#xe0c8;</span></div>
     <div class="col-10">En oficinas centrales ubicadas en <a href='/mapa/` +
        reporteTotal[0].id_map +
        `' class='disable-link' cm_dontconvertlink"> ` +
        reporteTotal[0].direccion +
        `</a></div></div><br>`
    );*/

    //console.log(document.getElementById("viewDiv"));
  } else if((reporteTotal[0].id == "denunciaPopular")) {
    $("#menu").append(
      `<div class="card fadeInUp accordion accordion-flush" id="accordionFlushExample">
      <div class="accordion-item">
        <h2 class="accordion-header" id="flush-headingOne">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
            ¿Qué puedes denunciar?
          </button>
        </h2>
        <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
          <div class="accordion-body">
          ` +
        reporteTotal[0].queReportar +
        `
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="flush-headingTwo">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
            Requisitos
          </button>
        </h2>
        <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
          <div class="accordion-body">
          ` +
        reporteTotal[0].requisitos +
        `
          </div>
        </div>
      </div>
    </div>`
    );

    $("#menu").append(`
    <div class="card fadeInUp">
    <div class="card-content">
      <div class="content">
      
      <div class="row">
      <div class="col-2"><span class="material-icons">&#xe157;</span></div>
     <div class="col-10"> Denuncia a través de la página de internet de la <a target="_blank" href="` +
        reporteTotal[0].link +
        `">` +
        reporteTotal[0].tituloCorto +
        `</a></div></div><br>
   

        <div class="row">
      <div class="col-2"><span class="material-icons">&#xe0b0;</span></div>
     <div class="col-10"><a href='tel:` +
        reporteTotal[0].telefono +
        `' class='disable-link' cm_dontconvertlink">`+reporteTotal[0].telefono+`</a></div></div><br>


        <div class="row">
      <div class="col-2"><span class="material-icons">&#xe1eb;</span></div>
     <div class="col-10">EMERGENCIAS (24 horas del día): <a href='tel:` +
        reporteTotal[0].emergencia +
        `' class='disable-link' cm_dontconvertlink">`+ reporteTotal[0].emergencia+`</a>.</div></div><br>


        <div class="row">
      <div class="col-2"><span class="material-icons">&#xe8df;</span></div>
      <div class="col-10"><p>`+reporteTotal[0].horarios+`</p></div></div><br>


      <div class="row">
      <div class="col-2"><span class="material-icons">&#xe0c8;</span></div>
     <div class="col-10">En oficinas centrales ubicadas en <a href='/mapa/` +
        reporteTotal[0].id_map +
        `' class='disable-link' cm_dontconvertlink"> ` +
        reporteTotal[0].direccion +
        `</a></div></div><br>

      </div>
    </div>
  </div>
    `)

    /*$("#menu").append(
      `<div class="row">
      <div class="col-2"><span class="material-icons">&#xe157;</span></div>
     <div class="col-10"> Denuncia a través de la página de internet de la <a target="_blank" href="` +
        reporteTotal[0].link +
        `">` +
        reporteTotal[0].tituloCorto +
        `</a></div></div><br>`
    );*/
    /*$("#menu").append(
      `<div class="row">
      <div class="col-2"><span class="material-icons">&#xe0b0;</span></div>
     <div class="col-10"><a href='tel:` +
        reporteTotal[0].telefono +
        `' class='disable-link' cm_dontconvertlink">`+reporteTotal[0].telefono+`</a></div></div><br>`
    );

    $("#menu").append(
      `<div class="row">
      <div class="col-2"><span class="material-icons">&#xe1eb;</span></div>
     <div class="col-10">EMERGENCIAS (24 horas del día): <a href='tel:` +
        reporteTotal[0].emergencia +
        `' class='disable-link' cm_dontconvertlink">`+ reporteTotal[0].emergencia+`</a>.</div></div><br>`
    );

    $("#menu").append(
      `<div class="row">
      <div class="col-2"><span class="material-icons">&#xe8df;</span></div>
      <div class="col-10"><p>`+reporteTotal[0].horarios+`</p></div></div><br>`
    );

    $("#menu").append(
      `<div class="row">
      <div class="col-2"><span class="material-icons">&#xe0c8;</span></div>
     <div class="col-10">En oficinas centrales ubicadas en <a href='/mapa/` +
        reporteTotal[0].id_map +
        `' class='disable-link' cm_dontconvertlink"> ` +
        reporteTotal[0].direccion +
        `</a></div></div><br>`
    );*/

  }else{
    $("#menu").append(
      `
      <div class="card fadeInUp">
      <div class="card-content">
        <div class="content">
        <div class=" row">
        <div class="col-2"><span class="material-icons">&#xe0b0;</span></div>
       <div class="col-10"><a href='tel:` +
          reporteTotal[0].telefono +
          `' class='disable-link' cm_dontconvertlink">` +
          reporteTotal[0].telefono +
          `</a></div></div>
          
        </div>
      </div>
    </div>
      `
    );

    
  }

  createheaderImg.append(ImgReporte);
  // contenedorReporte.append(createheaderImg)

  console.log(reporteTotal);
}

function informacion(ctx) {
  muestraRegresa();
  console.log(ctx);
  $("#menu").html("");
  document.getElementById("tituloNav").innerHTML = "INFORMACIÓN AMBIENTAL";
 
  let DivButtons = document.createElement("DIV");
  DivButtons.classList = "container"; //grids
  DivButtons.id = "btnGrid";
  DivButtons.style.marginTop = "10%";

  $("#menu").append(DivButtons);

  $("section").css("padding", "4rem 2.5rem 5rem");

  const DBtramites = TAFFY(jsonDatas);
  const dependenciasInfo = DBtramites({tipo:"UR"}).get();

  for (let i = 0; i < dependenciasInfo.length; i++) {
    const element = dependenciasInfo[i];

    $("#btnGrid").append(
      `
      
      <a class="containerDep fadeInUp snborder" id="` +
        element.id +
        `" href="` +
        ctx.pathname +
        "/" +
        element.id +
        `"><img class="imgDepsIA" src="` +
        element.img +
        `"></a>`
    );
  }
  
}

function informacionSistemas(ctx) {
  //alert("siisis");
  muestraRegresa();
  console.log(ctx.params.sistemas);
 
  $("section").css("padding", "4.5rem 0.5rem 5rem");

  $("#menu").html("");
  const DBReporteInfo = TAFFY(jsonDataRepInfo);
  const informacionTotal = DBReporteInfo({ id:ctx.params.sistemas }).get();
  console.log(informacionTotal);

  for (let i = 0; i < informacionTotal.length; i++) {
    const element = informacionTotal[i];
    $("#menu").append(
    `<a class="fadeInUp" id="`+element.id+`" href="` +
    element.link +
    `" target="_blank"><div class="row btnLink">
    <div class="col-4"><img class="imgTemasSize" src="` +
      element.img +
      `"></div>
   <div class="col-8"><p class="smaller">` +
      element.titulo +
      `</p></div></div></a>`
  );
  }
  $( "#menu" ).scrollTop(0);
}

function temas(ctx) {
  muestraRegresa();
  console.log(ctx);
  const DBtramites = TAFFY(jsonDatas);
  $("section").css("padding", "2.5rem 0.5rem 5rem");
  $("#menu").html("");
  document.getElementById("tituloNav").innerHTML = "TEMAS";
  console.log(DBtramites({ tipo: "tema" }).get());
  const tramitesTotal = DBtramites({ tipo: "tema" }).order("orden").get();

  $("section").css("padding", "5rem 1.5rem 5rem");

  for (let i = 0; i < tramitesTotal.length; i++) {
    const element = tramitesTotal[i];
    //const crearHref = document.createElement("a");
    //crearHref.href = ctx.pathname+element;

    // const botonesURS = document.createElement("a");
    // botonesURS.classList = "button is-medium is-fullwidth vertical-center";
    // botonesURS.id = element.tipo;
    // botonesURS.name = element.id;
    // botonesURS.innerHTML = element.titulo;
    // botonesURS.href = ctx.pathname + "/" + element.titulo;
    // crearHref.appendChild(botonesURS);
    // DivButtons.appendChild(botonesURS);

    $("#menu").append(`
    <a class="fadeInUp" id="` +
        element.id +
        `" href="` +
        ctx.pathname +
        "/" +
        element.titulo +
        `"><div class="row btnLink"><div class="col-4 btnPrimCL4Temas"><img class="imgTemasSize" src="` +
        element.img +
        `"></div><div class="col-8 centerTxt">` +
        element.titulo +
        `</div></div></a>`
    );

    /*$("#btnGridTms").append(
      `<div class="card">
      <header class="card-header">
      <a class="button is-medium is-fullwidth vertical-center" id="` +
        element.id +
        `" href="` +
        ctx.pathname +
        "/" +
        element.titulo +
        `"><div class="is-mobile"><img src="` +
        element.img +
        `"><p class="tituloTemas">`+element.titulo+`</p></div></a></header>
        </div>`
    );*/
  }
}

function temasDetalle(ctx) {
  muestraRegresa();
  $("section").css("padding", "5rem 1.5rem 5rem");
  console.log(ctx);
  const DBtramites = TAFFY(jsonDatas);
  document.getElementById("tituloNav").innerHTML = ctx.params.id;
  $("#menu").html("");

  const temasAttr = DBtramites({ titulo: ctx.params.id }).get();
  console.log(temasAttr);

  const DivButtonsAtrr = document.createElement("DIV");
  DivButtonsAtrr.classList = "container";
  DivButtonsAtrr.style.marginTop = "0%";

  $("#menu").append(DivButtonsAtrr);

  temasAttr.forEach((element) => {
    if (element.apoyos.length != 0) {
      const titulo = "apoyos";
      //console.log(Object.keys(element));
      const botonesURS = document.createElement("a");
      botonesURS.classList =
        "button is-medium is-fullwidth vertical-center btnCls";
      botonesURS.id = titulo;
      botonesURS.href = ctx.path + "/" + titulo;
      botonesURS.innerHTML = "Apoyos";
      //DivButtonsAtrr.appendChild(botonesURS);
      $("#menu").append(
        `<a href="` +
          ctx.path +
          "/" +
          titulo +
          `" class=" fadeInUp is-fullwidth">
      <div class="row btnSecCK is-flex-tablet-only">
        <div class="col-3 col3Nivel3btnDep"><img class="imgPrincipalhv" src="/img/pri_cuatro.png"></div>
        <div class="col-9 centerTxt">Apoyos</div>
      </div>
      </a>`
      );
    }

    if (element.servicios.length != 0) {
      const titulo = "servicios";
      //console.log(Object.keys(element));
      const botonesURS = document.createElement("a");
      botonesURS.classList =
        "button is-medium is-fullwidth vertical-center btnCls";
      botonesURS.id = titulo;
      botonesURS.href = ctx.path + "/" + titulo;
      botonesURS.innerHTML = "Servicios";
      //DivButtonsAtrr.appendChild(botonesURS);
      $("#menu").append(
        `<a href="` +
          ctx.path +
          "/" +
          titulo +
          `" class=" fadeInUp is-fullwidth">
      <div class="row btnSecCK is-flex-tablet-only">
        <div class="col-3 col3Nivel3btnDep"><img  class="imgPrincipalhv" src="/img/pri_ocho.png"></div>
        <div class="col-9 centerTxt">Servicios</div>
      </div>
      </a>`
      );
    }

    if (element.sectorAmb.length != 0) {
      const titulo = "sectorAmb";
      //console.log(Object.keys(element));
      const botonesURS = document.createElement("a");
      botonesURS.classList =
        "button is-medium is-fullwidth vertical-center btnCls";
      botonesURS.id = titulo;
      botonesURS.href = ctx.path + "/" + titulo;
      botonesURS.innerHTML = "Sector Ambiental";
      // DivButtonsAtrr.appendChild(botonesURS);
      $("#menu").append(
        `<a href="` +
          ctx.path +
          "/" +
          titulo +
          `" class="  fadeInUp is-fullwidth">
     <div class="row btnSecCK is-flex-tablet-only">
       <div class="col-3 col3Nivel3btnDep"><img  class="imgPrincipalhv" src="/img/pri_dos.png"></div>
       <div class="col-9 centerTxt">Sector ambiental</div>
     </div>
     </a>`
      );
    }
    if (element.tramites.length != 0) {
      const titulo = "tramites";
      //console.log(Object.keys(element));
      const botonesURS = document.createElement("a");
      botonesURS.classList =
        "button is-medium is-fullwidth vertical-center btnCls";
      botonesURS.id = titulo;
      botonesURS.href = ctx.path + "/" + titulo;
      botonesURS.innerHTML = "Trámites";
      //DivButtonsAtrr.appendChild(botonesURS);
      $("#menu").append(
        `<a href="` +
          ctx.path +
          "/" +
          titulo +
          `" class=" fadeInUp is-fullwidth">
      <div class="row btnSecCK is-flex-tablet-only">
        <div class="col-3 col3Nivel3btnDep"><img  class="imgPrincipalhv" src="/img/pri_cinco.png"></div>
        <div class="col-9 centerTxt">Trámites</div>
      </div>
      </a>`
      );
    }
  });
}

function temasDetSADT(ctx) {
  console.log(ctx);

  console.log(ctx.params.sadt);
  console.log(ctx.params.id);

  const DBtramites = TAFFY(jsonDatas);
  const temasAttr = DBtramites({ titulo: ctx.params.id }).select(
    "" + ctx.params.sadt + ""
  );

  $("#menu").html("");
  $("section").css("padding", "4rem 1.2rem");
  const temasAttrFin = temasAttr[0];
  const arrayOrdena = [];
  for (const key in temasAttrFin) {
    if (Object.hasOwnProperty.call(temasAttrFin, key)) {
      const element = temasAttrFin[key];
      const buscarStr = DBtramites({ id: element }).get();
      const ibjTramites = buscarStr[0];
      arrayOrdena.push(ibjTramites);
    }  
  }

  const recibeData  = arrayOrdena.sort(ordenaTSA);
  recibeData.map(function (data){
    if(data.tipo == "UR"){
      $("#menu").append(
        `<div  class="containerDep fadeInUp  snborder"><a href="` +
          ctx.path +
          "/" +
          data.titulo +
          `"><img class="imgDep" src="` +
          data.img +
          `"></a></div>`
      );
    }else{
      $("#menu").append(`
      <a class="fadeInUp" target="_blank" id="` +
          data.id +`" href="` +data.link +`">
          <div class="row btnLinkTSA"><div class="col-2 listviewTSACL4"></div><div class="col-10 centerTxt listviewTSACL8">` +
         data.titulo +
          `</div></div></a>`
      );
    }
   
  })
}

function ordenaTSA(a, b) {

  // converting to uppercase to have case-insensitive comparison
  const name1 = a.titulo.toUpperCase();
  const name2 = b.titulo.toUpperCase();

  let comparison = 0;

  if (name1 > name2) {
      comparison = 1;
  } else if (name1 < name2) {
      comparison = -1;
  }
  return comparison;
}


let temaTraeDatosDB = "tramites";
let idSelecionado = "";

function temasSelect(ctx) {
  console.log(ctx);
  $("#menu").html("");

  page("/dependencias/" + ctx.params.idSelect + "");
  page();
  //$("#menu").append(divCard);
  //$("#menu").append(detalleUr);
  //$("#menu").append(direcUR);
  //$("#menu").append(contacoUR);
}

function tramites(ctx) {
  $("section").css("padding", "4rem 1.2rem");
  temaTraeDatosDB = "tramites";
  document.getElementById("filtrosDiv").innerHTML = "";
  document.getElementById("historial").innerHTML = "";
  console.log(ctx);
  muestraRegresa();
  ctx.params.tema = ctx.path;
  const temaSeleccion = ctx.params.tema;

  const regex = "/";
  let temaTraeDatos = temaSeleccion.replace(regex, "");

  const regexSinS = "s";
  const temaTraeDatosSinS = temaTraeDatos.slice(0, -1);

  console.log(temaTraeDatosSinS);
  console.log(temaTraeDatos);
  //Limpiamos ventana
  $("#menu").html("");
  escondeMapa();
  //Muestra Btn Filtros
  muestraFiltro();
  //if(temaTraeDatos == "tramites"){temaTraeDatos = "Trámites"}
  //document.getElementById("tituloNav").innerHTML = temaTraeDatos.toUpperCase() + " DEL SECTOR";
  if (temaTraeDatos == "tramites") {
    temaTraeDatos = "TRÁMITES";
    temaTraeDatosDB = "tramites";
    document.getElementById("tituloNav").innerHTML =
      temaTraeDatos.toUpperCase();
  } else {
    document.getElementById("tituloNav").innerHTML =
      temaTraeDatos.toUpperCase();
    temaTraeDatosDB = temaTraeDatos;
  }

  const DBtramites = TAFFY(jsonDatas);
  const allTramites = DBtramites({ tipo: "" + temaTraeDatosSinS + "" })
    .order("titulo")
    .get();

  console.log(allTramites);


  for (let i = 0; i < allTramites.length; i++) {
    const element = allTramites[i];
    $("#menu").append(`
    <div class="fadeInUp">
    <a class="" target="_blank" id="` +
        element.id +`" href="` +element.link +`">
        <div class="row btnLinkTSA"><div class="col-2 listviewTSACL4"></div><div class="col-10 centerTxt listviewTSACL10">` +
        element.titulo +
        `</div></div></a></div>`
    );
  }

  //$("#menu").append(DivTramites);
  $(".filtros")
    .unbind()
    .click(function (event) {
      document.getElementById("filtrosDiv").innerHTML = "";
      document.getElementById("historial").innerHTML = "";
      //const divBotonesFiltro = document.getElementById("filtrosDiv");
      idSelecionado = event.target.id;
      //const resultadoOrder = DBtramites({ tipo: idSelecionado }).order("titulo").get();
      const resultado = DBtramites({ tipo: idSelecionado })
        .order("orden")
        .select("tipo", "titulo", "id", "img");
      //resultadoOrder().select("tipo","titulo", "id");
      document.getElementById("historial").innerHTML = "";
      crearTags(idSelecionado);
      console.log(resultado);

      for (let i = 0; i < resultado.length; i++) {
        const restEl = resultado[i];
        const idFil = restEl[0];
        const tipoFil = restEl[2];
        const tituloFil = restEl[3];
        const imgList = restEl[1];

        if (tipoFil == "UR") {
          $("#filtrosDiv").append(
            `<a onClick="creaTagsBotones(this.id)" id=` +
              tituloFil +
              `><div class="row btnLinkDep"><div class="col-12 btnFiltros"><img alt='` +
              tituloFil +
              `' class="imgTemasSize" src="` +
              imgList +
              `"></div></div></a>`
          );
          //<button class="btnDepFiltros" id="`+tituloFil+`" onClick="creaTagsBotones(this.id)"><img src="`+imgList+`"></button>
          //<a onClick="creaTagsBotones(this.id)" rel=`+tituloFil+` id=` +idFil +`><div class="row btnLinkDep"><div class="col-12 btnFiltros"><img alt='`+tituloFil+`' class="imgTemasSize" src="` +imgList +`"></div></div></a>
        } else {
          $("#filtrosDiv").append(
            `<a  onClick="creaTagsBotones(this.id)" rel=` +
              tituloFil +
              ` id=` +
              idFil +
              `><div class="row btnLinkTemas"><div class="col-4 col4BckDen"><img alt='` +
              tituloFil +
              `' class="imgTemasSize" src="` +
              imgList +
              `"></div><div class="col-8  centerTxt sizeTxtSlide"><p>` +
              tituloFil +
              `</p></div></div></a>`
          );
        }
      }
    });
}

function creaTagsBotones(id) {
  const DBtramites = TAFFY(jsonDatas);
  let temaSelect = id;
  //const idSelect = event.target.id;
  let idBotonSeleccionado = id;

  // alert(temaSelect);
  if (idSelecionado != "tema") {
    const resultadoBusqueda = DBtramites({
      titulo: idBotonSeleccionado,
    }).select("" + temaTraeDatosDB + "");
    creaBotones(resultadoBusqueda);
    crearTags(idBotonSeleccionado);
  } else {
    const resultadoBusqueda = DBtramites({ id: idBotonSeleccionado }).select(
      "" + temaTraeDatosDB + ""
    );
    const tituloResultado = DBtramites({ id: idBotonSeleccionado }).select(
      "titulo"
    );

    let [titulo] = tituloResultado;

    creaBotones(resultadoBusqueda);
    crearTags(titulo);
  }
}

function crearTags(id) {
  $(".tags").click(function (event) {
    page("/tramites", tramites);
    page();
    document.getElementById("historial").innerHTML = "";
    const totaldeTags = $("#historial").children().length;
    if (totaldeTags > 1) {
      $("#historial span:last").remove();
      $("#historial a:last").remove();
    }
  });

  if (id == "UR") {
    id = "DEPENDENCIA";
  } else {
    id = id.toUpperCase();
  }
  const totaldeTags = $("#historial").children().length;
  if (totaldeTags > 1) {
    $("#historial span:last").remove();
    $("#historial a:last").remove();
  }
  $("#historial").append(
    `<span class="tag is-success">` +
      id +
      `<button class="delete is-info is-small"></button></span>`
  );
}

function creaBotones(dependenciasAttr) {
  const DBtramites = TAFFY(jsonDatas);
  $("#menu").html("");
  
  const arrayFiltroTSA = [];

  for (const key in dependenciasAttr[0]) {
    if (Object.hasOwnProperty.call(dependenciasAttr[0], key)) {
      const valueTSA = dependenciasAttr[0][key];
      const getTSA = DBtramites({ id: valueTSA }).get();
      const arrayFiltros = getTSA[0];
      arrayFiltroTSA.push(arrayFiltros);
    
    }
  }
  const filtroOrder = arrayFiltroTSA.sort(ordenaTSA);
  
  filtroOrder.map( valueFiltro => {
    $("#menu").append(`
    <a class="fadeInUp" target="_blank" id="` +
    valueFiltro.id +`" href="` +valueFiltro.link +`">
        <div class="row btnLinkTSA"><div class="col-2 listviewTSACL4"></div><div class="col-10 centerTxt listviewTSACL8">` +
        valueFiltro.titulo +
        `</div></div></a>`
    );
  })
}

function buscar(ctx) {
  console.log(ctx);
  $("section").css("padding", "4rem 1.5rem 5rem");
  //$("body").css("background", "#a4a4a4");
  document.getElementById("menu").style.display = "block";
  escondeMapa();
  escondeFiltro();
  ocultarRegresa();
  //Limpiamos ventana
  $("#menu").html("");

  //Titulo de Nav
  document.getElementById("tituloNav").innerHTML = "BUSCAR";

  $("#menu").append(`<div class="container" style="padding-top: 11%;">
<input class="input is-medium is-rounded "type="text" id="barraBusqueda" placeholder="Buscar">
</div>
<div id="cantidadResulta" style="padding:10px;display: none;
justify-content: center;"></div>
<div class="inner" id="resultBusqueda"></div>
`);
  $("#barraBusqueda").keyup(function (e) {
    if (e.key === "Enter" || e.keyCode === 13) {
      $("#resultBusqueda").html("");
      const DBtramites = TAFFY(jsonDatas);
      let uniqueArray = "";
      const textBusqueda = sinAcentos($("#barraBusqueda").val());
      let val = [];
      $(":checkbox:checked").each(function (i) {
        val[i] = $(this).val();
      });
      console.log(val);
      console.log(textBusqueda.toUpperCase());
      //console.log(jsonDatas);
      const ResultadoSearch = [];
      if (textBusqueda == "") {
        toastr.options = {
          closeButton: true,
          debug: false,
          newestOnTop: false,
          progressBar: false,
          positionClass: "toast-bottom-full-width",
          preventDuplicates: false,
          onclick: null,
          showDuration: "3000",
          hideDuration: "1300",
          timeOut: "3000",
          extendedTimeOut: "1000",
          showEasing: "swing",
          hideEasing: "linear",
          showMethod: "fadeIn",
          hideMethod: "fadeOut",
        };
        toastr.info("Ingresa un texto.");
      }
      for (let i = 0; i < jsonDatas.length; i++) {
        let textoSinacentos = sinAcentos(jsonDatas[i]["titulo"]);
        let keyWSinacentos = sinAcentos(jsonDatas[i]["keywords"]);

        if (
          textBusqueda !== "" &&
          textoSinacentos.toUpperCase().indexOf(textBusqueda.toUpperCase()) !==
            -1
        ) {
          ResultadoSearch.push(jsonDatas[i]);
          uniqueArray = ResultadoSearch.filter(function (item, pos, self) {
            return self.indexOf(item) == pos;
          });
        }

        if (
          textBusqueda !== "" &&
          keyWSinacentos.toUpperCase().indexOf(textBusqueda.toUpperCase()) !==
            -1
        ) {
          ResultadoSearch.push(jsonDatas[i]);
          uniqueArray = ResultadoSearch.filter(function (item, pos, self) {
            return self.indexOf(item) == pos;
          });
        }
      }
      console.log(uniqueArray);
      if(uniqueArray.length == 0) {
        $("#cantidadResulta").html("");
       $("#resultBusqueda").append(`
       <div class="card">
  <div class="card-content">
    <div class="content">
    <figure class="image">
    <img class="is-rounded" src="/img/notFound.png">
  </figure>
      <p>No se encontraron resultados.</p>
    </div>
  </div>
</div>
       `);
      }else{

        const tipoResult = [];
        for (const key in uniqueArray) {
          tipoResult.push(uniqueArray[key].tipo);
          
  
        }
        const tipoUnico = tipoResult.filter(unique);
        
          
          $("#resultBusqueda").append(`<div class="accordion" id="accordionExample"></div>`);
  
        tipoUnico.map((tipo) => {
  
         // alert(tipo);
          let tipoCambioNombre = "";
          if(tipo == "UR"){ 
            tipoCambioNombre = "DEPENDENCIA";
          } else if(tipo == "tramite"){
            tipoCambioNombre = "trámite";
          }
          else{tipoCambioNombre = tipo}
          
          $("#accordionExample").append(
            `
  
          <div class="accordion-item">
      <h2 class="accordion-header" id="headingOne` +
              tipo +
              `">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse` +
              tipo +
              `" aria-expanded="true" aria-controls="collapseOne">
         ` +
         tipoCambioNombre.toUpperCase() +
              `S
        </button>
      </h2>
      <div id="collapse` +
              tipo +
              `" class="accordion-collapse collapse" aria-labelledby="headingOne` +
              tipo +
              `" data-bs-parent="#accordionExample">
        <div class="accordion-body" id="` +
              tipo +
              `s">
         
        </div>
      </div>
    </div>
          `
          );
        });
  
  
        const arrayOrdenados = uniqueArray.sort(ordenaTSA);
        //alert(arrayOrdenados.length-1);
        const cantidadTotalResultados = arrayOrdenados.length - 1;
      $("#cantidadResulta").html(`<p>`+cantidadTotalResultados+` resultados.</p>`)
        for (const key in arrayOrdenados) {
          const valuesSearch = arrayOrdenados[key];
          const tipo = arrayOrdenados[key].tipo;
         
          // console.log(resultBusqueda[key].tipo);
          // console.log(document.getElementById(resultBusqueda[key].tipo+"s"));
          $("#" + tipo + "s").append(
            `<div class="col-12 snborders btnLinks" id="bynsssss"><a id="` +
              valuesSearch.tipo +
              `" title="` +
              valuesSearch.titulo +
              `" onclick="btnsCl(this);" rel="` +
              valuesSearch.link +
              `"> <span class="material-icons md-dark md-36 centered">&#x` +
              valuesSearch.icono +
              `;</span>` +
              valuesSearch.titulo +
              `</a></div>
          
          `
          );
        }

      }
     
      
    }
  });
}

const unique = (value, index, self) => {
  return self.indexOf(value) === index
}

function informacionACD(ctx) {
  $("section").css("padding", "5rem 1.5rem 7rem");
  document.getElementById("tituloNav").innerHTML = "ACERCA DE";
  document.getElementById("menu").style.display = "block";
  escondeMapa();
  escondeFiltro();
  ocultarRegresa();
  //Limpiamos ventana
  $("#menu").html("");

  $("#menu").append(`
  <div class="conatiner fadeInUp" id="acd">
  <div class="card">
  <div class="card-content">
    <div class="content">
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore eaque illo perspiciatis aut dolorem? Fugit blanditiis, vel facere iure, officiis asperiores velit a magni saepe incidunt, ullam sequi accusantium aut!</p>
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore eaque illo perspiciatis aut dolorem? Fugit blanditiis, vel facere iure, officiis asperiores velit a magni saepe incidunt, ullam sequi accusantium aut!</p>
    </div>
    <div class="card-image">
    <figure class="image is-4by3">
      <img src="img/med_amb.png" alt="SEMARNAT">
    </figure>
  </div>
  </div>
</div>
  
  </div>
  `);
  //Muestra Btn Filtros
  console.log(ctx);
}

function crearBtnsTipoBusqueda(tipo, titulo, link, id, icono, ctx) {
  console.log(titulo, link, id);

  const DivTramites = document.createElement("DIV");
  DivTramites.classList = "container";
  DivTramites.style.marginTop = "10%";

  const crearHref = document.createElement("a");
  const botonesTR = document.createElement("a");
  botonesTR.classList = "btnLink button is-small is-fullwidth vertical-center";
  botonesTR.id = tipo;
  botonesTR.innerHTML = titulo;
  botonesTR.rel = link;
  botonesTR.target = "_blank";
  crearHref.appendChild(botonesTR);
  DivTramites.appendChild(botonesTR);

  $("#"+tipo+"").append(
    `<div class="col-12 snborders btnLinks" id="bynsssss"><a id="` +
      tipo +
      `" title="` +
      titulo +
      `" onclick="btnsCl(this);" rel="` +
      link +
      `"> <span class="material-icons md-dark md-36 centered">&#x` +
      icono +
      `;</span>` +
      titulo +
      `</a></div>`
  );

  /*$("#bynsssss").click(function (e) {
    const textoClick = e.target.text;
    const idClick = e.target.id;
    const buscaStr = textoClick.search(titulo);
    if (idClick == "UR" && buscaStr != -1) {
      page("/dependencias/" + titulo + "");
      page();
    }

    if (idClick == "tema" && buscaStr != -1) {
      page("/temas/" + titulo + "");
      page();
    }

  

    //if (idClick == "tramite" || idClick != "servicio" || idClick == "apoyo") {
      //if(tipo = "UR" || tipo != "tema"){
      //alert(tipo);
     // window.open(e.target.rel, "_blank");
      //}
      //if(tipo != "tema"){ showHelp(e.target.rel)}
      //if(tipo != "tema" || tipo != "UR"){  window.open( e.target.rel, '_blank');}
   // }
  
  });*/
}

function pintaDep(ctx) {
  console.log(ctx);
}

function sinAcentos(dataJson) {
  var string_norm = dataJson.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return string_norm;
}

function mapa(ctx) {
  $("#cargando").show();
  setTimeout(() => {
    $("#cargando").hide();
  }, 3000);
  document.getElementById("txtBuscaDicc").value = "";
  muestraMapa();
  console.log(ctx);
  escondeFiltro();
  ocultarRegresa();
  $("#menu").html("");
  document.getElementById("menu").style.display = "none";
  $("#viewDiv").css("height", "100vh");

  document.getElementById("tituloNav").innerHTML = "MAPA";

  /*MAPA*/
  require([
    "esri/Map",
    "esri/views/SceneView",
    "esri/views/MapView",
    "esri/Graphic",
    "esri/layers/GraphicsLayer",
    "esri/geometry/Extent",
    "esri/widgets/Track",
    "esri/widgets/Locate",
  ], (
    Map,
    SceneView,
    MapView,
    Graphic,
    GraphicsLayer,
    Extent,
    Track,
    Locate
  ) => {
    const map = new Map({
      basemap: "topo-vector",
    });

    const view = new MapView({
      container: "viewDiv",
      map: map,
      zoom: 18,
      center: [-99.1798467, 19.436737],
    });

    //const extent = new Extent({
    //  xmin: 99.180131,
    //  ymin: 19.048603057861300,
    //  xmax: -98.939323425293000,
    //  ymax: 19.4368458,
    //  spatialReference: 4326
    //});
    //view.extent = extent;

    var track = new Track({
      view: view,
    });
    //view.ui.add(track, "bottom-right");

    // The sample will start tracking your location
    // once the view becomes ready

    const locateBtn = new Locate({
      view: view,
    });

    // Add the locate widget to the top left corner of the view
    view.ui.add(locateBtn, {
      position: "bottom-right",
    });

    view.ui.remove("zoom");

    const graphicsLayer = new GraphicsLayer();
    map.add(graphicsLayer);
    document.getElementById("tablaDatos").style.display = "none";

    const point = {
      //Create a point
      type: "point",
      longitude: -99.1802361,
      latitude: 19.4368,
    };
    const simpleMarkerSymbol = {
      type: "simple-marker",
      style: "square",
      color: [23, 149, 18], // Orange
      outline: {
        color: [255, 255, 255], // White
        width: 1,
      },
    };

    let symbol = {
      type: "picture-marker", // autocasts as new PictureMarkerSymbol()
      url: "/img/location.png",
      width: "182px",
      height: "124px",
    };

    const pointGraphic = new Graphic({
      geometry: point,
      symbol: symbol,
      popupTemplate: {
        // title: "Oficina Central SEMARNAT",
        collapseEnabled: false,
        collapsed: false,
        content: `
        <p><b>Nombre: </b>Oficina Central SEMARNAT</p>
        <p><b>Entidad: </b>Ciudad de México</p>
        <p><b>Municipio: </b>Ciudad de México</p>
        <p><b>Colonia: </b>Ejercito Nacional 223, Anáhuac I Secc, Miguel Hidalgo, 11320 Ciudad de México, CDMX</p>
        <a href="https://www.google.com/maps/dir//Ejercito Nacional 223, Anáhuac I Secc, Miguel Hidalgo, 11320 Ciudad de México, CDMX"><span class="material-icons md-dark md-24" style="color:#2a7f00">&#xeaaa;</span> ¿Comó llegar?</a>
        `,
      },
    });
    graphicsLayer.add(pointGraphic);
    /*view.popup.open({
features: pointGraphic,  // array of graphics
featureMenuOpen: true, // selected features initially display in a list
});*/
    /*view.popup.open({
      updateLocationEnabled: true,
      title: "Oficina central SEMARNAT",
        content: `
        <p><b>Nombre:</b>Oficina central SEMARNAT</p>
        <p><b>Entidad:</b>Ciudad de México</p>
        <p><b>Municipio:</b>Ciudad de México</p>
        <p><b>Colonia:</b> Lago Xochimilco S/N, Anáhuac I Secc, Miguel Hidalgo, 11320 Ciudad de México, CDMX</p>
        `,
    });*/

    //datos

    var data = [
      {
        ID: 2,
        Nombre: "Comisión Nacional Forestal, Zapopan, Jalisco.",
        logo: "/img/conafor_location.png",
        Long: -103.4539102,
        Lat: 20.6976832,
        Entidad: "Jalisco",
        Municipio: "Zapopan",
        Colonia:
          "Av. Perif. Pte. Manuel Gómez Morin 5360, San Juan de Ocotán, 45019",
        Claves: "conafor,Zapopan,jalisco",
      },
      {
        ID: 3,
        Nombre: "Comisión Nacional del Agua, Veracruz, Veracruz.",
        logo: "/img/conagua_location.png",
        Long: -95.1831062,
        Lat: 18.161073,
        Entidad: "Veracruz",
        Municipio: "Hueyapan de Ocampo",
        Colonia: "Del Golfo 4, Benito Juarez, 95850.",
        Claves: "conagua,veracruz, Hueyapan de Ocampo",
      },
      {
        ID: 4,
        Nombre:
          "Secretaría de Medio Ambiente y Recursos Naturales, Merida, Yucatán.",
        logo: "/img/location.png",
        Long: -89.6579996,
        Lat: 20.9845857,
        Entidad: "Yucatán",
        Municipio: "Mérida",
        Colonia: "C. 59ᴮ 238, Yucalpetén, 97238.",
        Claves: "semarnat yucatan, Yucatan, Yucatán, Mérida,SEMARNAT, Merida ",
      },
      {
        ID: 5,
        Nombre: "Procuraduría Federal de Protección al Ambiente",
        logo: "/img/profepa_location.png",
        Long: -99.1784915,
        Lat: 19.3739113,
        Entidad: "Ciudad de México",
        Municipio: "Ciudad de Mexico",
        Colonia:
          "Félix Cuevas 6, Tlacoquemecatl del Valle, Benito Juárez, 03200 Ciudad de México, CDMX",
        Claves: "semarnat, profepa, denuncia ambiental, reportar",
      },
    ];

    $("#txtBuscaDicc").keyup(function () {
      BuscaProgre(this.value);
    });

    function ReiniciaDat() {
      dataFilt = jsonMapa;
      document.getElementById("txtBuscaDicc").value = "";
    }

    function BuscaPorPalabra(strPalabra) {
      let arregloDistintosResultados = [];
      let arrStr = "";
      $("#tablaDatos").html("");
      console.log(strPalabra);
      const Box = `<div class="columns" id="llenaDatos">
   
  </div>`;
      $("#tablaDatos").append(Box);

      var as = $(jsonMapa).filter(function (i, n) {
        return (
          String(String(n.Claves).toUpperCase()).indexOf(
            strPalabra.toUpperCase()
          ) > -1
        );
      });
      console.log(as);
      llenabBoxConsulta(as);

      function llenabBoxConsulta(result) {
        if (result.length != 0) {
          for (let i = 0; i < result.length; i++) {
            const element = result[i];
            $("#llenaDatos").append(
              `
             <button class="column  button buttonBusqueda is-full" id="` +
                element.id +
                `" name="` +
                element.Nombre +
                `">` +
                element.Nombre +
                `</button>
          `
            );
          }
        } else {
          $("#llenaDatos").append(`
            <p>No se encontraron resultados.</p>
          `);
        }
      }
      $("button").click(function (e) {
        document.getElementById("tablaDatos").style.display = "none";
        document.getElementById("popupPoint").style.display = "none";
        graphicsLayer.removeAll();
        const idResult = parseInt(e.target.id);
        const DBCordenadas = TAFFY(jsonMapa);

        const traeLatLog = DBCordenadas({ id: idResult }).select("Lat", "Long");

        const traeTodosElemt = DBCordenadas({ id: idResult }).get();

        console.log(traeTodosElemt);

        document.getElementById("llenaPopup").innerHTML = "";

        $("#llenaPopup").append(
          `

        <p><b>Nombre: </b>` +
            traeTodosElemt[0].Nombre +
            `</p>
        <p><b>Entidad: </b> ` +
            traeTodosElemt[0].Entidad +
            `</p>
        <p><b>Municipio: </b> ` +
            traeTodosElemt[0].Municipio +
            `</p>
        <p><b>Dirección: </b> ` +
            traeTodosElemt[0].Colonia +
            `</p>
        <a href="https://www.google.com/maps/dir//` +
            traeTodosElemt[0].Claves +
            "," +
            traeTodosElemt[0].Colonia +
            `"><span class="material-icons md-dark md-24" style="color:#2a7f00">&#xeaaa;</span> ¿Comó llegar?</a>
 `
        );
        const traeLongCero = traeLatLog[0];
        const cordenadas = {
          lat: traeLongCero[0],
          long: traeLongCero[1],
        };

        const point = {
          //Create a point
          type: "point",
          longitude: cordenadas.long,
          latitude: cordenadas.lat,
        };
        const simpleMarkerSymbol = {
          type: "simple-marker",
          style: "square",
          color: [23, 149, 18], // Orange
          outline: {
            color: [255, 255, 255], // White
            width: 1,
          },
        };

        let symbol = {
          type: "picture-marker", // autocasts as new PictureMarkerSymbol()
          url: traeTodosElemt[0].logo,
          width: "182px",
          height: "124px",
        };
        const pointGraphic = new Graphic({
          geometry: point,
          symbol: symbol,
          popupTemplate: {
            //title: traeTodosElemt[0].Nombre,
            collapseEnabled: false,
            collapsed: false,
            content:
              `
            
            <p><b>Nombre: </b>` +
              traeTodosElemt[0].Nombre +
              `</p>
        <p><b>Entidad: </b> ` +
              traeTodosElemt[0].Entidad +
              `</p>
        <p><b>Municipio: </b> ` +
              traeTodosElemt[0].Municipio +
              `</p>
        <p><b>Dirección: </b> ` +
              traeTodosElemt[0].Colonia +
              `</p>
        <a href="https://www.google.com/maps/dir//` +
              traeTodosElemt[0].Claves +
              "," +
              traeTodosElemt[0].Colonia +
              `"><span class="material-icons md-dark md-24" style="color:#2a7f00">&#xeaaa;</span> ¿Comó llegar?</a>`,
          },
        });
        graphicsLayer.add(pointGraphic);
       

        var zmLv;
        zmLv = 18;

        irZmmXY(cordenadas.long, cordenadas.lat, zmLv);
      });
    }

    $("#cierraPop").click(function (e) {
      document.getElementById("popupPoint").style.display = "none";
    });

    function BuscaProgre(strPalab) {
      if (strPalab != "") {
        document.getElementById("tablaDatos").style.display = "block";
        BuscaPorPalabra(strPalab);
      } else {
        ReiniciaDat();
        document.getElementById("tablaDatos").style.display = "none";
        //document.getElementById("popupPoint").style.display = "none";
      }
    }

    function irZmmXY(PLong, PLat, PzmLv) {
      view.goTo({
        target: [parseFloat(PLong), parseFloat(PLat)],
        zoom: PzmLv,
      });
      
    }
  });
}

function mapaDireccion(ctx) {
  $("#cargando").show();
  muestraMapa();
  document.getElementById("optionsDiv2").style.display = "none";
  console.log(ctx);
  escondeFiltro();
  //alert(ctx.params.direccion)
  // $("#menu").html("");
  document.getElementById("menu").style.display = "none";
  $("#viewDiv").css("height", "100vh");
  //document.getElementById("txtBuscaDicc").value= ctx.params.direccion;

  document.getElementById("tituloNav").innerHTML = "MAPA";
  /*MAPA*/
  require([
    "esri/Map",
    "esri/views/SceneView",
    "esri/views/MapView",
    "esri/Graphic",
    "esri/layers/GraphicsLayer",
    "esri/geometry/Extent",
    "esri/widgets/Track",
    "esri/widgets/Locate",
  ], (
    Map,
    SceneView,
    MapView,
    Graphic,
    GraphicsLayer,
    Extent,
    Track,
    Locate
  ) => {
    const map = new Map({
      basemap: "topo-vector",
    });

    const view = new MapView({
      container: "viewDiv",
      map: map,
      //zoom:18,
      //center:[-99.1798467, 19.436737]
    });

    //const extent = new Extent({
    //  xmin: 99.180131,
    //  ymin: 19.048603057861300,
    //  xmax: -98.939323425293000,
    //  ymax: 19.4368458,
    //  spatialReference: 4326
    //});
    //view.extent = extent;

    var track = new Track({
      view: view,
    });
    //view.ui.add(track, "bottom-right");

    // The sample will start tracking your location
    // once the view becomes ready

    const locateBtn = new Locate({
      view: view,
    });

    // Add the locate widget to the top left corner of the view
    view.ui.add(locateBtn, {
      position: "top-right",
    });

    view.ui.remove("zoom");

    //aquiii

    const dBMapa = TAFFY(jsonMapa);
    const idDepPinta = parseInt(ctx.params.id);
    const result = dBMapa({ id: idDepPinta }).select("Lat", "Long");

    const resultCompleto = dBMapa({ id: idDepPinta }).get();

    console.log(dBMapa);
    const geomeriaPunto = result[0];
    const punto = {
      ["Lat"]: geomeriaPunto[0],
      ["Long"]: geomeriaPunto[1],
    };

    console.log(punto);

    const graphicsLayer = new GraphicsLayer();
    map.add(graphicsLayer);
    document.getElementById("tablaDatos").style.display = "none";

    const point = {
      //Create a point
      type: "point",
      longitude: punto["Long"],
      latitude: punto["Lat"],
    };
    const simpleMarkerSymbol = {
      type: "simple-marker",
      style: "square",
      color: [23, 149, 18], // Orange
      outline: {
        color: [255, 255, 255], // White
        width: 1,
      },
    };
    //aquiii
    console.log(resultCompleto);
    const resultadosQueryMapa = resultCompleto[0];
    let symbol = {
      type: "picture-marker", // autocasts as new PictureMarkerSymbol()
      url: resultadosQueryMapa.logo,
      width: "182px",
      height: "124px",
    };

    const pointGraphic = new Graphic({
      geometry: point,
      symbol: symbol,
      popupTemplate: {
        // title: resultadosQueryMapa.Nombre,
        collapseEnabled: false,
        collapsed: false,
        content:
          `
          <img class="" alt="" src="img/icon_llegar.png" />
        <p><b>Nombre: </b>` +
          resultadosQueryMapa.Nombre +
          `</p>
        <p><b>Entidad: </b>` +
          resultadosQueryMapa.Entidad +
          `</p>
        <p><b>Municipio: </b>` +
          resultadosQueryMapa.Municipio +
          `</p>
        <p><b>Dirección: </b>` +
          resultadosQueryMapa.Colonia +
          `</p>
        <a href="https://www.google.com/maps/dir//` +
          resultadosQueryMapa.Claves +
          "," +
          resultadosQueryMapa.Colonia +
          `"><span class="material-icons md-dark md-24" style="color:#2a7f00">&#xeaaa;</span> ¿Comó llegar?`,
      },
    });

    /*view.popup.autoOpenEnabled = false;
    view.on("click", function(event) {
      view.popup.open({
        title: resultadosQueryMapa.Nombre,
        
        content: `
        <p><b>Nombre: </b>`+resultadosQueryMapa.Nombre+`</p>
        <p><b>Entidad: </b>`+resultadosQueryMapa.Entidad+`</p>
        <p><b>Municipio: </b>`+resultadosQueryMapa.Municipio+`</p>
        <p><b>Dirección: </b>`+resultadosQueryMapa.Colonia+`</p>
        <a href="https://www.google.com/maps/dir//`+resultadosQueryMapa.Claves+","+resultadosQueryMapa.Colonia+`"><span class="material-icons md-dark md-24" style="color:#000">&#xe988;</span> ¿Comó llegar?`
      });
    });*/

    graphicsLayer.add(pointGraphic);
    const zmLv = 18;
    irZmmXY(punto["Long"], punto["Lat"], zmLv);
    /*view.popup.open({
features: pointGraphic,  // array of graphics
featureMenuOpen: true, // selected features initially display in a list
});*/
    /*view.popup.open({
      updateLocationEnabled: true,
      title: "Oficina central SEMARNAT",
        content: `
        <p><b>Nombre:</b>Oficina central SEMARNAT</p>
        <p><b>Entidad:</b>Ciudad de México</p>
        <p><b>Municipio:</b>Ciudad de México</p>
        <p><b>Colonia:</b> Lago Xochimilco S/N, Anáhuac I Secc, Miguel Hidalgo, 11320 Ciudad de México, CDMX</p>
        `,
    });*/

    /* $("#txtBuscaDicc").keyup(function () {
      BuscaProgre(this.value)
    });*/

    /*function ReiniciaDat() {
      dataFilt = jsonMapa;
      document.getElementById("txtBuscaDicc").value = "";
    }*/

    /* function BuscaPorPalabra(strPalabra) {
      let arregloDistintosResultados = [];
      let arrStr = "";
      $('#tablaDatos').html("");
      console.log(strPalabra)
      const Box = `<div class="columns" id="llenaDatos">
   
  </div>`;
      $('#tablaDatos').append(Box);

      var as = $(data).filter(function (i, n) { return (String(String(n.Claves).toUpperCase()).indexOf(strPalabra.toUpperCase()) > -1) });
      console.log(as);
      llenabBoxConsulta(as)




      function llenabBoxConsulta(result) {
       if(result.length != 0){
        for (let i = 0; i < result.length; i++) {
          const element = result[i];
          $('#llenaDatos').append(`
             <button class="column  button buttonBusqueda is-full" id="`+ element.ID + `" name="` + element.Nombre + `">` + element.Nombre + `</button>
          `);

        }
       }else{
        $('#llenaDatos').append(`
            <p>No se encontraron resultados.</p>
          `);
       }
        
      }
      $("button").click(function (e) {

        document.getElementById("tablaDatos").style.display = "none";
        document.getElementById("popupPoint").style.display = "none";
        graphicsLayer.removeAll();
        const idResult = parseInt(e.target.id);
        const DBCordenadas = TAFFY(data);

        const traeLatLog = DBCordenadas({ ID: idResult }).select(
          "Lat", "Long"
        );

        const traeTodosElemt = DBCordenadas({ ID: idResult }).get();

        console.log(traeTodosElemt);

        document.getElementById("llenaPopup").innerHTML = "";

        $('#llenaPopup').append(`

        <p><b>Nombre:</b>`+ traeTodosElemt[0].Nombre + `</p>
        <p><b>Entidad:</b> `+ traeTodosElemt[0].Entidad + `</p>
        <p><b>Municipio:</b> `+ traeTodosElemt[0].Municipio + `</p>
        <p><b>Colonia:</b> `+ traeTodosElemt[0].Colonia + `</p>
 `);
        const traeLongCero = traeLatLog[0];
        const cordenadas = {
          lat: traeLongCero[0],
          long: traeLongCero[1]
        }


        const point = { //Create a point
          type: "point",
          longitude: cordenadas.long,
          latitude: cordenadas.lat
        };
        const simpleMarkerSymbol = {
          type: "simple-marker",
          style: "square",
          color: [23, 149, 18],  // Orange
          outline: {
            color: [255, 255, 255], // White
            width: 1
          }
        };
       
        let symbol = {
type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
url: traeTodosElemt[0].logo,
width: "54px",
height: "54px"
};
        const pointGraphic = new Graphic({
          geometry: point,
          symbol: symbol,
          popupTemplate: {
            title: traeTodosElemt[0].Nombre,
            content: `
            
            <p><b>Nombre:</b>`+ traeTodosElemt[0].Nombre + `</p>
        <p><b>Entidad:</b> `+ traeTodosElemt[0].Entidad + `</p>
        <p><b>Municipio:</b> `+ traeTodosElemt[0].Municipio + `</p>
        <p><b>Colonia:</b> `+ traeTodosElemt[0].Colonia + `</p>
            `,
          }
        });
        graphicsLayer.add(pointGraphic);





        var zmLv;
        zmLv = 18;

        irZmmXY(cordenadas.long, cordenadas.lat, zmLv)
      })

    }*/

    $("#cierraPop").click(function (e) {
      document.getElementById("popupPoint").style.display = "none";
    });

    /*function BuscaProgre(strPalab) {

      if (strPalab != "") {
        document.getElementById("tablaDatos").style.display = "block";
        BuscaPorPalabra(strPalab);
      }
      else {
        ReiniciaDat();
        document.getElementById("tablaDatos").style.display = "none";
        //document.getElementById("popupPoint").style.display = "none";
      }
    }*/

    function irZmmXY(PLong, PLat, PzmLv) {
      view.goTo({
        target: [parseFloat(PLong), parseFloat(PLat)],
        zoom: PzmLv,
      });
      setTimeout(() => {
        $("#cargando").hide();
      }, 2000);
    }
  });
}

function index(ctx) {
 
 //alert($("#barraBusqueda").val());
  $("section").css("padding", "2rem 0.5rem 8rem");
  //$("body").css("background", "url(/img/hojasss.jpeg)");
  escondeMapa();
  escondeFiltro();
  ocultarRegresa();
  document.getElementById("menu").style.display = "block";
  console.log(ctx);
  document.getElementById(
    "tituloNav"
  ).innerHTML = `<img src="img/logo_sem.png" alt="">`;
  // document.getElementById("tituloNav").innerHTML =`MI MEDIO AMBIENTE`;
  /* $("#menu").append(`<nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
  <div class="navbar-brand ">
    <a class="navbar-item" href="https://bulma.io">
      <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: Free, open source, and modern CSS framework based on Flexbox" width="112" height="28">
    </a>

  
  </div>
</nav>`)*/
  $("#menu").html("");
  $("#menu").append(`
  <div class="container fadeInUp">
  <div class="is-full" id="click">
  <a href="/atribuciones"><div class="row btnMPrin" id="atribuciones"><div class="col-3 btnPrimCL3 centerTxt" style="padding:5px;"><img class="imgPrincipalhv" src="img/pri_uno.png"></div><div class="col-9 centerTxt">Atribuciones en materia ambiental</div></div></a>
  <a href="/dependencias"><div class="row  btnMPrin" id="UR"><div class="col-3 btnPrimCL3 centerTxt" style="padding:5px;"><img class="imgPrincipalhv" src="img/pri_dos.png"></div><div class="col-9 centerTxt">Sector ambiental</div></div></a>
  <a href="/temas"><div class="row btnMPrin is-flex-tablet-only" id="CPT"><div class="col-3 btnPrimCL3 centerTxt" style="padding:5px;"><img class="imgPrincipalhv" src="img/pri_tres.png"></div><div class="col-9 centerTxt">Temas</div></div></a>
  <a href="/apoyos"><div class="row btnMPrin" id="ASA"><div class="col-3 btnPrimCL3 centerTxt" style="padding:5px;"><img class="imgPrincipalhv" src="img/pri_cuatro.png"></div><div class="col-9 centerTxt">Apoyos</div></div></a>
  <a href="/servicios"><div class="row btnMPrin" id="ASA"><div class="col-3 btnPrimCL3 centerTxt" style="padding:5px;"><img class="imgPrincipalhv" src="img/pri_ocho.png"></div><div class="col-9 centerTxt">Servicios</div></div></a>
   <a href="/tramites"><div class="row btnMPrin" id="tramite"><div class="col-3 btnPrimCL3 centerTxt" style="padding:5px;"><img  class="imgPrincipalhv" src="img/pri_cinco.png"></div><div class="col-9 centerTxt">Trámites</div></div></a>
   <a href="/reporte"><div class="row btnMPrin" id="RAC"><div class="col-3 btnPrimCL3 centerTxt" style="padding:5px;"><img class="imgPrincipalhv" src="img/pri_seis.png"></div><div class="col-9 centerTxt">Reporte ciudadano</div></div></a>
   <a href="/informacion"><div class="row btnMPrin" id="INF"><div class="col-3 btnPrimCL3 centerTxt" style="padding:5px;"><img class="imgPrincipalhv" src="img/pri_siete.png"></div><div class="col-9 centerTxt">Información ambiental</div></div></a>
  </div>
</div>
  `);
}


function atribuciones(ctx) {
  $("#menu").html("");
 //overAnimation();
  $( "#menu" ).scrollTop(0);
  $("section").css("padding", "5.5rem 1.2rem 7rem");
  //$("section").addClass("fadeInUp");
  escondeMapa();
  escondeFiltro();
  muestraRegresa();
 
 
  console.log(ctx);
  ctx.params.tema = "HolaMundo";
  ctx.params.id = "123b";
  ctx.params.id = [2, 3, 4, 5];

  console.log(ctx.pathname);
  const DBtramites = TAFFY(jsonDatas);
  document.getElementById("tituloNav").innerHTML = "ATRIBUCIONES";
  const result = DBtramites({ grupo: "atribuciones" }).order("orden").get();

  for (let i = 0; i < result.length; i++) {
    const titulo = result[i].titulo;
    const imagen = result[i].img;
    const atribucionesarray = result[i].atribuciones;
    const id = result[i].id;
    const pos = i;
    crearCard(titulo, imagen, pos, id, atribucionesarray, ctx);
  }
  
}

function atribucionesTema(ctx) {
  console.log(ctx);
  $("#menu").html("");
  const DBAtribuciones = TAFFY(jsonAtribuciones);
  const result = DBAtribuciones({ id: ctx.params.id }).select(
    "" + ctx.params.tema + ""
  );
  console.log(result.toString());
  $("#menu").append(
    `<div class="col-12"><p class="detallesP">` +
      result.toString() +
      `</p></div>`
  );
}

function dependencias(ctx) {
  $( "#menu" ).scrollTop(0);
  $("#menu").css("display", "block");
  $("section").css("padding", "2rem 1.5rem 5rem");
  escondeMapa();
  escondeFiltro();
  muestraRegresa();
  console.log(ctx);

  $("#menu").html("");
  console.log(ctx.pathname);
  const DBtramites = TAFFY(jsonDatas);

  const tituloURs = document.createElement("h4");
  tituloURs.classList = "title is-4";
  tituloURs.innerHTML = "Dependencias";

  let DivButtons = document.createElement("DIV");
  DivButtons.classList = "container"; //grids
  DivButtons.id = "btnGrid";
  DivButtons.style.marginTop = "10%";

  document.getElementById("tituloNav").innerHTML = "SECTOR AMBIENTAL";
  $("#menu").append(DivButtons);

  // const tramites =  DBtramites({ tipo: "UR" }).get();

  console.log(DBtramites().filter({ tipo: "UR" }).get());

  const dependenciasTotal = DBtramites()
    .filter({ tipo: "UR" })
    .order("orden")
    .get();

  for (let i = 0; i < dependenciasTotal.length; i++) {
    const element = dependenciasTotal[i];
    // //const crearHref = document.createElement("a");
    // const botonesURS = document.createElement("a");
    // botonesURS.classList = "button is-medium is-fullwidth vertical-center";
    // botonesURS.id = element.id;
    // botonesURS.innerHTML = `<img src="` + element.img + `">`;
    // botonesURS.href = ctx.pathname + "/" + element.titulo;
    // //crearHref.appendChild(botonesURS);

    $("#btnGrid").append(
      `<a  class="containerDep  fadeInUp snborder" id="` +
        element.id +
        `" href="` +
        ctx.pathname +
        "/" +
        element.titulo +
        `"><img class="imgDeps" src="` +
        element.img +
        `"></a>`
    );

    // DivButtons.appendChild(botonesURS);
  }
}


function idDependenciaDet(ctx) {
  console.log(ctx);
  $("#menu").css("display", "block");
  $("section").css("padding", "5rem 1.5rem 5rem");
  escondeMapa();
  escondeFiltro();
  muestraRegresa();
  $("#menu").html("");
  document.body.scrollTop = document.documentElement.scrollTop = 0;
  document.getElementById("tituloNav").innerHTML = ctx.params.id;
  const DBtramites = TAFFY(jsonDatas);
  const dependenciasAttr = DBtramites({ titulo: ctx.params.id }).get();
  console.log(dependenciasAttr[0]);

  const llenaDetaURS = dependenciasAttr[0];

  const DivButtonsAtrr = document.createElement("DIV");
  DivButtonsAtrr.classList = "container";
  DivButtonsAtrr.style.marginTop = "10%";

  const divCard = document.createElement("div");
  divCard.classList = "";

  console.log(llenaDetaURS.reporta);

  const createDovContent = document.createElement("div");
  createDovContent.classList = "content is-normal";

  const detalleUr = document.createElement("p");
  detalleUr.innerHTML =
    `<div class="row"><div class="col-12">` +
    llenaDetaURS.describe +
    `</div></div> `;
  detalleUr.classList = "detallesP";

  const direcUR = document.createElement("p");
  direcUR.innerHTML =
    `<div class="row"><div class="col-2"><span class="material-icons">&#xe0c8;</span></div><div class="col-10"><a href="/mapa/` +
    llenaDetaURS.orden +
    `"><p>` +
    llenaDetaURS.direccion +
    `</p></a></div></div> `;
  direcUR.classList = "detallesP";

  const telefonoUR = document.createElement("p");
  telefonoUR.innerHTML =
    `<div class="row"><div class="col-2"><span class="material-icons">&#xe0cd;</span></div><div class="col-10">` +
    llenaDetaURS.telefono +
    `</div></div> `;
  telefonoUR.classList = "telefonoP";

  const contacoUR = document.createElement("p");
  contacoUR.innerHTML =
    `<div class="row"><div class="col-2"><span class="material-icons">&#xe0be;</span></div><div class="col-10">` +
    llenaDetaURS.contacto +
    `</div></div> `;
  contacoUR.classList = "detallesP";

  
  $("#menu").append(`
  <div class="card fadeInUp">
  <div class="card-content">
  <div  class=" DivImgDependencias"><img class="imgDep" src="` +
      llenaDetaURS.img +
      `"></div><br>
    <div class="content detallesP">
     <p>`+ llenaDetaURS.describe+`</p>
    </div>
  </div>
</div>
  `);
  $("#menu").append(`
  <div class="card fadeInUp">
  <div class="card-content">
    <div class="content detallesP">
     <p>`+ llenaDetaURS.atribuciones+`</p>
    </div>
  </div>
</div>`);
  //$("#menu").append(direcUR);
  //$("#menu").append(telefonoUR);
 // $("#menu").append(contacoUR);
  $("#menu").append(`
  <div class="card fadeInUp">
  <div class="card-content">
    <div class="content detallesP">
    <div class="row "><div class="col-2"><span class="material-icons">&#xe0c8;</span></div><div class="col-10"><a href="/mapa/` +
    llenaDetaURS.orden +
    `"><p>` +
    llenaDetaURS.direccion +
    `</p></a></div></div>
    <div class="row"><div class="col-2"><span class="material-icons">&#xe0cd;</span></div><div class="col-10">` +
    llenaDetaURS.telefono +
    `</div></div><br>
    <div class="row"><div class="col-2"><span class="material-icons">&#xe0be;</span></div><div class="col-10">` +
    llenaDetaURS.contacto +
    `</div></div> <br>
    <div class="row"><div class="col-2"><span class="material-icons">&#xe894;</span></div><div class="col-10">` +
    llenaDetaURS.paginaWeb +
    `</div></div><br>
    <div class="row "><div class="col-2"><span class="material-icons">&#xf8d9;</span></div><div class="col-10"><div class="row redesSocialesFlex"><div class="col-3">` +
    llenaDetaURS.facebook +
    `</div><div class="col-3">` +
    llenaDetaURS.instagram +
    `</div><div class="col-3">` +
    llenaDetaURS.twitter +
    `</div></div>
    </div>
    </div> 
    </div>
  </div>
</div>
  `);

 
  $("#menu").append(DivButtonsAtrr);

  dependenciasAttr.forEach((element) => {
    if (element.apoyos.length != 0) {
      const titulo = "apoyos";
      //console.log(Object.keys(element));
      const botonesURS = document.createElement("a");
      botonesURS.classList =
        "button is-medium is-fullwidth vertical-center btnCls";
      botonesURS.id = titulo;
      botonesURS.href = ctx.path + "/" + titulo;
      botonesURS.innerHTML = "Apoyos";
      $("#menu").append(
        `<a href="` +
          ctx.path +
          "/" +
          titulo +
          `" class="  is-fullwidth">
      <div class="row btnSecCK is-flex-tablet-only">
        <div class="col-3 col3Nivel3btnDep"><img  class="imgPrincipalhv" src="/img/pri_cuatro.png"></div>
        <div class="col-9 centerTxt">Apoyos</div>
      </div>
      </a>`
      );
    }

    if (element.servicios.length != 0) {
      const titulo = "servicios";
      //console.log(Object.keys(element));
      const botonesURS = document.createElement("a");
      botonesURS.classList =
        "button is-medium is-fullwidth vertical-center btnCls";
      botonesURS.id = titulo;
      botonesURS.href = ctx.path + "/" + titulo;
      botonesURS.innerHTML = "Servicios";
      $("#menu").append(
        `<a href="` +
          ctx.path +
          "/" +
          titulo +
          `" class="  is-fullwidth">
      <div class="row btnSecCK is-flex-tablet-only">
        <div class="col-3 col3Nivel3btnDep"><img  class="imgPrincipalhv" src="/img/pri_ocho.png"></div>
        <div class="col-9 centerTxt">Servicios</div>
      </div>
      </a>`
      );
    }

    if (element.temas.length != 0) {
      const titulo = "temas";
      //console.log(Object.keys(element));
      const botonesURS = document.createElement("a");
      botonesURS.classList =
        "button is-medium is-fullwidth vertical-center btnCls";
      botonesURS.id = titulo;
      botonesURS.href = ctx.path + "/" + titulo;
      botonesURS.innerHTML = "Temas";
      $("#menu").append(
        `<a href="` +
          ctx.path +
          "/" +
          titulo +
          `" class="  is-fullwidth">
      <div class="row btnSecCK is-flex-tablet-only">
        <div class="col-3 col3Nivel3btnDep"><img  class="imgPrincipalhv" src="/img/pri_tres.png"></div>
        <div class="col-9 centerTxt">Temas</div>
      </div>
      </a>`
      );
    }
    if (element.tramites.length != 0) {
      const titulo = "tramites";
      //console.log(Object.keys(element));
      const botonesURS = document.createElement("a");
      botonesURS.classList =
        "button is-medium is-fullwidth vertical-center btnCls";
      botonesURS.id = titulo;
      botonesURS.href = ctx.path + "/" + titulo;
      botonesURS.innerHTML = "Trámites";
      $("#menu").append(
        `<a href="` +
          ctx.path +
          "/" +
          titulo +
          `" class="  is-fullwidth">
      <div class="row btnSecCK is-flex-tablet-only">
        <div class="col-3 col3Nivel3btnDep"><img  class="imgPrincipalhv" src="/img/pri_cinco.png"></div>
        <div class="col-9 centerTxt">Trámites</div>
      </div>
      </a>`
      );
    }
  });
  //Reporte Ambiental Ciudadano
  if (llenaDetaURS.reporta != 0) {
    const DBReporte = TAFFY(jsonDataRepInfo);
    const reporteTotal = DBReporte({ id_Dep: llenaDetaURS.id }).get();
    const resultReporta = reporteTotal[0];

    $("#menu").append(
      `<a href="/reporte/` +
        resultReporta.id +
        `" class="  is-fullwidth">
      <div class="row btnSecCK is-flex-tablet-only">
        <div class="col-3 col3Nivel3btnDepDen"><img  class="imgPrincipalhv" src="` +
        resultReporta.img +
        `"></div>
        <div class="col-9 centerTxt">` +
        resultReporta.titulo +
        `</div>
      </div>
      </a>`
    );
  }
}

function detalleDependencia(ctx) {
  $( "#menu" ).scrollTop(0);
  muestraRegresa();
  $("#menu").css("display", "block");
  console.log(ctx);
  escondeMapa();
  escondeFiltro();

  const titulo = ctx.params.id;
  const tipo = ctx.params.detalle;
  $("#menu").html("");

  const DBtramites = TAFFY(jsonDatas);
  const dependenciasAttr = DBtramites({ titulo: titulo }).select(
    "" + tipo + ""
  );

  const DivButtonsFin = document.createElement("DIV");
  DivButtonsFin.classList = "container";
  DivButtonsFin.style.marginTop = "10%";

  $("#menu").append(DivButtonsFin);
  const ordenaArrayDepTSA = [];
  for (const key in dependenciasAttr[0]) {
    if (Object.hasOwnProperty.call(dependenciasAttr[0], key)) {
      const element = dependenciasAttr[0][key];

      const buscarStr = DBtramites({ id: element }).get();
      console.log(buscarStr);
      const arrayRecibeTSA = buscarStr[0];
      
      ordenaArrayDepTSA.push(arrayRecibeTSA);
      
     
      // $(".btnLink").click(function (e) {
      //   showHelp(e.target.rel);
      // });
    }

  }

  const arrayOrdenados = ordenaArrayDepTSA.sort(ordenaTSA);
  console.log(arrayOrdenados);

  arrayOrdenados.map( value => {
    if (value.tipo == "tema") {
      // $("#menu").append(`<a href="`+ctx.path+`/`+arrayBusca[3]+`" class="button is-medium is-fullwidth vertical-center btnCls"><img src='`+arrayBusca[0]+`'></a>`);
      $("#menu").append(
        `
           <a class="fadeInUp" id="` +
           value.titulo +
          `" href="/temas/` +
          value.titulo +
          `"><div class="row btnLink"><div class="col-4 btnPrimCL4Temas"><img class="imgTemasSize" src="` +
          value.img +
          `"></div><div class="col-8 centerTxt">` +
          value.titulo +
          `</div></div></a>
           `
      );
    } else {
      $("#menu").append(
        `
     <a class="fadeInUp" target="_blank" id="` +
     value.link +
          `" href="` +
          value.link +
          `">
         <div class="row btnLinkTSA"><div class="col-2 listviewTSACL4"></div><div class="col-10 centerTxt listviewTSACL8">` +
          value.titulo +
          `</div></div></a>`
      );
    }
  })

   /**/
  
}

function dependenciaTemas(ctx) {
  console.log(ctx);

  page("/temas/" + ctx.params.temas + "");
  page();
}

function escondeMapa(params) {
  $("#viewDiv").css("height", "0");
  ocultarMapa();
}

function muestraFiltro(params) {
  $("#btnFiltro").css("display", "none");
  $("#floats").css("display", "block");
}

function escondeFiltro(params) {
  $("#btnFiltro").css("display", "none");
  $("#floats").css("display", "none");
}

function crearCard(titulo, img, pos, id, atribucones, ctx) {
  // CARD DINAMICO
  const contenedor = document.createElement("DIV");
  contenedor.id = "contenedor";

  $("#menu").append(contenedor);

  $("#contenedor").append(
    `<div class="card fadeInUp">  
  <header class="card-header">
    
    <div onclick="myFunction(` +
      pos +
      `)"  class="row"><div class="col-4 btnPrimCL4"><img class="imgTemas" src="` +
      img +
      `"></div><div class="col-8 centerTxt">` +
      titulo +
      `</div></div>
   
    <button onclick="myFunction2(` +
      pos +
      `)" class="card-header-icon" aria-label="more options">
      <span class="icon">
        <i class="fa-angle-down fas fas` +
      pos +
      `" id="fas` +
      pos +
      `"  aria-hidden="true"></i>
      </span>
    </button>
  </header>
  <footer class="card-footer` +
      pos +
      ` card-footer is-hidden fade-inTop">
    <a href="` +
      ctx.pathname +
      `/Federacion/` +
      id +
      `" id="` +
      id +
      `" class="card-footer-item">Federación</a>
    <a href="` +
      ctx.pathname +
      `/Estado/` +
      id +
      `"" id="` +
      id +
      `" class="card-footer-item">Estado</a>
    <a href="` +
      ctx.pathname +
      `/Municipio/` +
      id +
      `"" id="` +
      id +
      `" class="card-footer-item">Municipio</a>
  </footer>
</div>`
  );

  //FIN CARD DINAMICO
}

function myFunction(pos) {
  $(".card-footer" + pos + "").toggleClass("is-hidden");
  // const remover = document.getElementById("fas"+pos+"").classList.remove("fa-angle-up");
  // const añadir   = document.getElementById("fas"+pos+"").classList.add("fa-angle-down");

  const verifica = document.getElementById("fas" + pos + "").classList;
  console.log(verifica);
  const claseExistente = "fa-angle-";

  const buscar = verifica.value.search("fa-angle-up");

  if (buscar != -1) {
    document.getElementById("fas" + pos + "").classList.remove("fa-angle-up");
    document.getElementById("fas" + pos + "").classList.add("fa-angle-down");
  } else {
    document.getElementById("fas" + pos + "").classList.add("fa-angle-up");
    document.getElementById("fas" + pos + "").classList.remove("fa-angle-down");
  }
}

function myFunction2(pos) {
  $(".card-footer" + pos + "").toggleClass("is-hidden");
  // const remover = document.getElementById("fas"+pos+"").classList.remove("fa-angle-up");
  // const añadir   = document.getElementById("fas"+pos+"").classList.add("fa-angle-down");

  const verifica = document.getElementById("fas" + pos + "").classList;
  console.log(verifica);
  const claseExistente = "fa-angle-";

  const buscar = verifica.value.search("fa-angle-up");

  if (buscar != -1) {
    document.getElementById("fas" + pos + "").classList.remove("fa-angle-up");
    document.getElementById("fas" + pos + "").classList.add("fa-angle-down");
  } else {
    document.getElementById("fas" + pos + "").classList.add("fa-angle-up");
    document.getElementById("fas" + pos + "").classList.remove("fa-angle-down");
  }
}

function ocultarMapa(params) {
  document.getElementById("viewDiv").style.paddingBottom = "0px";
  document.getElementById("viewDiv").style.marginTop = "0px";
  document.getElementById("optionsDiv2").style.display = "none";
  document.getElementById("tablaDatos").style.display = "none";
}

function muestraMapa(params) {
  //document.getElementById("viewDiv").style.paddingBottom = "6.5em";
  //document.getElementById("viewDiv").style.marginTop = "3em";
  document.getElementById("optionsDiv2").style.display = "block";
  document.getElementById("tablaDatos").style.display = "block";
}

function ocultarRegresa(params) {
  document.getElementById("regresaBCK").style.display = "none";
}

function muestraRegresa(params) {
  document.getElementById("regresaBCK").style.display = "flex";
  //$("#regresaBCK").click(function () {
  // window.history.go(-1)
  //});
}

function showHelp(url) {
  var target = "_blank";

  var options = "location=no,hidden=yes,zoom=no,footer=yes";

  inAppBrowserRef = cordova.InAppBrowser.open(url, target, options);

  inAppBrowserRef.addEventListener("loadstart", loadStartCallBack);

  inAppBrowserRef.addEventListener("loadstop", loadStopCallBack);

  inAppBrowserRef.addEventListener("loaderror", loadErrorCallBack);
}

function loadStartCallBack() {
  $("#status-message").text("loading please wait ...");
}

function loadStopCallBack() {
  if (inAppBrowserRef != undefined) {
    inAppBrowserRef.insertCSS({ code: "body{font-size: 25px;}" });

    $("#status-message").text("");

    inAppBrowserRef.show();
  }
}

function loadErrorCallBack(params) {
  $("#status-message").text("");

  var scriptErrorMesssage =
    "alert('Sorry we cannot open that page. Message from the server is : " +
    params.message +
    "');";

  inAppBrowserRef.executeScript(
    { code: scriptErrorMesssage },
    executeScriptCallBack
  );

  inAppBrowserRef.close();

  inAppBrowserRef = undefined;
}

function executeScriptCallBack(params) {
  if (params[0] == null) {
    $("#status-message").text(
      "Sorry we couldn't open that page. Message from the server is : '" +
        params.message +
        "'"
    );
  }
}

function btnsCl(e) {
  const textoClick = e.title;
  const tipo = e.id;

  if (tipo == "UR") {
    page("/dependencias/" + textoClick + "");
    page();
  }

  if (tipo == "tema") {
    page("/temas/" + textoClick + "");
    page();
  }
  if (tipo != "tema" && tipo != "UR") {
    window.open(e.rel, "_blank");
  }
}
