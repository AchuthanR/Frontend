var x = window.matchMedia("(max-width: 991.98px)")
windowChange(x)
x.addListener(windowChange)

var desktop_mobile = 1;
var touch_device = -1;

$(function () {
    if (x.matches) {
        $('.member').addClass('dropup')
        desktop_mobile = 0;
    }
    else {
        $('.member').removeClass('dropup')
        desktop_mobile = 1;
    }
})
function windowChange(x) {
    if (x.matches) {
        $('.member').addClass('dropup')
        if ($('.offcanvas-collapse').hasClass('open')) {
            $('.navbar').removeClass('bg-dark')
            document.getElementsByClassName('navbar')[0].style.backgroundColor = "black";
        }
        desktop_mobile = 0; //For mobile view
        touch_device = -1;
    }
    else {
        $('.member').removeClass('dropup')
        if ($('.offcanvas-collapse').hasClass('open')) {
            $('.navbar').addClass('bg-dark')
            document.getElementsByClassName('navbar')[0].style.backgroundColor = "#343a40";
        }
        desktop_mobile = 1; //For desktop view
        touch_device = -1;
    }
}
function touch() {
    touch_device = 1; //Touch device
}
$(function () {
    $('[data-toggle="offcanvas"]').on('click', function () {
        $('.offcanvas-collapse').toggleClass('open')
        if ($('.offcanvas-collapse').hasClass('open')) {
            $('.navbar').removeClass('bg-dark')
            document.getElementsByClassName('navbar')[0].style.backgroundColor = "black";
        }
        else {
            $('.navbar').addClass('bg-dark')
            document.getElementsByClassName('navbar')[0].style.backgroundColor = "#343a40";
        }
    })
})
function resources_show() {
    $('.resources-list').addClass('flipInX')
    document.getElementsByClassName('overlay')[0].style.msDisplay = "flex";
    document.getElementsByClassName('overlay')[0].style.display = "flex";
    document.getElementsByClassName('resources-list')[0].style.display = "block";
    setTimeout(function () {
        $('.resources-list').removeClass('flipInX')
    }, 900)
}
function resources_close() {
    $('.resources-list').addClass('flipOutX')
    setTimeout(function () {
        $('.resources-list').removeClass('flipOutX')
        document.getElementsByClassName('resources-list')[0].style.display = "none";
        document.getElementsByClassName('overlay')[0].style.display = "none";
    }, 900)
}
function copy_clipboard(str) {
    const el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    alert("Copied the text: " + str);
}
document.onkeydown = function (e) {
    var e = e || window.event; // for IE to cover IEs window event-object
    if (e.which == 27) {
        resources_close();
    }
}