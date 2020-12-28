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
    setTimeout(function () {
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
$(document).ready(function () {
    const params = new URLSearchParams(window.location.search);
    if (params.has('redirect')) {
        if (params.get('redirect') === 'topicSuccess') {
            created()
        }
        else if (params.get('redirect') === 'topicFailure') {
            create_failure()
        }
        else if (params.get('redirect') === 'articleSuccess') {
            published()
        }
        else if (params.get('redirect') === 'articleFailure') {
            publish_failure()
        }
    }
})
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
function new_topic() {
    document.getElementsByClassName('new-topic')[0].style.backgroundColor = "black";
    document.getElementsByClassName('new-topic')[0].style.color = "white";
    $('.new-topic').addClass('zoomOut')
    $('.new-article').addClass('fadeOutRightBig')
    setTimeout(function () {
        $('.new-topic').removeClass('zoomOut')
        $('.new-article').removeClass('fadeOutRightBig')
    }, 900)
    setTimeout(function () {
        location.href = "createtopic";
    }, 800)
}
function new_article() {
    document.getElementsByClassName('new-article')[0].style.backgroundColor = "black";
    document.getElementsByClassName('new-article')[0].style.color = "white";
    $('.new-article').addClass('zoomOut')
    $('.new-topic').addClass('fadeOutRightBig')
    setTimeout(function () {
        $('.new-article').removeClass('zoomOut')
        $('.new-topic').removeClass('fadeOutRightBig')
    }, 900)
    setTimeout(function () {
        location.href = "createarticle";
    }, 800)
}
function created() {
    setTimeout(function () {
        $('.created').addClass('slideInDown')
        document.getElementsByClassName('overlay')[0].style.msDisplay = "flex";
        document.getElementsByClassName('overlay')[0].style.display = "flex";
        document.getElementsByClassName("created")[0].style.display = "flex";
        setTimeout(function () {
            $('.created').removeClass('slideInDown')
            $('.created').removeClass('slideOutUp')
            setTimeout(function () {
                $('.created').removeClass('slideOutUp')
                document.getElementsByClassName("created")[0].style.display = "none";
                document.getElementsByClassName('overlay')[0].style.display = "none";
            }, 1500)
        }, 1000)
    }, 500)
}
function create_failure() {
    setTimeout(function () {
        $('.create-failure').addClass('slideInDown')
        document.getElementsByClassName('overlay')[0].style.msDisplay = "flex";
        document.getElementsByClassName('overlay')[0].style.display = "flex";
        document.getElementsByClassName("create-failure")[0].style.display = "inline-flex";
        setTimeout(function () {
            $('.create-failure').removeClass('slideInDown')
            $('.create-failure').removeClass('slideOutUp')
            setTimeout(function () {
                $('.create-failure').removeClass('slideOutUp')
                document.getElementsByClassName("create-failure")[0].style.display = "none";
                document.getElementsByClassName('overlay')[0].style.display = "none";
            }, 1500)
        }, 1000)
    }, 500)
}
function published() {
    setTimeout(function () {
        $('.published').addClass('slideInDown')
        document.getElementsByClassName('overlay')[0].style.msDisplay = "flex";
        document.getElementsByClassName('overlay')[0].style.display = "flex";
        document.getElementsByClassName("published")[0].style.display = "inline-flex";
        setTimeout(function () {
            $('.published').removeClass('slideInDown')
            $('.published').removeClass('slideOutUp')
            setTimeout(function () {
                $('.published').removeClass('slideOutUp')
                document.getElementsByClassName("published")[0].style.display = "none";
                document.getElementsByClassName('overlay')[0].style.display = "none";
            }, 1500)
        }, 1000)
    }, 500)
}
function publish_failure() {
    setTimeout(function () {
        $('.publish-failure').addClass('slideInDown')
        document.getElementsByClassName('overlay')[0].style.msDisplay = "flex";
        document.getElementsByClassName('overlay')[0].style.display = "flex";
        document.getElementsByClassName("publish-failure")[0].style.display = "inline-flex";
        setTimeout(function () {
            $('.publish-failure').removeClass('slideInDown')
            $('.publish-failure').removeClass('slideOutUp')
            setTimeout(function () {
                $('.publish-failure').removeClass('slideOutUp')
                document.getElementsByClassName("publish-failure")[0].style.display = "none";
                document.getElementsByClassName('overlay')[0].style.display = "none";
            }, 1500)
        }, 1000)
    }, 500)
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