const fetchWeather = (location) => {
	fetch(`http://localhost:3000/weather?location=${location}`).then( response => {
		response.json().then( data => {
			if (data.error) return results.innerHTML = `<p style='color:red'>${data.error}</p>`;
			results.innerHTML = `<p>${data.location}</p> <p>${data.forecast}</p>`;
		});
	});
};


const weatherForm = document.querySelector('form');
const results = document.querySelector('#results');

weatherForm.addEventListener('submit', function(evt){
	evt.preventDefault(); 
	fetchWeather(this.location.value);
});

