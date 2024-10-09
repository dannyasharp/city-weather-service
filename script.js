"use strict";

const weatherButton = document.getElementById("getWeather")
const dropdown = document.getElementById("dropdown")

weatherButton.addEventListener('click', function() {
    const cityID = dropdown.value;
    fetchHeadlines(cityID);
    showCityIdImage(cityID);
});

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
        console.log("error fetching headlines", error);
    })

};

function showCityIdImage() {

};
