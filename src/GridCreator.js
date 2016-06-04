var HeatmapCreator = require('./HeatmapCreator.js');

module.exports = {
  // constant lat-long offset
  llOffset: 0.00666666666666667*1.5,

  createGridLines: function(mapBounds) {
    var gridCenterPointsArray = [];

    // north, south, east, and west coordinates of the map.
    var north = mapBounds.getNorthEast().lat();
    var south = mapBounds.getSouthWest().lat();
    var east = mapBounds.getNorthEast().lng();
    var west = mapBounds.getSouthWest().lng();

    // defines the size of the grid sides.
    var topLat = Math.ceil(north / this.llOffset) * this.llOffset;
    var rightLong = Math.ceil(east / this.llOffset) * this.llOffset;
    var bottomLat = Math.floor(south / this.llOffset) * this.llOffset;
    var leftLong = Math.floor(west / this.llOffset) * this.llOffset;

    // generates each grid's coordinates
    for (var latitude = bottomLat; latitude <= topLat+3*this.llOffset; latitude += this.llOffset) {
      if(latitude>=topLat+this.llOffset){
        leftLong+=2*this.llOffset;
        rightLong-=this.llOffset;
      }
      for(var longitude = leftLong+this.llOffset; longitude<= rightLong; longitude += this.llOffset) {
        var upLeftCoord= {
          lat: latitude + this.llOffset/2,
          lng: longitude - this.llOffset/2
        };
        var upRightCoord= {
          lat: latitude + this.llOffset/2,
          lng: longitude + this.llOffset/2
        };
        var lowLeftCoord= {
          lat: latitude - this.llOffset/2,
          lng: longitude - this.llOffset/2
        };
        var lowRightCoord= {
          lat: latitude - this.llOffset/2,
          lng: longitude + this.llOffset/2
         };

        // initial default color when map loads and grids are created
        var color = "#00ffffff";
        var opacity = 0.0;

        // grid object representing its center and other properties
        var gridCenterObject = {
          lat: latitude,
          long: longitude,
          location: new google.maps.LatLng(latitude, longitude),
          upLeftCoord: upLeftCoord,
          upRightCoord: upRightCoord,
          lowLeftCoord: lowLeftCoord,
          lowRightCoord: lowRightCoord,
          surgePrice: 0.0,
          numberOfDemanders: 0,
          numberOfSuppliers: 0,
          color: color,
          opacity: opacity,
          label: "A",
          heatmap: HeatmapCreator.createHeatmap(opacity, color, upLeftCoord, upRightCoord, lowRightCoord, lowLeftCoord)
        };
        gridCenterPointsArray.push(gridCenterObject);
      }
    }
    return gridCenterPointsArray;
  }
}
