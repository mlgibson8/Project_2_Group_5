const router = require('express').Router();
const { User } = require('../../models');

router.get('/', async (req, res) => {
    await User.findAll({
        attributes: {exclude: ['password']}
    })
    .then((User) => res.json(User))
    .catch((err) => {
        res.json(err);})
    });

router.get('/:id', async (req, res) => {
    await User.findOne({
        where: {
            id: req.params.id
        },
        attributes: {exclude: ['password']},
        include: ['id', 'username', 'email', 'password']})
    .then((User) => res.json(User))
    .catch((err) => {
        res.json(err);})
    });

router.post('/', async (req, res) => {
    try {
        const dbUserData = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });
        
        req.session.save(() => {
            req.session.loggedIn = true;

            res.status(200).json(dbUserData);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const dbUserData = await User.findOne({
            where: {
                email: req.body.email,
            },
        });
        if (!dbUserData) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password.' });
            return;
        }
    const validPassword = await dbUserData.checkPassword(req.body.password);
    if (!validPassword) {
        res
            .status(400)
            .json({ message: 'Incorrect email or password.' });
        return;
    }
    req.session.save(() => {
    req.session.loggedIn = true;
    console.log('You are logged in.');
        res
            .status(200)
            .json({ user: dbUserData, message: 'You are logged in.' });
    });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
  });

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
      res.status(404).end();
    }
});

module.exports = router;
            
