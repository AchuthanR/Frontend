var x = window.matchMedia("(max-width: 991.98px)")
windowChange(x)
x.addListener(windowChange)

var topics_open = -1;
var desktop_mobile = 1;
var touch_device = -1;

$(function () {
    if (x.matches) {
        $('.member').addClass('dropup')
        $('.topics-text').on('click', function () {
            document.getElementsByClassName('topics-menu')[0].style.display = "none";
            $('.topics-btn').removeClass('fa-minus')
            $('.topics-btn').addClass('fa-plus')
        })
        desktop_mobile = 0;
    }
    else {
        $('.topics-text').on('click', function () {
            document.getElementsByClassName('topics-menu')[0].style.display = "none";
            $('.topics-btn').removeClass('fa-minus')
            $('.topics-btn').addClass('fa-plus')
        })
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
    setTimeout(function() {
    if (touch_device !== 1) {
        document.getElementsByClassName('topics-btn')[0].style.display = "none";
    }
    }, 100)
}
$(function () {
    if (touch_device !== 1 && desktop_mobile === 0) {
        document.getElementsByClassName('topics-btn')[0].style.display = "none";
    }
})
function touch() {
    if (topics_open === -1) {
        document.getElementsByClassName('topics-btn')[0].style.display = "block";
        touch_device = 1; //Touch device
        if (desktop_mobile === 1) {
            document.getElementsByClassName('topics-btn')[0].style.setProperty('display', 'block', 'important');
            $('.topics-btn').addClass('fa-plus')
        }
        else {
            $('.topics-btn').addClass('fa-plus')
        }
    }
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
function topics_desktop_open() {
    $('.topics-btn').addClass('fa-minus')
    $('.topics-btn').removeClass('fa-plus')
    document.getElementsByClassName('topics-menu')[0].style.display = "block";
    topics_open = 1;
    if (desktop_mobile === 0) {
        document.getElementsByClassName('member')[0].style.display = "none";
        document.getElementsByClassName('not-a-member')[0].style.display = "none";
    }
}
document.addEventListener('touchend', function (evt) {
    if ($(evt.target).hasClass("topics-btn") || $(evt.target).hasClass("topics-text") || $(evt.target).hasClass("topics-menu") || $(evt.target).hasClass("dropdown-item")) {
        return ;
    }
    document.getElementsByClassName('topics-menu')[0].style.display = "none";
    topics_open = -1;
    $('.topics-btn').removeClass('fa-minus')
    $('.topics-btn').addClass('fa-plus')
})
function topics_desktop_close() {
    $('.topics-btn').removeClass('fa-minus')
    $('.topics-btn').addClass('fa-plus')
    document.getElementsByClassName('topics-menu')[0].style.display = "none";
    topics_open = -1;
    if (desktop_mobile === 0) {
        document.getElementsByClassName('member')[0].style.display = "block";
    }
}
function topics_mobile() {
    if (topics_open === -1) {
        $('.topics-btn').addClass('fa-minus')
        $('.topics-btn').removeClass('fa-plus')
        document.getElementsByClassName('topics-menu')[0].style.display = "block";
        topics_open = 1;
    }
    else {
        $('.topics-btn').removeClass('fa-minus')
        $('.topics-btn').addClass('fa-plus')
        document.getElementsByClassName('topics-menu')[0].style.display = "none";
        topics_open = -1;
    }
}
function context_menu(event) {
    event.preventDefault();
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
        if (topics_open === 1) {
            if (desktop_mobile === 1) {
                topics_desktop_close()
            }
            else {
                topics_mobile()
            }
        }
    }
}