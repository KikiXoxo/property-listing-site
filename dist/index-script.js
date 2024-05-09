'use strict';

// PROPERTY LISTINGS SECTION GENERATION
const activatePropertyListings = function () {
  const propertyListings = document.querySelector('.property-listings');
  const skeletonContainer = document.querySelector('.skeleton-container');
  const skeletonItem = document.querySelector('.skeleton-item');
  const numberOfSkeletonItems = 10;

  // Duplicate sketeton items in container
  for (let i = 0; i < numberOfSkeletonItems - 1; i++) {
    const skeletonItemClone = skeletonItem.cloneNode(true);
    skeletonContainer.appendChild(skeletonItemClone);
  }

  // Fetch actual listings
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
          <a href="property-details.html?externalID=${property.externalID}">
            <h3>${property.title}</h3>
            <div class="img--container">
              <img src="${property.coverPhoto.url}" alt="${property.title}">
            </div>
            <p class="property-listings__listing__price"><i class="fa-solid fa-money-check-dollar"></i> $${property.price.toLocaleString()}</p>
            <p><i class="fa-solid fa-location-dot"></i> ${address}</p>
            <div class="flex-items">
              <p class="flex-items__item"><i class="fa-solid fa-maximize"></i> ${property.area.toFixed(
                2
              )} SQM</p>
              <p class="flex-items__item"><i class="fa-solid fa-bed"></i> ${
                property.rooms
              } Bedrooms</p>
              <p class="flex-items__item"><i class="fa-solid fa-shower"></i> ${
                property.baths
              } Baths</p>
            </div>
          </a>
        `;
        propertyListings.appendChild(propertyListing);
      });

      // Hide skeleton class and reveal actual listings only after all images are loaded (LOAD EVENT)
      const coverImages = document.querySelectorAll('img');
      const totalImages = coverImages.length;
      let loadedImages = 0;

      coverImages.forEach(coverImg => {
        coverImg.addEventListener('load', function () {
          loadedImages++;
          console.log(loadedImages);

          if (loadedImages === totalImages) {
            skeletonContainer.classList.add('hidden');
            propertyListings.classList.remove('hidden');
          }
        });
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

// ACHIEVEMENTS SECTION COUNTER
const activateAchievements = function () {
  const achievements = document.querySelector('#achievements');
  const counters = document.querySelectorAll('.counter');

  let counted = 0;

  const increaseCount = function (entries, observer) {
    const [entry] = entries;
    // console.log(entry);

    if (!entry.isIntersecting) return; // Guard clause

    const timer = setInterval(function () {
      counted++;

      counters.forEach(counter => {
        if (counted > +counter.dataset.num) return;

        const content = counter.classList.contains('counter--3')
          ? `$${counted}K+`
          : `${counted}+`;
        counter.textContent = content;

        if (counted > 800) clearInterval(timer);
      });
    }, 6);

    observer.unobserve(achievements);
  };

  const counterObserver = new IntersectionObserver(increaseCount, {
    root: null,
    threshold: 0.95,
  });

  counterObserver.observe(achievements);
};
activateAchievements();
