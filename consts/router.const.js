const router = require('express').Router();

const auth = require('../routes/auth.route');

router.get('/healthcheck', (req, res) => {
	res.status(200).json({session: req.session.id});
});

router.use("/auth", auth);

module.exports = router;