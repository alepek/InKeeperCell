var app = app || {};

app.AppView = Backbone.View.extend({
	el: '#inkeeper',
	rolling: false,

	events: {
		'click #add-character': 'createCharacter',
		'click #roll-initiatives': 'rollInitiatives',
		'cloneCharacter': 'cloneCharacter',
	},

	initialize: function(){
		this.listenTo(app.Characters, 'add', this.addCharacter);
		this.listenTo(app.Characters, 'cloneCharacter', this.cloneCharacter)
		this.listenTo(app.Characters, 'sort', this.reRender)
		
		app.Characters.fetch();
	},

	reRender: function(args){
		this.$el.find('#character-list').empty();

		for (var i = 0; i <args.models.length; i++) {
			this.addCharacter(args.models[i]);
		};
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
	},
	rollInitiatives: function(){
		if(this.rolling)
			return;
		this.rolling = true;
		var that = this;
		var target = this.$el;
		target.css('opacity', 0);

		setTimeout(function()
		{
			_.each(app.Characters.models, function(model){
				model.trigger('roll');
			});
			app.Characters.sort();

			target.css('opacity', 1);
			
			that.rolling = false;
		}, 450);
	}
});