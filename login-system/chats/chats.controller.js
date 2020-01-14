const express = require('express');
const router = express.Router();
const chatService = require('./chat.service');

/**
 * The following few lines contain all the accepted methods, paths and method references of the router.
 */
router.get('/:id', getById);
router.get('', getAll);
router.put('/:id/chat', addMessage);

module.exports = router;

function getById(req, res, next) {
    chatService.getById(req.params.id)
        .then((chat) => res.json(chat))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    chatService.getAll()
        .then((chats) => res.json(chats))
        .catch(err => next(err));
}

function addMessage(req, res, next) {
    chatService.addMessage(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}