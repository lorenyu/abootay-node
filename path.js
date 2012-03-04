var path = module.exports = {
	to: {
		deck: function(deck_or_deckName) {
			var deckName;
			if (typeof(deck_or_deckName) === 'string') {
				deckName = deck_or_deckName;
			} else {
				deck = deck_or_deckName;
				deckName = deck.name;
			}
			return '/decks/' + escape(deckName);
		},
		startGameWithDeck: function(deck) {
			// at some point it would be cool to have others join the same game in different roles
			return '/games/' + escape(deck.name);
		}
	}
};