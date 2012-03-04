var GameController = module.exports = {
	start: function(req, res) {
		res.render('game/card-holder', {
			deck: req.deck
		});
	}
};
