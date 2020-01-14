const express = require('express');
const router = express.Router();
const groupService = require('./group.service');

/**
 * The following few lines contain all the accepted methods, paths and method references of the router.
 */
router.post('/create', create);
router.get('/:id', getById);
router.get('', getAll);
router.put('/:id/members', addUser);
router.put('/:id/chat', addMessage);
router.delete('/:id', remove);

module.exports = router;

/**
 * This method creates a new group based on name and creator.
 * 
 * @param {{ body: { name: String, owner: String } }} req Must contain a body object with the group name, the owner's ID and the
 */
function create(req, res, next) {
    req.body.members = [];
    req.body.members.push(req.body.owner);
    groupService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

/**
 * This method returns a group object based on the given ID.
 * 
 * @param { params: { id: String } } req Must contain a params object with the ID of the group to be returned.
 */
function getById(req, res, next) {
    groupService.getById(req.params.id)
        .then((group) => res.json(group))
        .catch(err => next(err));
}

/**
 * This method returns simplified versions of all group object from the database.
 */
function getAll(req, res, next) {
    groupService.getAll()
        .then((groups) => res.json(groups))
        .catch(err => next(err));
}

/**
 * This method adds a user to the group.
 * 
 * @param {{ params: { id: String }, body: { member: { id: String } } }} req Must contain a params object with the ID of the group to be updated and a body with the ID of the new group member.
 */
function addUser(req, res, next) {
    groupService.addUser(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

/**
 * This method removes a user from the group.
 * 
 * @param {{ params: { id: String }, body: { member: { id: String } } }} req Must contain a params object with the ID of the group to be updated and a body with the ID of the new group member.
 */
function removeUser(req, res, next) {
    groupService.removeUser(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

/**
 * This method adds a new message to the chat property of a group object in the database.
 * 
 * @param {{ params: { id: String }, body: { id: String, message: String } }} req Must contain a params object with the ID of the group and a body object with the ID of the user who's written the message and the message to be added.
 */
function addMessage(req, res, next) {
    groupService.addMessage(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

/**
 * This method removes a group associated with the ID given.
 * 
 * @param {{ params: { id: String } }} req Must contain the ID of a group to be deleted.
 */
function remove(req, res, next) {
    groupService.remove(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}