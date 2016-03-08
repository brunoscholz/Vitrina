// for functions created by users
//eval("var func = function (a, b) { return a + b; };");

// Border...
Caman.Plugin.register("border", function(color, size) {
    var canvas, ctx;

    console.log(color);

    if (color == null) {
		color = "#000000";
	}
	if (size == null) {
		size = 10;
	}

	color = Caman.Convert.hexToRGB(color);
	console.log(color);

	var width = this.dimensions.width;
	var height = this.dimensions.height;
	var i, _i, _ref;

	for (i = _i = 0, _ref = this.pixelData.length; _i < _ref; i = _i += 4) {
		var coord = Caman.Pixel.locationToCoordinates(i, width);

		if (coord.x < size || coord.x > width - size || coord.y < size || coord.y > height - size) {
            this.pixelData[i] = color.r;
			this.pixelData[i + 1] = color.g;
			this.pixelData[i + 2] = color.b;
			//this.pixelData[i + 3] = color.a;
        }
	}

  });

Caman.Filter.register("border", function(color, size) {
  this.processPlugin("border", [color, size]);
});

//this.border("#f49600", 20);

// Frame....

// sin city
Caman.Filter.register("mySinCity", function() {
    this.contrast(100);
    this.brightness(15);
    this.exposure(10);
    this.posterize(80);
    this.clip(30);
    this.greyscale();
    return this.border("#000000", 20);
});

Caman.Filter.register("gotham", function() {
	this.newLayer(function() {
		//this.setBlendingMode("multiply");
		this.fillColor('#222b6d');
		this.opacity(80);
		this.filter.saturation(12);
      	this.filter.hue(20);
      	this.filter.brightness(-3);
		//this.filter.colorize('#222b6d', 20);
		this.filter.gamma(0.5);
		return this.filter.contrast(50);
	});
	return this.border("#000000", 20);
});

Caman.Filter.register("test1", function() {
	this.colorize(120, 10, 100, 20);
	this.channels({
		red: 2,
		green: -5,
		blue: 2
	});
	return this.border("#000000", 20);
});

Caman.Filter.register("test2", function() {
	this.contrast(100);
    this.brightness(15);
    this.exposure(10);
    this.posterize(80);
    this.clip(30);
    this.greyscale();
    this.newLayer(function() {
		this.setBlendingMode("multiply");
		this.fillColor('#222b6d');
		this.opacity(80);
		this.filter.saturation(12);
      	this.filter.hue(20);
      	this.filter.brightness(-3);
		//this.filter.colorize('#222b6d', 20);
		this.filter.gamma(0.5);
		return this.filter.contrast(50);
	});
	//this.colorize("#222b6d", 20);
	return this.border("#000000", 20);
});


/*public function gotham()
{
    $this->tempfile();
    $this->execute("convert $this->_tmp -modulate 120,10,100 -fill '#222b6d' -colorize 20 -gamma 0.5 -contrast -contrast $this->_tmp");
    $this->border($this->_tmp);
    $this->output();
}*/