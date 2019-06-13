// JavaScript Document

$(document).ready(function(){
// for css animation
new WOW().init();

function Admin() {
	$("#user-admin").click(function(){
		$(".admin-menu").toggle();
		//$(".admin-menu").addClass('bounceInDown');	
	});
	$(".admin-menu ul li a").click(function(){
		//$(".admin-menu").removeClass('bounceInDown');
		$(".admin-menu").hide();	
	});
	$(".nv-btn a").click(function(){
		$(".sidenav").toggleClass('sidenav-slide');
		$(".main-dash").toggleClass('main-dash-slide');
	});
	$('[data-toggle="tooltip"]').tooltip()  
	
$(".noti-open").click(function(){
	$(".notification-bx").toggle();	
	$(".notification-bx").toggleClass('animateOpen');
	
	//$(".notification-bx").toggle('animateClose animateOpen');
});
$(".attactment .btn").click(function(){
	$(this).siblings('#fileUpload').trigger("click");
});
	
}
setInterval(function(){ Admin() }, 100);
  
}); // document ready end here