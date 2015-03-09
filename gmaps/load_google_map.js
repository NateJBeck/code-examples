$(initialize);

function initialize(){
  var iconColors = [
    "|EFE8FF|", 
    "|BBBCFC|",
    "|CA3DE3|", 
    "|4DC0FC|",
    "|5DCF4E|",
    "|F595B5|",
    "|888888|"
  ];

  drawMap();
  fillMap(iconColors);
}

function drawMap(){
  var mapOptions = {
    zoom: 12,
  };

  window.map = new google.maps.Map($("#map_canvas")[0], mapOptions);
  window.mapBound = new google.maps.LatLngBounds();
}

function fillMap(colors) {
  var townRoutes = $(".town_route");
  var deliveryAddresses = $(".delivery");

  if (townRoutes.length) {
    mapTownsWithColors(townRoutes, colors);
  } else if (routesByDeliveryAdress.length) {
    mapDeliveries(deliveryAddresses);
  };
};

var mapTownsWithColors = function(towns, colors) {
  towns.each(function(i, town) {
    var colorIndex = $(".color_index")[i].innerHTML;
    var iconColor = colors[colorIndex];
    var confirmedCount = $(".confirmed");
    var townAddress = $(town).find(".town_address").html();

    geocodeAndPlaceOnMap({ 
      address: townAddress, 
      iconColor: confirmedCount,
      confirmedCount: confirmedCount 
    });
  });
};

var mapDeliveries = function(addresses) {
  addresses.each(function(i, delivery) {
    var address = $(delivery).find(".delivery_address").html();
    geocodeAndPlaceOnMap({ 
      address: address 
    });
  });
};

var geocodeAndPlaceOnMap = function(options) {
  if (options["confirmedCount"].length) {
    var confirmedCount = options["confirmedCount"];
  } else {
    var confirmedCount = "";
  };

  if (options["iconColor"].length) {
    var iconColor = options["iconColor"];
  } else {
    var iconColor = "";
  };

  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({ 'address': options["address"] }, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      var result_location = results[0].geometry.location;
      var marker = new google.maps.Marker({
        map: window.map,
        position: result_location,
        icon: "https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=" 
          + confirmedCount
          + iconColor
      });

      var infowindow = new google.maps.InfoWindow({
        content: address
      });

      google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map, marker);
      });

      setBounds(result_location)

    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
}

var setBounds = function(latlng) {
  window.mapBound.extend(latlng);
  window.map.fitBounds(window.mapBound)
}
