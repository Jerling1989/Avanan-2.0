$(document).ready(() => {
  let url = location.href.replace(/\/$/, "");
  
  if (location.hash) {
    const hash = url.split("#");
    $('#myTab a[href="#'+hash[1]+'"]').tab("show");
    url = location.href.replace(/\/#/, "#");
    history.replaceState(null, null, url);
    setTimeout(() => {
      $(window).scrollTop(0);
    }, 400);
  } 
  
  $('a[data-toggle="tab"]').on("click", function() {
    let newUrl;
    const hash = $(this).attr("href");
    if(hash == "#home") {
      newUrl = url.split("#")[0];
    } else {
      newUrl = url.split("#")[0] + hash;
    }
    newUrl += "/";
    history.replaceState(null, null, newUrl);
  });

  if (document.location.hash === '#board/' || document.location.hash === '#team/') {
    $('html, body').animate({
      scrollTop: $('.tab-content').offset().top-150
    }, 'slow');
  }

  $('.reload').on('click', function() {
    location.reload();
  });

});