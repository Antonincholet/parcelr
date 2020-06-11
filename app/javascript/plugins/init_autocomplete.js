import places from 'places.js';

const initAutocomplete = () => {
  const addressInput = document.getElementById('address_input');
  if (addressInput) {
    places({ container: addressInput });
  }
};

export { initAutocomplete };
