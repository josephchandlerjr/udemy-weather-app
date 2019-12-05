const request = require("request");

const darkskyToken = process.env.DARKSKY;


const forcast = (latitude, longitude, callback) => {
	const darkskyUrl = `https://api.darksky.net/forecast/${darkskyToken}/${latitude},${longitude}`;
	request(
		{
			url: darkskyUrl, 
			json: true
		}, (err, response) => {
			if(err) {
				callback("Unable to connect to weather services");
			} else if (response.body.error) {
				callback("Unable to find location");
			} else {
				const summary 				= response.body.daily.summary;
				const precipProbability 	= response.body.currently.precipProbability;
				const temperature 			= response.body.currently.temperature;
				callback(undefined, {summary, precipProbability, temperature});
				
			}
	});
 };

 module.exports = forcast;