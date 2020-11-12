const express = require('express');
const https = require('https'); //Native from nodejs API
const fs = require('fs'); //Native from nodejs API (filesystem)
const app = express(); //Server 1 
const cors = require('./consts/cors.const');
const path = require('path');

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || "0.0.0.0";


app.set('trust proxy', 1) // trust first proxy
app.use(cors);
app.use(express.static(path.join(__dirname, 'static')));

app.all('/*', function(req, res, next) {
	console.log(req.url)
    // Just send the index.html for other files to support HTML5Mode
    res.sendFile(`static/index.html`, { root: __dirname });
});

if(process.env.ENVIRONMENT == 'dev')
{
	let privateKey = fs.readFileSync(`../nodejs-localhost.key`).toString(),
	certificate = fs.readFileSync(`../nodejs-localhost.crt`).toString();

	let options = {key: privateKey, cert: certificate};

	const httpsServer = https.createServer(options, app);

	httpsServer.listen(8443, HOST, () => {
		console.log('HTTPS Server running on port 8443');
	});
}
app.listen(PORT, HOST, () => {
	console.log(`Server is running on ${HOST}:${PORT}`);
})