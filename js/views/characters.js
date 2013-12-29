var app = app || {};

app.CharacterView = Backbone.View.extend({
	tagName: 'li',

	template: _.template( $('#character-template').html() ),

	events: {
		'click .remove': 'clear',
		'click .edit' : 'edit',
		'click .save' : 'done',
		'click .cancel' : 'cancel',
		'click .clone' : 'beginClone',
	},

	initialize: function(){
		this.listenTo(this.model, 'destroy', this.remove);
		this.listenTo(this.model, 'change', this.render);		
		this.listenTo(this.model, 'roll', this.roll);		
	},
	render: function(){
		this.$el.html(this.template(this.model.attributes));

		if(this.model.get('enemy')){
			this.$el.find('fieldset').addClass('enemy-background');
			this.$el.find('fieldset').removeClass('player-background');
		}
		else{
			this.$el.find('fieldset').removeClass('enemy-background');
			this.$el.find('fieldset').addClass('player-background');
		}

		return this;
	},

	roll: function(){
		var result = app.DiceRoller.rollD10(1, false);
		var roll = parseInt(result.result) + parseInt(this.model.get('initBonus'));
		this.model.set('init', roll);
		this.model.save(this.model.attributes);
	},

	clear: function(){		
		this.$el.find('.character').css('transition', 'all 0.3s ease');
		this.$el.find('.character').css('opacity', 0);
		var that = this;
		var done = function() {
			that.model.destroy();
		}
		setTimeout(done, 300);
	},
	beginClone: function()
	{	// let's just trigger another event and let the AppView handle it.
		this.model.trigger('cloneCharacter', this.model);
	},
	edit: function(){
		this.$el.find('.name-input').val(this.model.get('name'));
		this.$el.find('.init-input').val(this.model.get('initBonus'));
		this.$el.find('.enemy-checkbox').prop('checked',this.model.get('enemy'));

		this.$el.find('.edit-mode').toggleClass('hide');
		this.$el.find('.read-mode').toggleClass('hide');
	},
	done: function(){
		this.$el.find('.edit-mode').toggleClass('hide');
		this.$el.find('.read-mode').toggleClass('hide');
		
		var enemy = this.$el.find('.enemy-checkbox').prop('checked');
		var name = this.$el.find('.name-input').val();
		var init = this.$el.find('.init-input').val();

		this.model.save({name: name, initBonus:init, enemy: enemy});
	},
	cancel: function(){
		this.$el.find('.edit-mode').toggleClass('hide');
		this.$el.find('.read-mode').toggleClass('hide');
	}
});