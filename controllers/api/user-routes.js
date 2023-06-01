const router = require('express').Router();
const { User} = require('../../models');

router.get('/', async (req, res) => {
    await User.findAll({
        attributes: {exclude: ['password']}
    })
    .then((User) => res.json(User))
    .catch((err) => {
        res.json(err);})
    });

router.get('/:id', async (req   , res) => {
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
            

module.exports = router;
            
