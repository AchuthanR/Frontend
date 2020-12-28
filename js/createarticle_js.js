var x = window.matchMedia("(max-width: 991.98px)")
windowChange(x)
x.addListener(windowChange)

var topics_open = -1;
var desktop_mobile = 1;
var touch_device = -1;
var publish_confirm = -1;

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
window.onbeforeunload = function (e) {
    e = e || window.event;
    // For IE and Firefox prior to version 4
    if (e) {
        e.returnValue = 'Dialog text here.';
    }
    // For Safari
    return 'Dialog text here.';
}
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
    setTimeout(function () {
        if (touch_device !== 1) {
            document.getElementsByClassName('topics-btn')[0].style.display = "none";
        }
    }, 100)
}
window.onbeforeunload = function (e) {
    e = e || window.event;
    // For Safari
    return 'Changes you made may not be saved.';
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
$(document).ready(function (x) {
    $('.overlay').on('click', function (evt) {
        if ($(evt.target).hasClass("publish-confirmation") || $(evt.target).hasClass("publish-topic") || $(evt.target).hasClass("publish-title") || $(evt.target).hasClass("publish-no") || $(evt.target).hasClass("publish-yes")) {
            return;
        }
        if (publish_confirm === 1) {
            $('.publish-no').click()
        }
    })
});
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
        return;
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
function dropdown() {
    document.getElementById("dropdown").style.marginBottom = ($('.select-topic-menu').outerHeight() - 40) + "px";
    document.getElementsByClassName("select-topic")[0].style.backgroundImage = "linear-gradient(to right, #2B32B2, #1488CC)";
    document.getElementsByClassName("select-topic")[0].style.border = "1px solid rgb(28, 181, 224)";
    document.getElementsByClassName("select-topic")[0].style.color = "white";
    $('#dropdown').on('hide.bs.dropdown', function () {
        document.getElementById("dropdown").style.marginBottom = "0px";
        document.getElementsByClassName("select-topic")[0].style.backgroundImage = "none";
        document.getElementsByClassName("select-topic")[0].style.border = "1px solid lightseagreen";
        document.getElementsByClassName("select-topic")[0].style.color = "lightseagreen";
    })
    var x = event.which || event.keyCode;
    if (x == 27) { //ESC key
        document.getElementById("dropdown").style.marginBottom = "0px";
        document.getElementsByClassName("select-topic")[0].style.backgroundImage = "none";
        document.getElementsByClassName("select-topic")[0].style.border = "1px solid lightseagreen";
        document.getElementsByClassName("select-topic")[0].style.color = "lightseagreen";
    }
}
function topic_choose(text) {
    document.getElementsByClassName("select-topic")[0].innerHTML = text;
    document.getElementById("dropdown").style.marginBottom = "0px";
}
function publish() {
    publish_confirm = 1;
    document.getElementsByClassName("publish-topic")[0].innerHTML = document.getElementsByClassName("select-topic")[0].innerHTML;
    document.getElementsByClassName("publish-title")[0].innerHTML = document.getElementById("title-name").value;
    document.getElementsByClassName("publish-topic")[0].style.color = "lightseagreen";
    document.getElementsByClassName("publish-topic")[0].style.display = "inline-block";
    document.getElementsByClassName("publish-title")[0].style.color = "lightseagreen";
    document.getElementsByClassName("publish-title")[0].style.display = "inline-block";
    $('.publish-confirmation').addClass('slideInUp')
    document.getElementsByClassName('overlay')[0].style.msDisplay = "flex";
    document.getElementsByClassName('overlay')[0].style.display = "flex";
    document.getElementsByClassName("publish-confirmation")[0].style.display = "block";
    setTimeout(function() {
        $('.publish-confirmation').removeClass('slideInUp')
        $('.publish-no').on('click touchend', function () {
            publish_confirm = -1;
            $('.publish-confirmation').addClass('slideOutDown')
            setTimeout(function () {
                $('.publish-confirmation').removeClass('slideOutDown')
                document.getElementsByClassName('publish-confirmation')[0].style.display = "none";
                document.getElementsByClassName('overlay')[0].style.display = "none";
            }, 700)
        })
        $('.publish-yes').on('click touchend', function () {
            publish_confirm = -1;
            $('.publish-confirmation').addClass('zoomOut')
            setTimeout(function () {
                $('.publish-confirmation').removeClass('zoomOut')
                document.getElementsByClassName('publish-confirmation')[0].style.display = "none";
            }, 700)
        })
    }, 900)
}
function published() {
    window.scrollTo(0, 0)
    location.href = "create";
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
        if (publish_confirm === 1) {
            $('.publish-no').click()
        }
    }
}