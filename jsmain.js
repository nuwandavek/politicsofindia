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
    .x(function(d) { console.log(d[0]);
    	return x(d[0]); })
    .y(function(d) { console.log(d[1]);
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
       			console.log("yay");
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



window.onload=function() {
	party_cmp();
	 
}