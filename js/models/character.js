var app = app || {};

app.Character = Backbone.Model.extend({
	defaults:{
		name: '',
		enemy: true,
		init: 0,
		initBonus: 0
	}
});