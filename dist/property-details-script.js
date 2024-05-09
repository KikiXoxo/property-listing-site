'use strict';

// PROPERTY LISTINGS SECTION GENERATION
const activatePropertyDetails = function () {
  const propertyDetails = document.querySelector('.property-details');

  const urlParams = new URLSearchParams(window.location.search);
  const externalID = urlParams.get('externalID');

  const url = `https://bayut.p.rapidapi.com/properties/detail?externalID=${externalID}`;

  fetch(url, {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '9538308538msh413d77a0467c76dp1601ffjsn2e2717e09023',
      'X-RapidAPI-Host': 'bayut.p.rapidapi.com',
    },
  })
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log(data);

      const address = data.location
        .map(level => level.name)
        .reverse()
        .join(', ');
      console.log(address);

      // const amenities = data.amenities.join(',');

      propertyDetails.innerHTML = `
        <h3>${data.title}</h3>
        <div class="img--container">
          <img src="${data.coverPhoto.url}" alt="${data.title}">
        </div>
        <p class="property-listings__listing__price"><i class="fa-solid fa-money-check-dollar"></i> $${data.price.toLocaleString()}</p>
        <p><i class="fa-solid fa-location-dot"></i> ${address}</p>
        <div class="flex-items">
        <p class="flex-items__item"><i class="fa-solid fa-maximize"></i> ${data.area.toFixed(
          2
        )} SQM</p>
        <p class="flex-items__item"><i class="fa-solid fa-bed"></i> ${
          data.rooms
        } Bedrooms</p>
        <p class="flex-items__item"><i class="fa-solid fa-shower"></i> ${
          data.baths
        } Baths</p>
      </div>
        <p class="property-listings__listing__purpose">${data.purpose}</p>
        <p>${data.description}</p>
      `;
    })
    .catch(error => {
      console.error('Error fetching property data:', error);
    });
};
activatePropertyDetails();
