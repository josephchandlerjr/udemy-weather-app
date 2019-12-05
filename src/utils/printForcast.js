const printForcast = ({summary, precipProbability, temperature}) => {
 	return `${summary} It is currently ${temperature} degrees out. There is a ${precipProbability}% chance of rain.`;
 }

module.exports = printForcast;