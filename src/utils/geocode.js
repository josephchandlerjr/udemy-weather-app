const request = require("request");
const mapboxToken = process.env.MAPBOX;

const geocode = (searchTerm, callback) => {
	const mapboxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchTerm)}.json?access_token=${mapboxToken}&limit=1`;
	request(
		{
			url: mapboxUrl,
			json: true
		}, (err, response) =>{
			if(err) {
				callback("Unable to connect to location services");
			} else if (response.body.features.length === 0) {
				callback("Unable to find location");
			} else {
				let location = response.body.features[0].place_name;
				let [longitude, latitude] = response.body.features[0].center;
				callback(undefined, {location, latitude, longitude});
			}	
		});	
};

module.exports = geocode;