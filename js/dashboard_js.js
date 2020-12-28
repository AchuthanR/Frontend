var x = window.matchMedia("(max-width: 991.98px)")
windowChange(x)
x.addListener(windowChange)

var mobile_navigation_caret = -1;

$(function () {
    if (x.matches) {
        desktop_mobile = 0;
    }
    else {
        desktop_mobile = 1;
    }
})
function windowChange(x) {
    if (x.matches) {
        for (let i = 0; i < document.getElementsByClassName('nav-link').length; i++) {
            document.getElementsByClassName('nav-link')[i].style.display = "none";
        }
        $('.fa-caret-up').addClass('fa-caret-down')
        $('.fa-caret-up').removeClass('fa-caret-up')
        mobile_navigation_caret = -1;
        desktop_mobile = 0;
    }
    else {
        for (let i = 0; i < document.getElementsByClassName('nav-link').length; i++) {
            document.getElementsByClassName('nav-link')[i].style.display = "block";
        }
        desktop_mobile = 1;
    }
}
function dashboard() {
    document.getElementsByClassName('dashboard')[0].style.display = "block";
    document.getElementsByClassName('view-published')[0].style.display = "none";
    document.getElementsByClassName('delete-published')[0].style.display = "none";
    document.getElementsByClassName('delete-topics')[0].style.display = "none";
    document.getElementsByClassName('edit-profile')[0].style.display = "none";
    $('.dashboard-btn').addClass('active')
    $('.view-published-btn').removeClass('active')
    $('.delete-published-btn').removeClass('active')
    $('.delete-topics-btn').removeClass('active')
    $('.edit-profile-btn').removeClass('active')
    if (desktop_mobile === 0) {
        for (let i = 0; i < document.getElementsByClassName('nav-link').length; i++) {
            document.getElementsByClassName('nav-link')[i].style.display = "none";
        }
        $('.fa-caret-up').addClass('fa-caret-down')
        $('.fa-caret-up').removeClass('fa-caret-up')
        mobile_navigation_caret = -1;
    }
}
function edit_profile() {
    document.getElementsByClassName('dashboard')[0].style.display = "none";
    document.getElementsByClassName('view-published')[0].style.display = "none";
    document.getElementsByClassName('delete-published')[0].style.display = "none";
    document.getElementsByClassName('delete-topics')[0].style.display = "none";
    document.getElementsByClassName('edit-profile')[0].style.display = "block";
    $('.dashboard-btn').removeClass('active')
    $('.view-published-btn').removeClass('active')
    $('.delete-published-btn').removeClass('active')
    $('.delete-topics-btn').removeClass('active')
    $('.edit-profile-btn').addClass('active')
    if (desktop_mobile === 0) {
        for (let i = 0; i < document.getElementsByClassName('nav-link').length; i++) {
            document.getElementsByClassName('nav-link')[i].style.display = "none";
        }
        $('.fa-caret-up').addClass('fa-caret-down')
        $('.fa-caret-up').removeClass('fa-caret-up')
        mobile_navigation_caret = -1;
    }
}
function delete_topics() {
    document.getElementsByClassName('dashboard')[0].style.display = "none";
    document.getElementsByClassName('view-published')[0].style.display = "none";
    document.getElementsByClassName('delete-published')[0].style.display = "none";
    document.getElementsByClassName('delete-topics')[0].style.display = "block";
    document.getElementsByClassName('edit-profile')[0].style.display = "none";
    $('.dashboard-btn').removeClass('active')
    $('.view-published-btn').removeClass('active')
    $('.delete-published-btn').removeClass('active')
    $('.delete-topics-btn').addClass('active')
    $('.edit-profile-btn').removeClass('active')
    if (desktop_mobile === 0) {
        for (let i = 0; i < document.getElementsByClassName('nav-link').length; i++) {
            document.getElementsByClassName('nav-link')[i].style.display = "none";
        }
        $('.fa-caret-up').addClass('fa-caret-down')
        $('.fa-caret-up').removeClass('fa-caret-up')
        mobile_navigation_caret = -1;
    }
}
function view_published() {
    document.getElementsByClassName('dashboard')[0].style.display = "none";
    document.getElementsByClassName('view-published')[0].style.display = "block";
    document.getElementsByClassName('delete-published')[0].style.display = "none";
    document.getElementsByClassName('delete-topics')[0].style.display = "none";
    document.getElementsByClassName('edit-profile')[0].style.display = "none";
    $('.dashboard-btn').removeClass('active')
    $('.view-published-btn').addClass('active')
    $('.delete-published-btn').removeClass('active')
    $('.delete-topics-btn').removeClass('active')
    $('.edit-profile-btn').removeClass('active')
    if (desktop_mobile === 0) {
        for (let i = 0; i < document.getElementsByClassName('nav-link').length; i++) {
            document.getElementsByClassName('nav-link')[i].style.display = "none";
        }
        $('.fa-caret-up').addClass('fa-caret-down')
        $('.fa-caret-up').removeClass('fa-caret-up')
        mobile_navigation_caret = -1;
    }
}
function delete_published() {
    document.getElementsByClassName('dashboard')[0].style.display = "none";
    document.getElementsByClassName('view-published')[0].style.display = "none";
    document.getElementsByClassName('delete-published')[0].style.display = "block";
    document.getElementsByClassName('delete-topics')[0].style.display = "none";
    document.getElementsByClassName('edit-profile')[0].style.display = "none";
    $('.dashboard-btn').removeClass('active')
    $('.view-published-btn').removeClass('active')
    $('.delete-published-btn').addClass('active')
    $('.delete-topics-btn').removeClass('active')
    $('.edit-profile-btn').removeClass('active')
    if (desktop_mobile === 0) {
        for (let i = 0; i < document.getElementsByClassName('nav-link').length; i++) {
            document.getElementsByClassName('nav-link')[i].style.display = "none";
        }
        $('.fa-caret-up').addClass('fa-caret-down')
        $('.fa-caret-up').removeClass('fa-caret-up')
        mobile_navigation_caret = -1;
    }
}
function navigate_mobile() {
    if (mobile_navigation_caret === -1) {
        for (let i = 0; i < document.getElementsByClassName('nav-link').length; i++) {
            document.getElementsByClassName('nav-link')[i].style.display = "block";
        }
        $('.fa-caret-down').addClass('fa-caret-up')
        $('.fa-caret-down').removeClass('fa-caret-down')
        mobile_navigation_caret = 1;
    }
    else {
        for (let i = 0; i < document.getElementsByClassName('nav-link').length; i++) {
            document.getElementsByClassName('nav-link')[i].style.display = "none";
        }
        $('.fa-caret-up').addClass('fa-caret-down')
        $('.fa-caret-up').removeClass('fa-caret-up')
        mobile_navigation_caret = -1;
    }
}