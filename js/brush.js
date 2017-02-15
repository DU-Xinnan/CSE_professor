var data = require('./get_data.js');
var d3 = require("d3");
function draw_brush(id){
    var width = $(".timeline").width();
    console.log(width);
    var height = $(id).height();
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
    data.push({"date":parseInt(key).toString(), "price":year[key]});
    }
    console.log(data);
    var svg = d3.select(id),
        margin = {top: 0, right: 10, bottom: 0, left: 5},
        margin2 = {top: 50, right: 10, bottom: 20, left: 5},
        width = width - margin.left - margin.right,
        height = height - margin.top - margin.bottom,
        height2 = height- margin2.top - margin2.bottom;


    var x = d3.scaleTime().range([0, width]),
        x2 = d3.scaleLinear().range([0, width]),
        y = d3.scaleLinear().range([height, 0]),
        y2 = d3.scaleLinear().range([height2, 0]);

    var xAxis2 = d3.axisBottom(x2).ticks(20).tickSize(-height2)


    var brush = d3.brushX()
        .extent([[0, 0], [width, height2]])
        .on("brush end", brushed);

    var area2 = d3.area()
        .curve(d3.curveMonotoneX)
        .x(function(d) { return x2(d.date); })
        .y0(height2)
        .y1(function(d) { return y2(d.price); });

    var context = svg.append("g")
        .attr("class", "context")
        .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([0, d3.max(data, function(d) { return d.price; })]);
    x2.domain(x.domain());
    y2.domain(y.domain());

    context.append("path")
        .datum(data)
        .attr("class", "area")
        .attr("d", area2);

    context.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height2 + ")")
        .call(xAxis2);

    context.append("g")
        .attr("class", "brush")
        .call(brush)
        .call(brush.move, x.range());
    var texts = svg.selectAll("text")
    texts.attr("color","white");


    function brushed() {
    if (d3.event.sourceEvent && d3.event.sourceEvent.type === "zoom") return; // ignore brush-by-zoom
    var s = d3.event.selection || x2.range();
    console.log(d3.event.selection);

    }
}
module.exports = draw_brush