// extract data from API and display when parcel info page is loaded
const coordinates = {"type": "Point","coordinates":[-1.691634,48.104237]}
// 1. fetch html using API key
const fetchCarto = (coordinates) => {
  fetch(`https://apicarto.ign.fr/api/gpu/municipality?geom=${coordinates}`)
    .then(response => response.json())
    .then((data) => {
      console.log(data)
    })
data.Search.
};

// 2. locate relevant data in document
// 3. diplay data in corresponding field in parcel view table

// const address = document.querySelector("#ID");
// address.addEventlistener('DOMcontentloaded', (event) => {
//     console.log(event);
//     console.log(event.currentTarget);
//   });

// const area = document.querySelector("#ID");
// area.addEventlistener('DOMcontentloaded', (event) => {
//     console.log(event);
//     console.log(event.currentTarget);
//   });

// const parcel_number = document.querySelector("#ID");
// parcel_number.addEventlistener('DOMcontentloaded', (event) => {
//     console.log(event);
//     console.log(event.currentTarget);
//   });

// const municipality = document.querySelector("#ID");
// municipality.addEventlistener('DOMcontentloaded', (event) => {
//     console.log(event);
//     console.log(event.currentTarget);
//   });

// const urbanism = document.querySelector("#ID");
// urbanism.addEventlistener('DOMcontentloaded', (event) => {
//     console.log(event);
//     console.log(event.currentTarget);
//   });

