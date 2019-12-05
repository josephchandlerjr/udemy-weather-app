const path 			= require('path'),
	  express 		= require("express"),
      app 			= express(),
      hbs 			= require('hbs'),
      forcast		= require('./utils/forcast'),
      geocode		= require('./utils/geocode'),
      printForcast	= require('./utils/printForcast'),
      port 			= process.env.PORT || 3000;




// Define paths for Express config
const viewsPath  	= path.join(__dirname, '../templates/views');
const partialsPath  = path.join(__dirname, '../templates/partials');
const publicPath 	= path.join(__dirname, '../public');

//Setup handlebars engine and views location
app.set('views', viewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicPath));

//Routes

app.get('', (req, res) => 
	res.render('index', {
		title: 'Weather App', 
		name: 'Joe Chandler'
	})
);
app.get('/about', (req, res) => 
	res.render('about', {
		title: 'About', 
		name: 'Joe Chandler'
	})
);

app.get('/help', (req, res) => 
	res.render('help', {
		title: 'Help', 
		helpText: 'This is some helpful text',
		title: 'Help', 
		name: 'Joe Chandler'
	})
);
app.get('/help/*', (req, res) => 
	res.render('404', {
		title: 404, 
		errorMessage: 'Help article not found', 
		name: 'Joe Chandler'})
);

app.get('/weather', (req, res) => {
	if(!req.query.location){
		return res.send({error: 'You must provide a location'});
	}
	const searchTerm = req.query.location;
	geocode(searchTerm, (err, geoData) => {
		if(err) return res.send({error: err});
		const {latitude,longitude} = geoData;
		forcast(latitude,longitude, (err, weatherData) => {
			if(err) return res.send({error: err});
			return res.send(Object.assign(  {address: searchTerm},
											geoData,
											{forecast: printForcast(weatherData)}
										 )
			);
		});	
	});

});

app.get('*', (req,res) => 
	res.render('404', {
		title: '404', 
		errorMessage: 'Page not found', 
		name: 'Joe Chandler'
	})
);

// Listen

app.listen(port, () => console.log('server listening intently on port 3000'));