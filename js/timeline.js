var data = require('./get_data.js');
var year = {};
for(let i=0;i<data.length;i++){
  if(data[i].JoinYear!=""){
    if (data[i].JoinYear.toString() in year){
      year[data[i].JoinYear.toString()]+=1;
    }
    else {
      year[data[i].JoinYear.toString()]=1;
    }
  }
}
data = []
for(var key in year){
  data.push({"date":parseInt(key), "value":year[key]});
}

function draw_timeline(){
  var margin = {top: 10, right: 20, bottom: 30, left: 20},
      width = $('.timeline').width() - margin.left - margin.right,
      height = $('.timeline').height() - margin.top - margin.bottom;
  // Parse the date / time
  var parseDate = d3.time.format("%Y").parse;

  var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

  var y = d3.scale.linear().range([height, 0]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")
      .ticks(4)
      .tickFormat(d3.time.format("%Y-%m"));

  // var yAxis = d3.svg.axis()
  //     .scale(y)
  //     .orient("left")
  //     .ticks(10);

  var svg = d3.select(".timeline").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

  //d3.csv("data/bar-data.csv", function(error, data) {
      data.forEach(function(d) {
          d.date = parseDate(d.date.toString());
          d.value = +d.value;
      });
    x.domain(data.map(function(d) { return d.date; }));
    y.domain([0, d3.max(data, function(d) { return d.value; })]);

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
      .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", "-.55em")
        .attr("transform", "rotate(-90)" )
        .attr("color","white");

    // svg.append("g")
    //     .attr("class", "y axis")
    //     .call(yAxis)
    //   .append("text")
    //     .attr("transform", "rotate(-90)")
    //     .attr("y", 6)
    //     .attr("dy", ".71em")
    //     .style("text-anchor", "end")
    //     .text("Value ($)");

    var bars = svg.selectAll("bar")
        .data(data)
      .enter().append("rect")
        .style("fill", "steelblue")
        bars.attr("x", function(d) { return x(d.date); })
        .attr("width", x.rangeBand())
        .attr("y",height)
        .transition()
        .duration(500)
        // .delay(function(d,i){
        //   return 100*i;
        // })
        .attr("y", function(d) { return y(d.value); })
        .attr("height", function(d) { return height - y(d.value); });
      bars.on('mouseover',function(d){
        //d3.select(this).style('fill', 'blue');
        var self = this;
        bars.filter(function(){
          return self!=this;
        })
        .transition()
        .duration(200)
        .attr('opacity',0.5)
      })
      .on('mouseout',function(d){
       // d3.select(this).style('fill', 'steelblue');
        var self = this;
        bars.filter(function(){
          return self!=this;
        })
        .transition()
        .duration(500)
        .attr('opacity',1)
      })
 // });
}

module.exports = draw_timeline
