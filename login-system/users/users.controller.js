const express = require('express');
const router = express.Router();
const userService = require('./user.service');

/**
 * The following few lines contain all the accepted methods, paths and method references of the router.
 */
router.post('/register', register);
router.post('/authenticate', authenticate);
router.put('/:id', update);
router.put('/:id/contacts', addContact);
router.put('/:id/contacts/remove', removeContact);
router.get('/getAll', getAll);
router.delete('/remove', remove);

module.exports = router;

function getAll(req, res, next) {
    userService.getAll()
        .then((users) => res.json(users))
        .catch(err => next(err));
}

function remove(req, res, next) {
    userService.remove(req.body.id)
        .then((users) => res.json(users))
        .catch(err => next(err));
}

/**
 * A user can register an account, with which he can log in.
 * 
 * @param {{ body: { username: String, password: String }}} req Must contain a body object with a simplified user object.
 * 
 * @author Joel Meccariello 
 */
function register(req, res, next) {
    userService.create(req.body)
        .then((user) => res.json(user))
        .catch(err => next(err));
}

/**
 * A user can authenticate with his username and password.
 * 
 * @param {{ body: { username: String, password: String } }} req Must contain a body object with a simplified user object.
 *
 * @author Joel Meccariello
 */
function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => console.error(err));
}

/**
 * A user can update his password.
 * 
 * @param {{ params: { id: String }, body: { password: String } }} req Must contain a params object with the user id and a body object with the new password.
 *
 * @author Joel Meccariello
 */
function update(req, res, next) {
    userService.update(req.params.id, req.body.password)
        .then(() => res.json({}))
        .catch(err => next(err));
}

/**
 * A user can add another user to his contacts.
 * 
 * @param {{ params: { id: String }, body: { id: String } }} req Must contain a params object with the ID of the current user and a body object with the ID of the user to be added to the current user's contact list.
 * 
 * @author Joel Meccariello
 */
function addContact(req, res, next) {
    userService.addContact(req.params.id, req.body.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

/**
 * A user can remove one of his contacts from his contact list.
 * 
 * @param {{ params: { id: String }, body: { id: String } }} req Must contain a params object with the current user's ID and a body object with the ID of the contact that has to be removed from the current user's contact list.
 * 
 * @author Joel Meccariello
 */
function removeContact(req, res, next) {
    userService.removeContact(req.params.id, req.body.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}