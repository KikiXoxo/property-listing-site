'use strict';

// PROPERTY CATEGORIES TABS
const activatePropertyCategories = function () {
  const propertCategories = document.querySelector('.categories__container');

  propertCategories.addEventListener('click', function (e) {
    if (e.target.closest('.categories__category')) {
      const category = e.target.closest('.categories__category');
      console.log(category);

      propertCategories
        .querySelectorAll('.categories__category')
        .forEach(cat => {
          console.log(cat);
          cat.classList.remove('active');
        });

      category.classList.add('active');
    }
  });
};
activatePropertyCategories();

// PROPERTY LISTINGS SECTION GENERATION
const activatePropertyListings = function () {
  const propertyListings = document.querySelector('.property-listings');

  const url =
    'https://bayut.p.rapidapi.com/properties/list?locationExternalIDs=5002%2C6020&purpose=for-rent&hitsPerPage=25&page=0&lang=en&sort=city-level-score&rentFrequency=monthly&categoryExternalID=4';

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
      console.log(data.hits);

      data.hits.forEach(property => {
        const propertyListing = document.createElement('div');
        propertyListing.classList.add('property-listings__listing');

        const address = property.location
          .map(level => level.name)
          .reverse()
          .join(', ');

        propertyListing.innerHTML = `
      <a href="property-details.html">
        <h3>${property.title}</h3>
        <div class="img--container">
          <img src="${property.coverPhoto.url}" alt="${property.title}">
        </div>
        <p class="property-listings__listing__price"><i class="fa-solid fa-money-check-dollar"></i> $${
          property.price
        }</p>
        <p><i class="fa-solid fa-location-dot"></i> ${address}</p>
        <p class="property-listings__listing__area"><i class="fa-solid fa-maximize"></i> ${property.area.toFixed(
          2
        )} SQM</p>
      </a>
      `;
        propertyListings.appendChild(propertyListing);
      });
    })
    .catch(error => {
      console.error('Error fetching property data:', error);
    });

  // RAPID API SAMPLE CODE
  // const url =
  //   'https://bayut.p.rapidapi.com/properties/list?locationExternalIDs=5002%2C6020&purpose=for-rent&hitsPerPage=25&page=0&lang=en&sort=city-level-score&rentFrequency=monthly&categoryExternalID=4';
  // const options = {
  //   method: 'GET',
  //   headers: {
  //     'X-RapidAPI-Key': '9538308538msh413d77a0467c76dp1601ffjsn2e2717e09023',
  //     'X-RapidAPI-Host': 'bayut.p.rapidapi.com',
  //   },
  // };

  // try {
  //   const response = await fetch(url, options);
  //   const result = await response.text();
  //   console.log(result);
  // } catch (error) {
  //   console.error(error);
  // }
};
activatePropertyListings();
