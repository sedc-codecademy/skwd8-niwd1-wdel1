const express = require('express');
const app = express();

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || "0.0.0.0";

app.get("/", (req, res) => {
	res.status(200).json({message: "Test Server works"});
});

app.get("/todos", (req, res) => {
	res.status(200).json({todos: [
		{
			id: 1,
			task: "Make server",
			completed: false
		},
		{
			id: 2,
			task: "Make docker image",
			completed: false
		}
	]})
})

app.listen(PORT, HOST, () => {
	console.log(`Server is listening on ${HOST}:${PORT}`);
})