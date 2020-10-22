const router = require('express').Router();

const auth = require('../routes/auth.route');
const profile = require('../routes/profile.route');

router.get('/healthcheck', (req, res) => {
	res.status(200).json({session: req.session.id});
});

router.use("/auth", auth); //localhost:8080/auth -> /login || /register 
router.use("/profile", profile); //localhost:8080/profile

module.exports = router;