'use strict';

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
      propertyListing.classList.add('property');

      const address = property.location
        .map(level => level.name)
        .reverse()
        .join(', ');

      propertyListing.innerHTML = `
        <h2>${property.title}</h2>
        <img src="${property.coverPhoto.url}" alt="${property.title}">
        <p>${property.price}</p>
        <p>${address}</p>
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
