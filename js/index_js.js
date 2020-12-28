var x = window.matchMedia("(max-width: 991.98px)")
windowChange(x)
x.addListener(windowChange)

var desktop_mobile = 1;
var touch_device = -1;

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
		desktop_mobile = 0; //For mobile view
		touch_device = -1;
	}
	else {
		desktop_mobile = 1; //For desktop view
		touch_device = -1;
	}
}
function touch() {
	touch_device = 1; //Touch device
	if (desktop_mobile === 1) {
		document.getElementsByClassName('about-redirect')[0].style.width = "350px";
		document.getElementsByClassName('about-redirect')[0].style.padding = "20px 40px";
		document.getElementsByClassName('about-btn')[0].style.display = "inline-block";
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