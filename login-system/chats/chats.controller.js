const express = require('express');
const router = express.Router();
const chatService = require('./chat.service');

/**
 * The following few lines contain all the accepted methods, paths and method references of the router.
 */
router.get('/:id', getById);
router.get('', getAll);
router.put('/:id', toggleFavorite);
router.put('/:id/chat', addMessage);

module.exports = router;

/**
 * The program has to use this route to fetch a chat's info, e.g. the participants, or the chat history.
 * 
 * @param {{ params: { id: String } }} req Must contain a params object with the ID of the chat.
 * 
 * @author Joel Meccariello
 */
function getById(req, res, next) {
    chatService.getById(req.params.id)
        .then((chat) => res.json(chat))
        .catch(err => next(err));
}

/**
 * The program has to use this method to fetch all chats the user is a part of.
 * 
 * @param {{ body: { id: String } }} req Must contain a body object with the ID of the current user.
 *
 * @author Joel Meccariello
 */
function getAll(req, res, next) {
    chatService.getAll(req.body.id)
        .then((chats) => res.json(chats))
        .catch(err => next(err));
}

/**
 * The user can favorite and unfavorite a chat using this method.
 * 
 * @param {{ params: { id: String }, body: { id: String } }} req Must contain a params object with the ID of the user using the method and a body object with the ID of the chat.
 *
 * @author Joel Meccariello
 */
function toggleFavorite(req, res, next) {
    chatService.toggleFavorite(req.params.id, req.body.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

/**
 * A user can add a message to the chat history of the chat object.
 * 
 * @param {{ params: { id: String }, body: { message: { author: String, content: String } } }} req Must contain a params object with the ID of the chat and a body object with a message object containing the message author and the message content.
 *
 * @author Joel Meccariello
 */
function addMessage(req, res, next) {
    chatService.addMessage(req.params.id, req.body.message)
        .then(() => res.json({}))
        .catch(err => next(err));
}