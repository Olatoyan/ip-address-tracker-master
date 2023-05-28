"use strict";

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition((position) => {
    console.log(position);
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    console.log(latitude, longitude);
    const coords = [latitude, longitude];
    console.log(coords);

    const map = L.map("map").setView(coords, 13);

    L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker(coords)
      .addTo(map)
      .bindPopup("A pretty CSS popup.<br> Easily customizable.")
      .openPopup();

    map.on("click", function (mapEvent) {
      console.log(mapEvent);
    });
  }),
    function () {
      alert("Could not get your location");
    };
}

// const address = async function () {
//   const data = await fetch(
//     "https://geo.ipify.org/api/v2/country?apiKey=at_GYLwFZ0D18TfNHvx6hxDg9rF6tO11"
//   );
//   const res = await data.json();
//   console.log(res);
//   const ipAddress = document.querySelector(".ip-address");
//   const location = document.querySelector(".location");
//   const time = document.querySelector(".time");
//   const isp = document.querySelector(".isp");

//   ipAddress.textContent = res.ip;
//   location.textContent = res.location.region;
//   time.textContent = res.location.timezone;
//   isp.textContent = res.isp;
// };
// address();
