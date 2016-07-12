

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
  
  var xmapping = mapping(xmin-3,xmax+3,0,width)
  var ymapping = mapping(ymin-3,ymax+3,0,height)
  
  var colors = ['#ff7fb8','#ff9c5b','#dbc828','#35c665','#00d8ae','#26c7ff','#c299ff']
  
  var iY = y => height-y
  
  var draw = function(points, color){
    var ctx=chart.getContext("2d");
		ctx.beginPath();
		//ctx.moveTo(0,iY(0));
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
var chart = document.getElementById("chart")

var rawdata = new Array(20).fill(0).map((x,i)=>Math.sqrt(i/10)*10)

var data = rawdata.map((x,i) => [i,x])
var data2 = rawdata.map((x,i) => [i,Math.random()*5+x-2.5])

var ghFilter = function(data,x0,dx,g,h){
  var out = []
  var x = x0
	data.forEach(z => {
    var est = x + dx

    var residual = z - est
    dx = dx    + h * residual
    x  = est + g * residual     
    out.push(x)  
  })
  return out;
}
var data3 = ghFilter(data2.map(x=>x[1]),0,0.1,0.6,0.5).map((x,i)=>[i,x])
muChart(chart,data,data2,data3)
