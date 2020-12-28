var x = window.matchMedia("(max-width: 991.98px)")
windowChange(x)
x.addListener(windowChange)

var sidebar_open = -1;
var topics_open = -1;
var outline_open = -1;
var desktop_mobile = 1;
var touch_device = -1;
var dark_mode = -1;
var swipe_y1 = -1;
var swipe_y2 = -1;

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
        desktop_mobile = 0; //For mobile view
        touch_device = -1;
        if ($('.offcanvas-collapse').hasClass('open') && dark_mode === -1) {
            document.getElementsByClassName('navbar')[0].style.backgroundColor = "black";
        }
    }
    else {
        $('.member').removeClass('dropup')
        desktop_mobile = 1; //For desktop view
        touch_device = -1;
        $('#sidebar').removeClass('slideInUp')
        if (document.getElementsByClassName('navbar')[0]) {
            document.getElementsByClassName('navbar')[0].style.backgroundColor = "var(--navbar-bg-color)";
        }
    }
    setTimeout(function() {
    if (touch_device !== 1) {
        document.getElementsByClassName('topics-btn')[0].style.display = "none";
    }
    }, 100)
    if (desktop_mobile === 0 && document.getElementsByClassName('article')[0]) {
        document.getElementsByClassName('article')[0].style.marginLeft = "8%";
    }
    if (desktop_mobile === 1 && document.getElementsByClassName('article')[0] && sidebar_open === -1) {
        document.getElementsByClassName('article')[0].style.marginLeft = "27%";
    }
    if (desktop_mobile === 1 && document.getElementsByClassName('article')[0] && sidebar_open === 1) {
        document.getElementsByClassName('article')[0].style.marginLeft = "calc(27% + 150px)";
    }
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
            document.getElementsByClassName('navbar')[0].style.backgroundColor = "black";
        }
        else {
            document.getElementsByClassName('navbar')[0].style.backgroundColor = "var(--navbar-bg-color)";
        }
    })
})
$(document).ready(function (x) {
    $('.dismiss-desktop, .dismiss-mobile').on('click', function () {
        if (desktop_mobile === 1 && outline_open === -1) {
            $('#sidebar').addClass('sidebar-exit')
            document.getElementsByClassName('article')[0].style.marginLeft = "27%";
        }
        else if (outline_open === -1) {
            $('#sidebar').addClass('slideOutDown')
        }
        if (outline_open === -1) {
            setTimeout(function () {
                if (desktop_mobile === 1) {
                    document.getElementById('sidebar').style.display = "none";
                    sidebar_open = -1;
                    $('#sidebar').removeClass('sidebar-exit')
                    document.getElementsByClassName('outline-icon')[0].style.display = "inline-block";
                }
                $('html').css({ 'overflow' : 'visible' });
                $(document).unbind('scroll');
            }, 600)
            setTimeout(function () {
                if (desktop_mobile === 0) {
                    document.getElementById('sidebar').style.display = "none";
                    sidebar_open = -1;
                    $('#sidebar').removeClass('slideOutDown')
                    document.getElementsByClassName('outline-icon')[0].style.display = "inline-block";
                }
                document.getElementById('sidebar').style.bottom = "-50px";
                $('html').css({ 'overflow' : 'visible' });
                $(document).unbind('scroll');
            }, 900)
        }
        $('a[aria-expanded=false]').attr('aria-expanded', 'true');
    });

    $('.overlay').on('click', function (evt) {
        if (!$(evt.target).hasClass("outline") && evt.target.tagName !== "H2" && evt.target.tagName !== "A" && evt.target.tagName !== "LI" && evt.target.tagName !== "L") {
            outline_close();
        }
    })

    $('.sidebar-icon').on('click', function () {
        $('html').css({ 'overflow': 'hidden' });
        $(document).bind('scroll');
        if (desktop_mobile === 1) {
            $('#sidebar').addClass('sidebar-enter')
            document.getElementsByClassName('article')[0].style.marginLeft = "calc(27% + 150px)";
        }
        else {
            $('#sidebar').addClass('slideInUp')
        }
        document.getElementById('sidebar').style.display = "inline-block";
        sidebar_open = 1;
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
        setTimeout(function () {
            if (desktop_mobile === 1) {
                $('#sidebar').removeClass('sidebar-enter')
            }
        }, 500)
        setTimeout(function () {
            if (desktop_mobile === 0) {
                $('#sidebar').removeClass('slideInUp')
            }
        }, 900)
        document.getElementsByClassName('outline-icon')[0].style.display = "none";
    });

    //While opening the post page sidebar should be open
    $(function () {
        $('.sidebar-icon').click()
    })

    deleteChild();
    outlineCreate();

    $('.outline').on('click', function (e) {
        if (e.target.tagName.toLowerCase() === 'a') {
            document.addEventListener('animationend', function () {
                window.scrollBy(0, -60);
            });
            outline_close();
        }
    })

    //LIGHT THEME OR DARK THEME
    initial_color_theme()
    window.matchMedia('(prefers-color-scheme: dark)').addListener(e => {
        if (e.matches) {
            dark_mode = -1;
            dark_mode_switch()
            document.body.setAttribute("data-theme", "dark");
            localStorage.setItem("theme", "dark");
        }
        else {
            dark_mode = 1;
            dark_mode_switch()
            document.body.setAttribute("data-theme", "light");
            localStorage.setItem("theme", "light");
        }
    });

    window.onscroll = function () {
        scrollProgress();
    };
    $('.article').readtime({
        class: 'readtime',  // Class name of the output element
        format: '# min read',// # == the number of minutes
        images: 12,          // Seconds per image, false to disable
        wpm: 275,         // Words per minute, defaults to average
        wrapper: 'time'        // What the output will be wrapped in
    });
});
function swipe1(event) {
    if ((event.target.nodeName !== 'UL') && (event.target.nodeName !== 'LI') && (event.target.nodeName !== 'A') && ($(event.target).attr('class').indexOf('hoz-ruler') !== -1 || $(event.target).attr('class').indexOf('dismiss-mobile') !== -1 || $(event.target).attr('class') === 'sidebar-header' || event.target.id === 'sidebar')) {
        swipe_y1 = event.touches[0].clientY;
    }
}
function swipe2(event) {
    if (swipe_y1 === -1 && swipe_y2 === -1) {
        return ;
    }
    swipe_y2 = event.touches[0].clientY;
    if (swipe_y1 < swipe_y2) {
        document.getElementById('sidebar').style.bottom = -50 + swipe_y1 - swipe_y2 + "px";
    }
    else {
        document.getElementById('sidebar').style.transition = "bottom 0.4s ease-in-out";
        document.getElementById('sidebar').style.bottom = "-50px";
        setTimeout(function () {
            document.getElementById('sidebar').style.transition = "none";
        }, 400)
    }
}
function swipe3() {
    if (swipe_y1 + (document.getElementById('sidebar').offsetHeight / 2) < swipe_y2) {
        swipe_y1 = -1;
        swipe_y2 = -1;
        $('.dismiss-mobile').click()
    }
    else {
        swipe_y1 = -1;
        swipe_y2 = -1;
        document.getElementById('sidebar').style.transition = "bottom 0.4s ease-in-out";
        document.getElementById('sidebar').style.bottom = "-50px";
        setTimeout(function () {
            document.getElementById('sidebar').style.transition = "none";
        }, 400)
    }
}
function scrollProgress() {
    var currentState = document.body.scrollTop || document.documentElement.scrollTop;
    var pageHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrollStatePercentage = (currentState / pageHeight) * 100;
    document.querySelector(".page-scroll-indicator > .progress").style.width = scrollStatePercentage + "%";
}
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
function initial_color_theme() {
    var theme = "dark"; //default to light
    //local storage is used to override OS theme settings
    if (localStorage.getItem("theme")) {
        if (localStorage.getItem("theme") == "light") {
            var theme = "light";
        }
    }
    else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
        var theme = "light";
    }
    if (theme == "dark") {
        dark_mode = -1;
        dark_mode_switch()
        localStorage.setItem("theme", "dark");
    }
    else {
        dark_mode = 1;
        dark_mode_switch()
        document.body.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
    }
}
function dark_mode_switch() {
    if (dark_mode === -1) {
        $('.fa-moon').addClass('fa-sun')
        $('.fa-moon').removeClass('fa-moon')
        if (document.getElementsByClassName('latex')) {
            for (let j = 0; j < document.getElementsByClassName('latex').length; j++) {
                document.getElementsByClassName('latex')[j]["src"] = document.getElementsByClassName('latex')[j]["src"].replace("Black", "White");
            }
        }
        dark_mode = 1;
        document.body.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
    }
    else {
        $('.fa-sun').addClass('fa-moon')
        $('.fa-sun').removeClass('fa-sun')
        if (document.getElementsByClassName('latex')) {
            for (let j = 0; j < document.getElementsByClassName('latex').length; j++) {
                document.getElementsByClassName('latex')[j]["src"] = document.getElementsByClassName('latex')[j]["src"].replace("White", "Black");
            }
        }
        dark_mode = -1;
        document.body.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
    }
    if ($('.offcanvas-collapse').hasClass('open') && dark_mode === -1) {
        document.getElementsByClassName('navbar')[0].style.backgroundColor = "black";
    }
    else {
        document.getElementsByClassName('navbar')[0].style.backgroundColor = "var(--navbar-bg-color)";
    }
}
function deleteChild() {
    var outlineElement = document.getElementsByClassName('outline')[0];
    var articleElement = document.getElementsByClassName('article')[0];
    let children = articleElement.childNodes;
    for (let i = 0; i < children.length; i++) {
        if (children[i].tagName === "H2") {
            for (let j = 0; j < outlineElement.childNodes.length; j++) {
                if (outlineElement.childNodes[j].tagName === "OL") {
                    var e = outlineElement.childNodes[j];
                    var child = e.lastElementChild;
                    while (child) {
                        e.removeChild(child);
                        child = e.lastElementChild;
                    }
                    break;
                }
            }
        }
    }
}
function outlineCreate() {
    var outlineElement = document.getElementsByClassName('outline')[0];
    var articleElement = document.getElementsByClassName('article')[0];
    outlineElement.childNodes[3].innerHTML = articleElement.childNodes[1].innerHTML;
    let children = articleElement.childNodes;
    let k = 1;
    for (let i = 0; i < children.length; i++) {
        if (children[i].tagName === "H2") {
            for (let j = 0; j < outlineElement.childNodes.length; j++) {
                if (outlineElement.childNodes[j].tagName === "OL") {
                    var result = children[i].innerHTML
                        .trim()
                        .toLowerCase()
                        .replace(/([^A-Z0-9]+)(.)/ig,
                            function (match) {
                                return arguments[2].toUpperCase();
                            }
                        );
                    $("<a>").appendTo($("<li>").appendTo(outlineElement.childNodes[j]));
                    outlineElement.childNodes[j].childNodes[k].childNodes[0]["target"] = "_self";
                    outlineElement.childNodes[j].childNodes[k].childNodes[0]["href"] = "#" + result;
                    outlineElement.childNodes[j].childNodes[k].childNodes[0].innerHTML = children[i].innerHTML;
                    children[i]["id"] = result;
                    k = k + 1;
                }
            }
        }
    }
}
function outline_show() {
    if (outline_open === -1 && sidebar_open === -1) {
        $('.outline').addClass('flipInX')
        document.getElementsByClassName('outline-icon')[0].style.display = "none";
        document.getElementsByClassName('overlay')[0].style.msDisplay = "flex";
        document.getElementsByClassName('overlay')[0].style.display = "flex";
        document.getElementsByClassName('outline')[0].style.display = "block";
        outline_open = 1;
        setTimeout(function () {
            $('.outline').removeClass('flipInX')
        }, 900)
    }
}
function outline_close() {
    if (outline_open === 1) {
        $('.outline').addClass('flipOutX')
        outline_open = -1;
        setTimeout(function () {
            $('.outline').removeClass('flipOutX')
            document.getElementsByClassName('outline')[0].style.display = "none";
            document.getElementsByClassName('overlay')[0].style.display = "none";
            document.getElementsByClassName('outline-icon')[0].style.display = "inline-block";
        }, 900)
    }
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
    if (e.shiftKey && e.which == 66) { //Shift + b to open the outline box
        outline_show();
    }
    if (e.which == 27) {
        $('.dismiss-desktop').click()
        $('.dismiss-mobile').click()
        if (topics_open === 1) {
            if (desktop_mobile === 1) {
                topics_desktop_close()
            }
            else {
                topics_mobile()
            }
        }
        outline_close();
    }
}