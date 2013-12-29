var app = app || {};

app.AppView = Backbone.View.extend({
	el: '#inkeeper',

	events: {
		'click #add-character': 'createCharacter',
		'cloneCharacter': 'cloneCharacter',
	},

	initialize: function(){
		this.listenTo(app.Characters, 'add', this.addCharacter);
		this.listenTo(app.Characters, 'cloneCharacter', this.cloneCharacter)
		app.Characters.fetch();
	},

	render: function(){
		var characters = app.Characters.getCharacters();

		this.$el.find('#character-list').empty();
		characters.each(this.addCharacter, this);
		return this;
	},
	cloneCharacter: function(character) {
		var clone = character.clone();
		var character = new app.Character();
		character.attributes = clone.attributes;
		clone = null;
		app.Characters.create(character);
	},
	createCharacter: function(){
		var character = new app.Character();
		app.Characters.create(character);
	},
	addCharacter: function(character) {	
		var view = new app.CharacterView({model: character });
		this.$el.find('#character-list').append(view.render().el);
	}
});