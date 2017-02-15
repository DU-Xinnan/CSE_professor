var data = require('./process_data.js');
function drawBarChart(id, tooltip,value_id, data){
    var  category = {
        'Bachelor':0,
        'Masters':1,
        'Doctorate':2,
        'PostDoc':3
    },
    colors = ['#7fc97f','#beaed4','#fdc086','#ffff99'],
    margins = {
    top: 12,
    left: 40,
    right: 24,
    bottom: 24
    },
    width = $('#'+id).width() - margins.left - margins.right,
    height = $('#'+id).height() - margins.top - margins.bottom,
    dataset = data,
    series = dataset.map(function (d) {
        return d.name;
    }),
    dataset = dataset.map(function (d) {
        return d.data.map(function (o, i) {
            // Structure it so that your numeric
            // axis (the stacked amount) is y
            return {
                y: o.count,
                x: o.University,
                z: d.name
            };
        });
    }),
    stack = d3.layout.stack();

    stack(dataset);
    console.log(dataset);
    var dataset = dataset.map(function (group) {
        return group.map(function (d) {
            // Invert the x and y values, and y0 becomes x0
            return {
                x: d.y,
                y: d.x,
                x0: d.y0,
                z: d.z
            };
        });
    }),
        svg = d3.select('#'+id)
            .append('svg')
            .attr('width', width + margins.left + margins.right)
            .attr('height', height + margins.top + margins.bottom)
            .append('g')
            .attr('transform', 'translate(' + margins.left + ',' + margins.top + ')'),
        xMax = d3.max(dataset, function (group) {
            return d3.max(group, function (d) {
                return d.x + d.x0;
            });
        }),
        xScale = d3.scale.linear()
            .domain([0, xMax])
            .range([0, width]),
        months = dataset[0].map(function (d) {
            return d.y;
        }),
       // _ = console.log(months),
        yScale = d3.scale.ordinal()
            .domain(months)
            .rangeRoundBands([0, height], .1),

        xAxis = d3.svg.axis()
          .scale(xScale)
          .orient('bottom'),
        yAxis = d3.svg.axis()
          .scale(yScale)
          .orient('left'),

        //colours = d3.scale.category20(),
        groups = svg.selectAll('g')
            .data(dataset)
            .enter()
            .append('g')
            // .style('fill', function (d, i) {
            //     console.log(d;
            //     return colors[category[d.z]];
            // }),
        rects = groups.selectAll('rect')
          .data(function (d) { return d;})
          .enter()
          .append('rect')
        rects.attr('x', function (d) { return 0;})
          .attr('y', function (d, i) { return yScale(d.y);})
          .attr('height', function (d) { return yScale.rangeBand();})
          .attr('width', function (d) { return 0;})
          .style("fill",function(d,i){
                return colors[category[d.z]];
          })
          .transition()
          //.delay(function (d, i) { return i*30; })
          .duration(500)
          .attr('width', function (d) { return xScale(d.x);})
          .attr('x', function (d) { return xScale(d.x0);})
        // d3.select('#'+id).selectAll('rect')
        //   .on('mouseover', function (d) {
        //   var xPos = parseFloat(d3.select(this).attr('x')) / 2 + width / 2;
        //   var yPos = parseFloat(d3.select(this).attr('y')) + yScale.rangeBand() / 2;
        //     d3.select(tooltip)
        //         .style('left', xPos+ margins.left + 'px')
        //         .style('top', yPos +100+ 'px')
        //         .select(value_id)
        //         .text(d.y + ': ' +d.z +' '+d.x);
        //         console.log(xPos+ margins.left);
        //         console.log(yPos +100);
        //     d3.select(tooltip).classed('hidden', false);
        //   })
        //   .on('mouseout', function () {
        //   d3.select(tooltip).classed('hidden', true);
        // })
        d3.select('#'+id).selectAll('rect').append('title')
          .text(function(d){
            return d.y + ': ' +d.z +' '+d.x;
          })

        // svg.append('g')
        //     .attr('class', 'axis')
        //     .attr('transform', 'translate(0,' + height + ')')
        //     .call(xAxis);
        //
        // svg.append('g')
        //     .attr('class', 'axis')
        //     //.attr('transform', 'translate(200,0)')
        //     .call(yAxis);
    // svg.append('rect')
    //     .attr('fill', 'yellow')
    //     .attr('width', 160)
    //     .attr('height', 30 * dataset.length)
    //     .attr('x', width + margins.left)
    //     .attr('y', 0)

    // series.forEach(function (s, i) {
    //     svg.append('text')
    //         .attr('fill', 'black')
    //         .attr('x', width + margins.left + 8)
    //         .attr('y', i * 24 + 24)
    //         .text(s);
    //     svg.append('rect')
    //         .attr('fill', colours(i))
    //         .attr('width', 60)
    //         .attr('height', 20)
    //         .attr('x', width + margins.left + 90)
    //         .attr('y', i * 24 + 6)
    //         .append('title')
    // });
}

module.exports = drawBarChart
