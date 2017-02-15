
var init_layout = function(){
	var height = window.innerHeight;
	var navhead = $('nav').height();
	console.log(navhead);
	height -= navhead;
	$('.main').css('height',height);
	$('.main').css('top',navhead);
	$('.lable').css('height',height*0.1);
	$('.bar_chart').css('height',height*0.89);
	$('.school').css('height',height*0.4);
	$('#selection').css('height',height*0.2);
	$('.pie_chart').css('height',height*0.39);
	$('#University_logo').css('height',height*0.3).css('cursor','pointer');
	$('#University_logo').css('width',height*0.3*1.1);
	$('#University_logo').attr('src',"img/GT.png");
	var logo_padding = ($('.school').width() - height*0.3*1.1)/2;
	$('#University_logo').css('margin-left', logo_padding);
	var pie_margin = ($('.pie_chart').width() - $('#pie').width())/2;
	$('#pie').css('margin-left',pie_margin);
}
module.exports = init_layout;
