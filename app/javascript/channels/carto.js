// extract data from API and display when parcel info page is loaded

// 1. fetch html using API key
const fetchCarto = (coordinates) => {
  fetch(`https://apicarto.ign.fr/api/doc/gpu#/Communes/get_gpu_municipality/`)
    .then(response => response.json())
    .then(insertCarto);
};

// 2. locate relevant data in document
const address = document.querySelector("#field");
address.addEventlistener('DOMcontentloaded', (event) => {
    console.log(event);
    console.log(event.currentTarget);
  });

const area = document.querySelector("#field");
area.addEventlistener('DOMcontentloaded', (event) => {
    console.log(event);
    console.log(event.currentTarget);
  });

const parcel_number = document.querySelector("#field");
parcel_number.addEventlistener('DOMcontentloaded', (event) => {
    console.log(event);
    console.log(event.currentTarget);
  });

const municipality = document.querySelector("#field");
municipality.addEventlistener('DOMcontentloaded', (event) => {
    console.log(event);
    console.log(event.currentTarget);
  });

const urbanism = document.querySelector("#field");
urbanism.addEventlistener('DOMcontentloaded', (event) => {
    console.log(event);
    console.log(event.currentTarget);
  });
// 3. diplay data in corresponding field in parcel view table


