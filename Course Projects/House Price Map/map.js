// Put your zillow.com API key here
var zwsid = "X1-ZWz1hemmx6y1aj_6bk45";
var map;
var geocoder;
var marker;
var infowindow;
var request = new XMLHttpRequest();
var formattedAddress = "";

function initialize() {

    // init map
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 32.75, lng: -97.13 },
        zoom: 17
    });

    // add click listener to map
    map.addListener('click', function (e) {
        clickHandler(e.latLng);
    });

    // init geocoder
    geocoder = new google.maps.Geocoder();
}


function submitHandler() {

    var address = document.getElementById("address").value;
    var city = document.getElementById("city").value;
    var state = document.getElementById("state").value;
    var zip = document.getElementById("zipcode").value;
    var citystatezip = city + "+" + state + "+" + zip;
    var fullAddress = address + ", " + city + ", " + state;
    placeMarkerA(fullAddress);
    sendrequest(address, citystatezip, fullAddress);
}

// latlng to address and get z extimate
function clickHandler(latlng) {

    placeMarkerL(latlng);

    geocoder.geocode({ 'location': latlng }, function (results, status) {

        if (status === 'OK') {

            if (results[0]) {

                var formattedAddress = results[0].formatted_address;

                var address = formattedAddress.split(", ")[0];
                var city = formattedAddress.split(", ")[1];
                var statezip = formattedAddress.split(", ")[2];

                var state = statezip.split(" ")[0];
                var zip = statezip.split(" ")[1];
                var citystatezip = city + "+" + state + "+" + zip;

                sendrequest(address, citystatezip, formattedAddress);

            } else {
                alert('No results found');
            }
        } else {
            alert('Geocoder failed due to: ' + status);
        }
    });
}

// places marker on the given Lat long
function placeMarkerL(latLng) {

    if (marker) {
        marker.setMap(null)
    }
    marker = new google.maps.Marker({
        position: latLng,
        map: map,
    });
    map.panTo(latLng);
    //infowindow.open(map, marker);
}

// places marker on the given text address
function placeMarkerA(address) {

    geocoder.geocode({ 'address': address }, function (results, status) {
        if (status == 'OK') {
            placeMarkerL(results[0].geometry.location, address);
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

function displayResult() {

    if (request.readyState == 4) {

        var xml = request.responseXML.documentElement;
        var zestimate = xml.getElementsByTagName("zestimate");
        var amounts = zestimate && zestimate.length != 0 ? zestimate[0].getElementsByTagName("amount") : null;
        var value = "";

        if (amounts && amounts[0].innerHTML.length != 0)
            value = '$' + parseInt(amounts[0].innerHTML).toLocaleString();
        else
            value = 'N/A';

        var info = "<strong>Address: </strong>" + formattedAddress + "<br><strong>House value:</strong> " + value + "<br>";
        displayInfoWindow(info);
        document.getElementById("output").innerHTML += info + "<br>";
    }
}

function sendrequest(address, citystatezip, fa) {

    formattedAddress = fa;
    request.onreadystatechange = displayResult;
    request.open("GET", "proxy.php?zws-id=" + zwsid + "&address=" + address + "&citystatezip=" + citystatezip);
    request.withCredentials = "true";
    request.send(null);
}


function displayInfoWindow(text) {

    infowindow = new google.maps.InfoWindow({
        content: text
    });
    infowindow.open(map, marker);
}
