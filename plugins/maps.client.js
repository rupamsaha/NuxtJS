export default function (context, inject) {
  let mapLoaded = false;
  let waiting = [];

  inject("maps", {
    showMap,
  });

  addScript();

  function addScript() {
    const script = document.createElement("script");
    script.src =
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyATIHN2NNWzLz6ZtV_SBPk0FatK8dMfP2w&Libraries=places&callback=initMap";
    (script.async = true), (window.initMap = initMap);
    document.head.appendChild(script);
  }

  function initMap() {
    mapLoaded = true;
    waiting.forEach((item) => {
      console.log(item.arguments)
      if(typeof item.fn === 'function'){
        item.fn(...item.arguments)
      }
    })
    waiting =[]
  }

  function showMap(canvas, lat, lng) {
    if (!mapLoaded) {
      waiting.push({
        fn: showMap,
        arguments,
      })
      return
    }
    const mapOptions = {
      zoom: 18,
      center: new window.google.maps.LatLng(lat, lng),
      disableDefaultUI: true,
      zoomControl: true,
    };
    const map = new window.google.maps.Map(canvas, mapOptions);
    const position = new window.google.maps.LatLng(lat, lng);
    const marker = new window.google.maps.Marker({ position });
    marker.setMap(map);
  }

  function renderMap(canvas, lat, lng) {
    console.log("mounted");
    const mapOptions = {
      zoom: 18,
      center: new window.google.maps.LatLng(lat, lng),
      disableDefaultUI: true,
      zoomControl: true,
    };
    const map = new window.google.maps.Map(canvas, mapOptions);
    const position = new window.google.maps.LatLng(lat, lng);
    const marker = new window.google.maps.Marker({ position });
    marker.setMap(map);
  }
}
