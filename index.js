import axios from "axios";
import "./styles.css";

// Create a new Zomato API Instance
const zomato = axios.create({
	baseURL: "https://developers.zomato.com/api/v2.1",
	headers: {
		"user-key": "ee8b35401428a625c7aab387332f6eb5",
	},
});

// Grab all the stations from the HTML
const stations = document.querySelectorAll(".js-station");

// Loop through each station and grab the coordinates from the data attributes
stations.forEach(function (station) {
	// Event Listener to grab the data attributes on click
	station.addEventListener("click", function (e) {
		// Grab the longitutde and latitude values from the HTML
		const { lat: latitude, long: longitude } = e.target.dataset;

		// On each click we want to clear out the restaurants and start new
		restaurantsContainer.innerHTML = "";

		// Reach out to the zomato API providing the longitude and latitude coordinates and list out restaurants
		getRestaurants(longitude, latitude);
	});
});

// Method to reach out to the Zomato API
const getRestaurants = (long, lat) => {
	zomato
		.get(`/geocode?lat=${lat}&lon=${long}`)
		.then(function (response) {
			const nearby_restaurants = response.data.nearby_restaurants;

			nearby_restaurants.forEach(function (item) {
				const name = item.restaurant.name;
				const { address } = item.restaurant.location;
				console.log(item);

				restaurantsContainer.innerHTML += `<div><h2>${name}</h2><p>${address}</p><img src=${item.restaurant.thumb}/></div>`;
			});
		})
		.catch(function (error) {
			// handle error
			console.log(error);
		});
};

const restaurantsContainer = document.getElementById("restaurants");
