var party_cmp = function(){
	var svg = d3.select("#monies").append("svg").attr("width", 690).attr("height", 400).append("g");
	var  x = d3.scalePoint().domain(["01-02","02-03","03-04","04-05","05-06","06-07","07-08","08-09","09-10","10-11","11-12","12-13","13-14","14-15","15-16"])
	.range([70,670]).padding(1);
	var  y = d3.scaleLinear().range([330, 20]).domain([0,1100]);

	var xAxis = d3.axisBottom(x);
	var yAxis = d3.axisLeft(y);
    
    xAxis.tickSizeInner([-310]);    
    yAxis.tickSizeInner([-610]).tickArguments([10, ",s"]);;


    var line = d3.line()
    .curve(d3.curveCatmullRom)
    .defined(function(d) { return d[1]; })
    .x(function(d) { return x(d[0]); })
    .y(function(d) { return y(d[1]); });


    var line2 = d3.line()
    .curve(d3.curveCatmullRom)
    .x(function(d) { //console.log(d[0]);
    	return x(d[0]); })
    .y(function(d) { //console.log(d[1]);
    	return y(d[1]); });

    svg.append("g")
      	.attr("class", "x axis")
      	.attr("transform", "translate("+0+"," + 330 + ")").call(xAxis);

    svg.append("g").attr("class", "y axis").attr("transform", "translate("+70+"," + 0 + ")").call(yAxis)


    svg.append("text")
        	.attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
        	.attr("transform", "rotate(-90) translate("+(-180)+","+20+")").attr("class","axislabel") // centre below axis
        	.text("Income (in Crores)");

    svg.append("text")
        	.attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
        	.attr("transform", "translate("+345+","+390+")").attr("class","axislabel") // centre below axis
        	.text("Year");

    for(var k=0;k<money_data.length;k++){
	    svg.append("g").datum(money_data[k].data)
	    	.append("path").attr("class","line fam"+k)
		    .attr("fill", "none")
		    .attr("stroke", money_data[k].color)
		    .attr("stroke-linejoin", "round")
		    .attr("stroke-linecap", "round")
		    .attr("stroke-width", 2).attr("d",line);

		svg.append("g").selectAll(".circlepts"+k).data(money_data[k].data).enter()
		    .append("circle").attr("class","circlepts circlepts"+k + " fam"+k)
		    .attr("cx",function(d,i){
		    	return x(d[0]);
		    })
		    .attr("cy",function(d,i){
		    	return y(d[1]);
		    })
		    .attr("r", 4)
		    .attr("fill",function(d,i){
		    	return money_data[k].color;
		    });


		    d3.selectAll(".fam0,.fam1,.fam2,.fam3,.fam4,.fam5,.fam6").on("mouseover", function() {
       			d3.selectAll(".fam0,.fam1,.fam2,.fam3,.fam4,.fam5,.fam6").attr("opacity",0.2);
       			d3.selectAll("."+d3.select(this).attr("class").split(" ").slice(-1)[0]).attr("opacity",1);
       			//console.log("yay");
       		})
     		.on("mouseout", function(d) {
     			d3.selectAll(".fam0,.fam1,.fam2,.fam3,.fam4,.fam5,.fam6").attr("opacity",1);
       		});


		}


	svg.append("g").datum([["04-05",0],["04-05",1100]])
	   	.append("path").attr("class","election")
	    .attr("fill", "none")
	    .attr("stroke", "#2c3e50")
	    .attr("stroke-linejoin", "round")
	    .attr("stroke-linecap", "round")
	    .attr("opacity",0.5)
	    .attr("stroke-width", 2).attr("d",line2);


	svg.append("g").datum([["09-10",0],["09-10",1100]])
	   	.append("path").attr("class","election")
	    .attr("fill", "none")
	    .attr("stroke", "#2c3e50")
	    .attr("stroke-linejoin", "round")
	    .attr("stroke-linecap", "round")
	    .attr("opacity",0.5)
	    .attr("stroke-width", 2).attr("d",line2);


	svg.append("g").datum([["14-15",0],["14-15",1100]])
	   	.append("path").attr("class","election")
	    .attr("fill", "none")
	    .attr("stroke", "#2c3e50")
	    .attr("stroke-linejoin", "round")
	    .attr("stroke-linecap", "round")
	    .attr("opacity",0.5)
	    .attr("stroke-width", 2).attr("d",line2);

	svg.append("rect").attr("x",90).attr("y",20).attr("width",280).attr("height",170).attr("fill","white").attr("opacity",0.7);



	svg.append("g").append("text")
	    .attr("text-anchor", "left").attr("style", "transform:translate(150px,50px)").attr("class","legend_text").text("Lok Sabha Elections");

	svg.append("g").datum([["01-02",1020],["02-03",1020]])
	   	.append("path").attr("class","election")
	    .attr("fill", "none")
	    .attr("stroke", "#2c3e50")
	    .attr("stroke-linejoin", "round")
	    .attr("stroke-linecap", "round")
	    .attr("opacity",1)
	    .attr("stroke-width", 2).attr("d",line2);



	svg.append("g").selectAll(".legend_text").data(money_data).enter()
	    .append("text").attr("class",function(d,i){
	    	return "legend_text fam"+i;
	    })
	    .attr("text-anchor", "left")  // this makes it easy to centre the text as the transform is applied to the anchor
       	.attr("style", function(d,i){
       		return "transform:translate(130px," + ((17*i)+67) + "px)";
       	})
       	.text(function(d,i){
       		return d.name
       	});

    svg.append("g").selectAll(".legend_circle").data(money_data).enter()
	    .append("circle").attr("class",function(d,i){
	    	return "legend_circle fam"+i;
	    })
	    .attr("cx",120)
	    .attr("cy",function(d,i){
	    	return (i*17)+62;
	    })
	    .attr("r", 5)
	    .attr("fill",function(d,i){
	    	return d.color;
	    });


};

