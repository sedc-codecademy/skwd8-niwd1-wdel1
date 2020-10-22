const router = require('express').Router();
const ProfileController = require('../controllers/profile.controller');

const pc = new ProfileController();

router.get('/:email', (req, res) => {

	if(req.params.email)
	pc.getProfile(req.params.email) //sent from Frontend
	.then(profileData => {
		res.status(200).json(profileData);
	})
	.catch(error => { console.log(error)
		res.status(400).json(error);
	});
	else 
	res.status(400).json({message: "Bad request"});
})

router.post('/', (req, res) => {

	if(req.body)
	pc.setProfile(req.body)
	.then((data) => {	
		res.status(200).json(data);
	})
	.catch(error => { console.log(error);
		res.status(400).json(error);
	})	
	else
	res.status(400).json({message: "Bad request"});
});

router.put('/', (req, res) => {
	res.status(200).json({});
})

module.exports = router;