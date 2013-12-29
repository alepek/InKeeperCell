var app = app || {};

app.AppView = Backbone.View.extend({
	el: '#inkeeper',

	events: {
		'click #add-character': 'createCharacter'
	},

	initialize: function(){
      //this.listenTo(app.Characters, 'all', this.render);
      this.listenTo(app.Characters, 'add', this.addCharacter);

      app.Characters.fetch();
	},

	render: function(){
		var characters = app.Characters.getCharacters();

		this.$el.find('#character-list').empty();
		characters.each(this.addCharacter, this);
	},
	createCharacter: function(){
		var character = new app.Character();
		app.Characters.create(character);
	},
	addCharacter: function(character){	
		var view = new app.CharacterView({model: character });
		this.$el.find('#character-list').append(view.render().el);
	}
});