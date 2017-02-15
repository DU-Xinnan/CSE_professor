var Chart = require('chart.js');
var draw_pie = function(id,data,university){
	var ctx = document.getElementById("myChart").getContext('2d');
	var myChart = new Chart(ctx, {
	  type: 'pie',
	  data: {
	    labels: ["HCI", "AI", "OS", "Graphic", "ML"],
	    datasets: [{
	      backgroundColor: [
	        "#2ecc71",
	        "#3498db",
	        "#95a5a6",
	        "#9b59b6",
	        "#f1c40f"
	      ],
	      data: [12, 19, 3, 17, 28]
	    }]
	  }
	});
}
module.exports = draw_pie
