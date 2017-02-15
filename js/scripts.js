var drawBarChart = require('./drawbar.js');
var init_layout = require('./init_layout.js');
var draw_timeline = require('./timeline.js');
var data = require('./process_data.js');
var setLables = require('./bar_lables.js');
var draw_pie = require('./draw_pie.js');
var draw_brush = require('./brush.js')

init_layout();
drawBarChart('left_bar', '#tooltip','#value', data);
drawBarChart('right_bar', '#tooltip','#value_right', data);
setLables('#left_bar', '#lable_left');
setLables('#right_bar', '#lable_right');
draw_pie("#pie_chart",data,"GT");
$('#University_logo').click(function(){
    d3.select('#left_bar').selectAll('rect')
      .transition()
      .duration(300)
      .attr('height',0)
      .attr('x',0);
      d3.select('#left_bar').select("svg").remove();
      drawBarChart('left_bar', '#tooltip','#value', data);
});

var svg = d3.select('#right_bar');
colours = d3.scale.category20()
groups = svg.selectAll('g')
  .style('fill', function (d, i) {
  return colours(i);
})
draw_brush("#selection");
