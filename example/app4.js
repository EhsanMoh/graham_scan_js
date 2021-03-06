function initialize() {

    var coords = [
        {'lat' : '50.157913235507706', 'lon' : '29.900512524414125'},
        {'lat' : '50.74029471119741', 'lon' : '31.146087475586'},
        {'lat' : '50.74029471119741', 'lon' : '29.900512524414125'},
        {'lat' : '50.15791323550770611', 'lon' : '31.146087475586'}
    ];

    var centrePoint = new google.maps.LatLng(50.5, 30.0);

    var mapOptions = {
        zoom: 8,
        center: centrePoint,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    var poly;
    var polyHull;
    var convexHull = new ConvexHullGrahamScan();


    poly = new google.maps.Polygon({
        paths: coords.map(function(item){
            return new google.maps.LatLng(item.lat, item.lon);
        }),
        strokeColor: '#000',
        strokeOpacity: 0.2,
        strokeWeight: 2,
        fillColor: '#000',
        fillOpacity: 0.1
    });


    coords.forEach(function (item) {
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(item.lat, item.lon),
            map: map
        });
        convexHull.addPoint(item.lon, item.lat);
    });


    if (convexHull.points.length > 0) {
        var hullPoints = convexHull.getHull();



        //Convert to google latlng objects
        hullPoints = hullPoints.map(function (item) {
            return new google.maps.LatLng(item.y, item.x);
        });

        console.log(hullPoints);

        polyHull = new google.maps.Polygon({
            paths: hullPoints,
            strokeColor: '#000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#000',
            fillOpacity: 0.35
        });

        polyHull.setMap(map);

    }
}

google.maps.event.addDomListener(window, 'load', initialize);