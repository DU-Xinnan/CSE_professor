var drawBarChart = require('./drawbar.js');
var data = require('./process_data.js');
function setLables(id,lable_id){
	var width = $(lable_id).width(),
	height = $(lable_id).height()
	category = {
		'Bachelor':0,
		'Masters':1,
		'Doctorate':2,
		'PostDoc':3
	},
	colors = ['#7fc97f','#beaed4','#fdc086','#ffff99'],
	categoryArr = ['Bachelor', 'Masters','Doctorate','PostDoc'],
	svg = d3.select(lable_id).append("svg")
			.attr("width",width)
			.attr("height",height),
	areaBox = svg.selectAll('.'+lable_id.substring(1))
				 .data(categoryArr)
				 .enter()
				 .append("g")
				 //.attr("class",'.'+lable_id),
	areaRect = areaBox.append('rect')
					  .attr('y',height*0.4)
					  .attr('x',function(d,i){
					  	return 20+width/4*i;
					  })
					  .attr("height",height*0.2)
					  .attr("width", height*0.2)
					  .attr("fill",function(d){
					  	return colors[category[d]];
					  })
					  .attr("opacity",0.8)
	areaText = areaBox.append('text')
					  .text(function(d,i){
					  	return d
					  })
					  .attr('y',height*0.4+15)
					  .attr('x', function(d,i){
					  	return 30+width/4*i+0.2*height;
					  })
					  .attr('fill',"grey")
	areaRect.on("mouseover",function(data){
		d3.select(this).style("cursor", "pointer")
		d3.select(this).attr('opacity',1);

		d3.select(lable_id).selectAll('rect')
		.filter(function(d){
			return d!=data;
		})
		.transition()
		.duration(300)
		.attr('opacity',0.3);

		d3.select(id).selectAll('rect')
		.filter(function(d){
			if(d!=undefined){
				return data!= d.z;
			}
			else{
				return true;
			}
		})
		.transition()
		.duration(300)
		.attr('opacity',0.3);
	})
	.on('mouseout',function(d){
		d3.select(lable_id).selectAll('rect')
		.transition()
		.duration(300)
		.attr('opacity',0.8);

		d3.select(id).selectAll('rect')
		.transition()
		.duration(300)
		.attr('opacity',1);
	})

	areaRect.on('click',function(d){
		var tempData = data.filter(function(item){
			return item.name == d;
		});
		d3.select(id).selectAll('rect')
		  .transition()
		  .duration(300)
		  .attr('x',0)
		  .attr('height',0);

		 d3.select(id).select("svg").remove();
		drawBarChart('left_bar', '#tooltip','#value', tempData);
	})


}
module.exports = setLables