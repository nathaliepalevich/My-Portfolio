console.log('Starting up');

$(document).ready(function () {
    initPage()
})

function initPage() {
    createProjects()
    renderProj()

}


function renderProj() {
    var projs = getProjs()

    var strHTML = projs.map(function (proj, idx) {
        return `
        <div class="col-md-4 col-sm-6 portfolio-item" onClick="renderModal(${idx})">
        <a class="portfolio-link" data-toggle="modal" href="#portfolioModal" >
        <div class="portfolio-hover">
        <div class="portfolio-hover-content">
        <i class="fa fa-plus fa-3x"></i>
        </div>
        </div>
        <img class="img-fluid" src=${proj.url} alt="" >
        </a>
        <div class="portfolio-caption">
        <h4>${proj.name}</h4>
        <p class="text-muted">${proj.title}</p>
        </div>
        </div>`
    })
    $('.proj-container').html(strHTML.join(''))
}


function renderModal(idx) {
    var projs = getProjs()
    var proj = projs[idx]
    var strHTML = `
       <div class="portfolio-modal modal fade" id="portfolioModal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="close-modal" data-dismiss="modal">
              <div class="lr">
                <div class="rl"></div>
              </div>
            </div>
            <div class="container">
              <div class="row">
                <div class="col-lg-8 mx-auto">
                  <div class="modal-body">
                    <h2>${proj.name}</h2>
                    <p class=${proj.desc}</p>
                    <img class="img-fluid d-block mx-auto" src=${proj.url} alt="">
                    <p>${proj.desc}</p>
                    <ul class="list-inline">
                      <li>${proj.publishedAt}</li>
                    </ul>
                    <button onclick="goToProj(this.id)" id="${proj.link}" class="btn btn-primary" data-dismiss="modal" type="button"><i class="fa fa-times"></i> Check it Out</button>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`

    $('.modal-open').html(strHTML).modal('show')
}

function onSubmit(){
var $email = $('#email').val()
var $subject = $('#subject').val()
var $message = $('#message').val()

    window.open(`https://mail.google.com/mail/u/0/?view=cm&fs=1&to=nathaliepalevich@gmail.com&su=${$subject}&body=${$message}`);
}

function goToProj(link){
  window.open(link)
}
