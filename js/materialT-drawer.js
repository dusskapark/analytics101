/*
 * Material Offcanvas for Tistory v2.0
 * http://nubiz.tistory.com/547
 * 2015-02-12 '뭐하라'제작
 */
$(".drawer-toggle").click(function() {
	$("#drawer,html").addClass("opened");
	window.location.hash = "#drawer";
});
window.onhashchange = function() {
	if (location.hash != "#drawer") {
		$("#drawer,html").removeClass("opened");
	}
};

$("#drawer-tmp-category .c_cnt").remove();
var tmpDom = $("#drawer-tmp-category ul ul")[0];
$(tmpDom).prepend('<li><a href="/category">모든 글 보기</a></li>');
$(tmpDom).children("li").each(function() {
	var b = $(this).has("ul").children("a");
	var a = $(b).attr("href");
	$(b).attr({
		"href": "",
		"onclick": "return false"
	});
	$(b).parent().children("ul").prepend('<li><a href="' + a + '">관련 글 모두 보기</a></li>');
	$(b).parent().addClass("actoggle");
	$(b).append('<i class="ic-expand_more open"></i><i class="ic-expand_less close"></i>');
	$(this).children("a").prepend('<i class="ic-folder"></i>');
});

$("#drawer #drawer-category").append(tmpDom);

$(document).ready(function() {
	var a = $("#ttMenubarInnerWrap > div.tt_menubar_logout a");
	if (a.text() == "로그아웃") {
		$("#drawer_login").html('<i class="ic-lock_open"></i>');
		$("#drawer_admin").show();
		$("#drawer_login").wrap("<a href='" + a.attr("href") + "' title='로그아웃'></a>");
	} else {
		$("#drawer_login").html('<i class="ic-settings"></i>');
		$("#drawer_admin").hide();
		$("#drawer_login").wrap("<a href='/admin/center' title='로그인'></a>");
	}
}); //로그인아웃 체크
$(".actoggle").click(function() {
	$(this).children("ul").toggle(350);
	$(this).toggleClass("acopen");
});