/**
 * Reverse sort by value
 * @param kA - key A
 * @param vA - value A
 * @param kB - key B
 * @param vB - value B
 * @return Sorted
 */
const sortFunc = ([kA, vA], [kB, vB]) => {
	if (vA > vB) return -1;
	else if (vA < vB) return 1;
	return 0;
};

/**
 * Get most active cookie
 * @param data - The data
 * @param date - The date
 * @return The most active cookie(s)
 */
const getMostActiveCookie = (data, date) => {
	// get most active cookie for the day
	try {
		if (!data.length) throw new Error('No data.');
		const moment = require('moment');
		data.shift();
		const dateCookies = data.filter(([key, value]) => 
			moment(value).format('YYYY-MM-DD') === date).map(([key, _]) => key);
		const cookieMap = {};
		dateCookies.forEach((e) => {
			cookieMap[e] = cookieMap[e] ? ++cookieMap[e] : 1;
		});
		const sorted = Object.entries(cookieMap).sort(sortFunc);
		return sorted.filter(([key, value]) => value === sorted[0][1]).map(e => e[0]);
	} catch (error) {
		console.error(error.message);
	}
};

/**
 * Log most active cookie
 * @param fileName - The csv file name
 * @param date - The date
 * @return void - Print the most active cookies
 */
const logMostActiveCookie = (fileName, date) => {
	try {
		const csv = require('node-csv').createParser();
		csv.parseFile(`./${fileName}`, (err, data) => {
			console.log(getMostActiveCookie(data, date).join('\n'));
		});
	} catch (error) {
		console.error(error.message);
	}
};

// arguments
const argv = process.argv.splice(2);
const keys = argv.filter(e => e[0] === '-');
const values = argv.filter(e => e[0] !== '-');
const args = Object.fromEntries(keys.map((key, i) => [key, values[i]]));

// most active cookie
try {
	const fileMsg = 'Please provide a file name -f.';
	const dateMsg = 'Please provide a date -d.';

	if (!(args['-f'] || args['-d'])) throw new Error([fileMsg, dateMsg].join('\n'));
	else if (!args['-f']) throw new Error(fileMsg);
	else if (!args['-d']) throw new Error(dateMsg);

	logMostActiveCookie(args['-f'], args['-d']);
} catch (argsError) {
	console.error(argsError.message);
}

module.exports = getMostActiveCookie;