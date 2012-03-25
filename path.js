(function(path, undefined) {
	if (typeof module !== 'undefined') {
		module.exports = path;
	} else if (typeof window !== 'undefined') {
		window.abootay.path = path;
	}
})({
	to: {
		home: function() {
			return '/';
		},
		decks: function() {
			return '/decks'
		},
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
		},
		play: function() {
			return '/play';
		},
		playDeck: function(deck_or_deckName) {
			var deckName;
			if (typeof(deck_or_deckName) === 'string') {
				deckName = deck_or_deckName;
			} else {
				deck = deck_or_deckName;
				deckName = deck.name;
			}
			return '/play/' + escape(deckName);
		},
		api: {
			root: function() {
				return '/api';
			},
			deckRoot: function() {
				return this.root() + '/deck';
			},
			createDeck: function() {
				return this.deckRoot();
			},
			deck: function(deck) {
				return this.deckRoot() + '/' + deck._id;
			},
			addCardToDeck: function(deck) {
				return this.deck(deck) + '/card';
			},
			userRoot: function() {
				return this.root() + '/user';
			},
			createUser: function() {
				return this.userRoot();
			},
			user: function(user) {
				return this.userRoot() + '/' + user._id;
			}
		}
	}
});