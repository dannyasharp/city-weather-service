"use strict";

const weatherButton = document.getElementById("getWeather")
const dropdown = document.getElementById("dropdown")
const headlinesContainer = document.getElementById("headlinesContainer");
const headerResults = document.getElementById("headerResults");

weatherButton.addEventListener('click', function() {
    const cityID = dropdown.value;
    fetchHeadlines(cityID);
});

// fetch city data depending on city
function fetchHeadlines(cityID) {
    const url = `https://api.weather.gov/offices/${cityID}/headlines`;

    fetch(url, {
        headers: {
            "accept": "application/json"
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("response was not OK")
        }
        return response.json();
    })
    .then(data => {
        displayHeadlines(data)
    })
    .catch(error => {
        console.error("Error fetching headlines:", error);
    })

};

function displayHeadlines(data) {
    headlinesContainer.innerHTML = '';  // clear the headlines

    //check for data, and @graph field and it's content
    if(data && data['@graph'] && data['@graph'].length > 0) {
        data['@graph'].forEach(headline => {
            const card = document.createElement('div');
            card.className = 'headlineCard';

        // make the headline with a title, date, and link
        const title = headline.title || 'No title available';
        const date = new Date(headline.issuanceTime).toLocaleString() || 'No data available';
        const link = `<a href=${headline.link} target="_blank"> Link to News </a>` || 'No News Link Available';

        card.innerHTML = `
        <h3>${title}</h3>
        <p><strong>Issued on:</strong> ${date}</p>
        <p>${link} </p>
        `;

        headlinesContainer.appendChild(card);
        });

    } else {
        headlinesContainer.innerHTML = '<h3>No recent headlines found for this city.</h3>'
    }

    headerResults.classList.remove('hidden');
}
