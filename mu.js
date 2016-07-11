

var muChart = function(){
  var DEBUG = true;
  var data = Array.prototype.slice.call(arguments)
  var chart = data.shift()
  var width = chart.width
  var height = chart.height
  var max = (a,b) => a > b ? a : b
  var min = (a,b) => a < b ? a : b
  var xmin = data[0].map(x=> x[0]).reduce(min)
  var xmax = data[0].map(x=> x[0]).reduce(max)
  var ymin = data[0].map(x=> x[1]).reduce(min)
  var ymax = data[0].map(x=> x[1]).reduce(max)
  
  var mapping = (iMin, iMax, oMin, oMax) => (value =>(((value - iMin)/(iMax-iMin))*(oMax - oMin)+oMin))
  
  var xmapping = mapping(xmin,xmax,0,width)
  var ymapping = mapping(xmin,xmax,0,height)
  
  var colors = ['#ff7fb8','#ff9c5b','#dbc828','#35c665','#00d8ae','#26c7ff','#c299ff']
  
  var iY = y => height-y
  
  var draw = function(points, color){
    var ctx=chart.getContext("2d");
		ctx.beginPath();
		ctx.moveTo(0,iY(0));
    points.forEach(pt => {
    	ctx.lineTo(xmapping(pt[0]),iY(ymapping(pt[1])))
    })
    ctx.strokeStyle = color || '#000000';
		ctx.stroke();
  }
 
  data.forEach((x,i) => draw(x,colors[i]))

  if (DEBUG) {
    console.log(`xrange: ${xmin} - ${xmax}\nyrange: ${ymin} - ${ymax}`)
  }
}

/*
usage example
HTML:
<canvas id="chart" width="800px" height="600px"></canvas>

JS: *-is below-*
*/

var data = [0,1,2,6,3,2,3,4,5]
var chart = document.getElementById("chart")
data = data.map((x,i) => [i,x])
var data2 = [1,2,1,3,1,3,4,24,5] 
data2 = data2.map((x,i) => [i,x])

muChart(chart,data,data2)



var data = [0,1,2,6,3,2,3,4,5]
var chart = document.getElementById("chart")
data = data.map((x,i) => [i,x]) 

muChart(chart,data)
