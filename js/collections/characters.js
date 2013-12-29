var app = app || {};

var CharacterList = Backbone.Collection.extend({
	model:app.Character,
	localStorage: new Backbone.LocalStorage('inc-localstorage'),

	rollInitiatives: function(){

	},
	getCharacters: function(){
		return this.toArray();
	}
});

app.Characters = new CharacterList();
