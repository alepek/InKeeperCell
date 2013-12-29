var app = app || {};

app.CharacterView = Backbone.View.extend({
	tagName: 'li',

	template: _.template( $('#character-template').html() ),

	events: {
		'click .remove': 'clear',
		'click .edit' : 'edit',
		'click .save' : 'done',
		'click .cancel' : 'cancel'
	},

	initialize: function(){
		this.listenTo(this.model, 'destroy', this.remove);
		this.listenTo(this.model, 'change', this.render);		
	},
	render: function(){
		this.$el.html(this.template(this.model.attributes));
		return this;
	},

	roll: function(){

	},

	clear: function(){
		this.model.destroy();
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