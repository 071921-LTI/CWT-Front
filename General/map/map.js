function initMap() {
    const bounds = new google.maps.LatLngBounds();
    const markersArray = [];
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const directionsService = new google.maps.DirectionsService();
    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 55.53, lng: 9.4 },
      zoom: 10,
    });
    directionsRenderer.setMap(map);
    calculateAndDisplayRoute(directionsService, directionsRenderer);
    document.getElementById("mode").addEventListener("change", () => {
    calculateAndDisplayRoute(directionsService, directionsRenderer);
    });
    // initialize services
    const geocoder = new google.maps.Geocoder();
    const service = new google.maps.DistanceMatrixService();
    // build request
    const origin1 = { lat: 55.93, lng: -3.118 };
    const destinationA = { lat: 50.087, lng: 14.421 };
    const request = {
      origins: [origin1],
      destinations: [destinationA],
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC,
      avoidHighways: false,
      avoidTolls: false,
    };
    // put request on page
    document.getElementById("request").innerText = JSON.stringify(
      request,
      null,
      2
    );
    // get distance matrix response
    service.getDistanceMatrix(request).then((response) => {
      // put response
      document.getElementById("response").innerText = JSON.stringify(
        response,
        null,
        2
      );
      // show on map
      const originList = response.originAddresses;
      const destinationList = response.destinationAddresses;
      deleteMarkers(markersArray);
  
      const showGeocodedAddressOnMap = (asDestination) => {
        const handler = ({ results }) => {
          map.fitBounds(bounds.extend(results[0].geometry.location));
          markersArray.push(
            new google.maps.Marker({
              map,
              position: results[0].geometry.location,
              label: asDestination ? "D" : "O",
            })
          );
        };
        return handler;
      };
  
      for (let i = 0; i < originList.length; i++) {
        const results = response.rows[i].elements;
        geocoder
          .geocode({ address: originList[i] })
          .then(showGeocodedAddressOnMap(false));
  
        for (let j = 0; j < results.length; j++) {
          geocoder
            .geocode({ address: destinationList[j] })
            .then(showGeocodedAddressOnMap(true));
        }
      }
    });
  }
  
  function deleteMarkers(markersArray) {
    for (let i = 0; i < markersArray.length; i++) {
      markersArray[i].setMap(null);
    }
    markersArray = [];
  }

  function calculateAndDisplayRoute(directionsService, directionsRenderer) {
    const selectedMode = document.getElementById("mode").value;
    const origin1 = { lat: 55.93, lng: -3.118 };
    const destinationA = { lat: 50.087, lng: 14.421 };
    directionsService
      .route({
        origin: origin1,
        destination: destinationA,
        // Note that Javascript allows us to access the constant
        // using square brackets and a string value as its
        // "property."
        travelMode: google.maps.TravelMode[selectedMode],
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
      })
      .catch((e) => window.alert("Directions request failed due to " + status));
  }