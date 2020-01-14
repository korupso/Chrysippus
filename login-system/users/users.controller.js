const express = require('express');
const router = express.Router();
const userService = require('./user.service');

/**
 * The following few lines contain all the accepted methods, paths and method references of the router.
 */
router.post('/register', register);
router.post('/authenticate', authenticate);
router.put('/:id', update);

module.exports = router;

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
 * @param {{ params: { id: String }, body: { username: String, password: String } }} req Must contain a params object with the user id and a body object with a simplified user object.
 *
 * @author Joel Meccariello
 */
function update(req, res, next) {
    console.log("test");
    userService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}