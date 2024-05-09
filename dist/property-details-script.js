'use strict';

// PROPERTY LISTINGS SECTION GENERATION
const activatePropertyDetails = function () {
  const propertyDetails = document.querySelector('.property-details');
  const skeletonContainer = document.querySelector('.skeleton-container');

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
      // console.log(data);

      // Address string formation
      const address = data.location
        .map(level => level.name)
        .reverse()
        .join(', ');
      // console.log(address);

      // Pictures
      const pictures = document.createElement('div');
      pictures.classList.add('pictures');

      data.photos.forEach(picObject => {
        const picture = document.createElement('div');
        picture.classList.add('pictures__picture');

        picture.innerHTML = `<img src="${picObject.url}" alt="photo">`;
        pictures.appendChild(picture);
      });

      // Final Property details
      propertyDetails.innerHTML = `
        <h3>${data.title}</h3>
        <p class="property-listings__listing__purpose">${data.purpose}</p>
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

        <p class="property-listings__listing__description">Property Description</p>
        <p>${data.description}</p>
      `;

      // Append pictures to propertyDetails before property purpose
      const propertyPurpose = document.querySelector(
        '.property-listings__listing__purpose'
      );
      propertyPurpose.insertAdjacentElement('afterend', pictures);

      // Hide skeleton class and reveal actual details only after all images are loaded (LOAD EVENT)
      const images = document.querySelectorAll('img');
      const totalImages = images.length;
      let loadedImages = 0;

      images.forEach(img => {
        img.addEventListener('load', function () {
          loadedImages++;
          console.log(loadedImages);

          if (loadedImages === totalImages) {
            skeletonContainer.classList.add('hidden');
            propertyDetails.classList.remove('hidden');
          }
        });
      });
    })
    .catch(error => {
      console.error('Error fetching property data:', error);
    });
};
activatePropertyDetails();
