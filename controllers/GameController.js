var DeckService = require('../services/DeckService');

var GameController = module.exports = {
    start: function(req, res) {
        res.render('game/card-holder', {
            deck: req.deck
        });
    },
    play: function(req, res) {
        DeckService.getDecks(function(err, decks) {
            if (err) { console.error(err); res.send(err); }

            res.render('game/play', {
                decks: decks
            });
        });
    },
    playDeck: function(req, res) {
        res.render('game/play-deck', { deck: req.deck });
    }
};
