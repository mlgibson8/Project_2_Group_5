const router = require('express').Router();
const { Comment, User} = require('../../models');

router.get('/', async (req, res) => {
     await Comments.findAll({
        attributes: ['id', 'text'],
        include: [
            {model : User,
            attributes: ['username']}]})
    .then((Comment) => res.json(Comment));
            });

router.get('/:id', async (req, res) => {
    await Comments.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'comment_text'],
        include: [
            {model : User,
            attributes: ['username']}]})
    .then((Comment) => res.json(Comment));
            });
            
router.post('/', async (req, res) => {
    await Comments.create({
        comment_text: req.body.comment_text,
        user_id: req.body.user_id,
        post_id: req.body.post_id
    })
    .then((Comment) => res.json(Comment));
            });
   
module.exports = router;