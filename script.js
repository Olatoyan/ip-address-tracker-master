"use strict";

// if (navigator.geolocation) {
//   navigator.geolocation.getCurrentPosition((position) => {
//     console.log(position);
//     const { latitude } = position.coords;
//     const { longitude } = position.coords;
//     console.log(latitude, longitude);
//     const coords = [latitude, longitude];
//     console.log(coords);

//     const map = L.map("map").setView(coords, 13);

//     L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
//       attribution:
//         '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//     }).addTo(map);

//     map.on("click", function (mapEvent) {
//       console.log(mapEvent);
//       const { lat, lng } = mapEvent.latlng;

//       L.marker([lat, lng])
//         .addTo(map)
//         .bindPopup(
//           L.popup({
//             maxWidth: 250,
//             minWidth: 100,
//             autoClose: false,
//             closeOnClick: false,
//           })
//         )
//         .openPopup();
//     });
//   }),
//     function () {
//       alert("Could not get your location");
//     };
// }
const searchInput = document.querySelector(".search__input");
const searchIcon = document.querySelector(".icon__box");

let marker;
let res;
let map;
const address = async function (ip = "") {
  try {
    const data = await fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_GYLwFZ0D18TfNHvx6hxDg9rF6tO11&ipAddress=${ip}`
    );
    res = await data.json();
    console.log(res);
    console.log(res.location);
    const { lat } = res.location;
    const { lng } = res.location;
    const ipAddress = document.querySelector(".ip-address");
    const location = document.querySelector(".location");
    const country = document.querySelector(".country");
    const time = document.querySelector(".time");
    const isp = document.querySelector(".isp");

    ipAddress.textContent = res.ip;
    location.textContent = res.location.region;
    country.textContent = res.location.country;
    time.textContent = res.location.timezone;
    isp.textContent = res.isp;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position);
          const { latitude, longitude } = position.coords;
          console.log(latitude, longitude);
          const userCoords = [latitude, longitude];
          const ipCoords = [lat, lng];
          console.log(userCoords, ipCoords);

          if (!map) {
            map = L.map("map").setView(userCoords, 13);

            L.tileLayer(
              "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
              {
                attribution:
                  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
              }
            ).addTo(map);
          }

          if (ipCoords[0] && ipCoords[1]) {
            map.panTo(ipCoords);
            L.marker(ipCoords)
              .addTo(map)
              .bindPopup(
                L.popup({
                  maxWidth: 250,
                  minWidth: 100,
                  autoClose: false,
                  closeOnClick: false,
                })
              )
              .setPopupContent(`This is your IP Address: ${res.ip}`)
              .openPopup();
          }
        },
        () => {
          alert("Could not get your location");
        }
      );
    }
  } catch (error) {
    alert(`Error : IP Address is invalid`);
    console.log(res);
    console.log(error);
  }
};

address();

searchIcon.addEventListener("click", function () {
  console.log(searchInput.value);
  address(searchInput.value);
  searchInput.value = "";
});

document.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    console.log(searchInput.value);
    address(searchInput.value);
    searchInput.value = "";
  }
});
