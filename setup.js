const fs = require('fs');

if(process.env.ENVIRONMENT == 'dev')
{
	console.log("Use environment from file");

	let file = fs.readFileSync('../firebase.js').toString();

	if(file)
	{
		let env = JSON.parse(file);

		for(let x in env)
		{
			process.env[x] = env[x];
		}
	}
}
else
console.log("Use environment from config")