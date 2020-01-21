const express = require('express');
const router = express.Router();
const groupService = require('./group.service');

/**
 * The following few lines contain all the accepted methods, paths and method references of the router.
 * 
 * @author Joel Meccariello
 */
router.post('/', create);
router.get('/:id', getById);
router.get('/:id/all', getAll);
router.get('/:id/messages', getMessages);
router.put('/:id/members', addUser);
router.put('/:id/chat', addMessage);
router.put('/:id/favorite', toggleFavorite);
router.put('/:id/members/remove', removeUser);
router.delete('/:id', remove);
router.get('/:id/getAll', getAllGroups);

module.exports = router;

function getAllGroups(req, res, next) {
    groupService.getAllGroups()
        .then(groups => res.json(groups))
        .catch(err => next(err));
}

/**
 * This method creates a new group based on name and creator.
 * 
 * @param {{ body: { name: String, owner: String } }} req Must contain a body object with the group name and the owner's ID.
 *
 * @author Joel Meccariello
 */
function create(req, res, next) {
    groupService.create(req.body)
        .then((group) => res.json(group))
        .catch(err => next(err));
}

/**
 * This method returns a group object based on the given ID.
 * 
 * @param { params: { id: String } } req Must contain a params object with the ID of the group to be returned.
 *
 * @author Joel Meccariello
 */
function getById(req, res, next) {
    groupService.getById(req.params.id)
        .then((group) => res.json(group))
        .catch(err => next(err));
}

/**
 * This method returns simplified versions of all group object from the database.
 *
 * @param {{ params: { String } }} id The ID of the user fetching the groups.
 * 
 * @author Joel Meccariello
 */
function getAll(req, res, next) {
    groupService.getAll(req.params.id)
        .then(groups => res.json(groups))
        .catch(err => next(err));
}

function getMessages(req, res, next) {
    groupService.getMessages(req.params.id)
        .then(messages => res.json(messages))
        .catch(err => next(err));
}

/**
 * This method adds a user to the group.
 * 
 * @param {{ params: { id: String }, body: { username: String } }} req Must contain a params object with the ID of the group to be updated and a body with the username of the new group member.
 *
 * @author Joel Meccariello
 */
function addUser(req, res, next) {
    groupService.addUser(req.params.id, req.body.username)
        .then(() => res.json({}))
        .catch(err => next(err));
}

/**
 * This method adds a new message to the chat property of a group object in the database.
 * 
 * @param {{ params: { id: String }, body: { author: String, message: String } }} req Must contain a params object with the ID of the group and a body object with the ID of the user who's written the message and the message to be added.
 *
 * @author Joel Meccariello
 */
function addMessage(req, res, next) {
    groupService.addMessage(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function toggleFavorite(req, res, next) {
    groupService.toggleFavorite(req.params.id, req.body.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

/**
 * This method removes a user from the group.
 * 
 * @param {{ params: { id: String }, body: { id: String } }} req Must contain a params object with the ID of the group to be updated and a body with the ID of the new group member.
 *
 * @author Joel Meccariello
 */
function removeUser(req, res, next) {
    groupService.removeUser(req.params.id, req.body.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

/**
 * This method removes a group associated with the ID given.
 * 
 * @param {{ params: { id: String } }} req Must contain the ID of a group to be deleted.
 *
 * @author Joel Meccariello
 */
function remove(req, res, next) {
    groupService.remove(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}