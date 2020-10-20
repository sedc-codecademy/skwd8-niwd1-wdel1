const session = require('express-session');
const { v4: uuidv4 } = require('uuid');

module.exports = session({
	secret: 'T3st123',
	resave: true,
	saveUninitialized: false,
	cookie: { secure: false, maxAge: 84000 },
	genid: () => {
		return uuidv4();
	}
})