var mapPlot= function(){
	d3.json("res/india.topojson", function(error, us) {
		

		
		var path = d3.geoPath().projection(d3.geoMercator().scale(1200));
		if (error) throw error;
		//console.log(us);
		var svgorig = d3.select("#map").append("svg").attr("width", 800).attr("height", 900);
		var svg = svgorig.append("g").attr("transform","translate(-1800,700)");	
	  	
	  	svg.append("g")
	    	.attr("class", "states")
	    	.selectAll("path")
	    	.data(topojson.feature(us, us.objects.india_pc_2014).features)
	    	.enter().append("path").attr("class","constituencies")
	    	.attr("id",function(d,i){
	    		//console.log(d.properties);
	    		return d.properties.PC_NAME;
	    	})
	        .attr("d", path);


	    
	    svg.append("path")
	        .attr("class", "state-borders")
	        .attr("d", path(topojson.mesh(us, us.objects.india_pc_2014, function(a, b) { return a !== b; })));
	    /*
	    svg.selectAll(".constituencies")
	        .on("mouseover",function(d){
	    		//console.log(d3.select(this).attr("id"));
	    		d3.select(this).attr("style","fill:#c0392b");
	    	})
	    	.on("mouseout",function(d){
	    		d3.select(this).attr("fill","black");	
	    	});
		
		
		$('#map').waypoint(function(dir) {
			console.log('Hello world');
		  	if(dir=='down'){
		  		$('#map').addClass("fixMap")
		  		$('#overlay').addClass("col-md-offset-8");
		  	}else{
		  		$('#map').removeClass("fixMap");
		  		$('#overlay').removeClass("col-md-offset-8");
		  	}
		},{offset : '15%'});

		$('#next').waypoint(function(dir) {
			console.log('Win');
		  	if(dir=='down'){
		  		$('#map').removeClass("stuck").addClass("stuck-bottom")
		  		//$('#overlay').removeClass("col-md-offset-8");
		  	}else{
		  		$('#map').addClass("stuck");
		  		//$('#overlay').addClass("col-md-offset-8");
		  	}
		},{offset : '0%'});
		
		var sticky = new Waypoint.Sticky({
  			element: $('#map')
		});
*/


	var colourful = function(name,id){
		if ((id == "tr-parties") || (id == "tr-gender")) {
			return colors[id][constituencies[name][ids[id]]];
		}else if(id=="tr-crimes"){
			var max = 4;
			var min = 0;
			return d3.interpolateOrRd((constituencies[name][ids[id]]-min)/(max-min));
		}else if(id=="tr-money"){
			var max = 327877853;
			var min = 34311;
			return d3.interpolateBuGn((constituencies[name][ids[id]]-min)/(max-min));
		}else if(id=="tr-education"){
			return accent(colors[id][constituencies[name][ids[id]]]);
		}else if(id=="tr-reservation"){
			return accent(colors[id][constituencies[name][ids[id]]]);
		}else if(id=="tr-intro"){
			return "#c0392b";
		}
	}

	d3.graphScroll()
		.graph(d3.select('#map'))
		.container(d3.select('#container'))
  		.sections(d3.selectAll('#overlay > div'))
  		.on('active',function(){
  			var id = $(".graph-scroll-active").attr("id");
  			d3.selectAll(".constituencies").transition().ease(d3.easeCubic).duration(1000).attr("fill",function(d,i){
	    		//console.log(constituencies[d.properties.PC_NAME],i);
	    		try{
	    			return colourful(d.properties.PC_NAME, id);
	    		}catch(e){
	    			console.log("disputed land");
	    			return "#bdc3c7";
	    		}
	    	}).attr("opacity",0.75)


  			var legend_map = []
  			Object.keys(colors[id]).forEach(function(key) {
    			return legend_map.push([key, colors[id][key]]);
    		});
    		console.log(legend_map);
	    	d3.select(".legend").remove();
	    	
	    	var newsvg = svgorig.append("g").attr("class","legend");
	    	newsvg.selectAll(".legs").data(legend_map).enter()
	    	.append("circle").attr("class","legs").attr("cx",420).attr("cy",function(d,i){
	    		console.log(d);
	    		return 150+(i*20);
	    	}).attr("stroke","#333333").attr("stroke-width",0.5).attr("r",5).attr("fill",function(d,i){
	    		if ((id == "tr-parties") || (id == "tr-gender")) {
					return d[1];
				}else if(id=="tr-crimes"){
					return d3.interpolateOrRd(d[1]);
				}else if(id=="tr-money"){
					return d3.interpolateBuGn(d[1]);
				}else if(id=="tr-education"){
					return accent(d[1]);
				}else if(id=="tr-reservation"){
					return accent(d[1]);
				}else if(id=="tr-intro"){
					return "#c0392b";
				}
	    	});

	    	newsvg.selectAll(".legs-text").data(legend_map).enter()
	    	.append("text").attr("class","legs-text bodies2").attr("x",435).attr("y",function(d,i){
	    		console.log(d);
	    		return 155+(i*20);
	    	}).text(function(d,i){
	    		return d[0];
	    	})

	    	
  		})
  
	});
};


var accent;

window.onload=function() {


	accent = d3.scaleOrdinal(d3.schemeDark2);
	party_cmp();
	mapPlot();
	 
}