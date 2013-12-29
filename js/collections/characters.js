var app = app || {};

var CharacterList = Backbone.Collection.extend({
	model:app.Character,
	localStorage: new Backbone.LocalStorage('inc-localstorage'),
	comparator : function(a,b){
		var ai = parseInt(a.get('init'));
		var bi = parseInt(b.get('init'));
		if(ai == bi)
			return Math.random() -0.5 > 0 ? 1 : -1;
		if(ai > bi)
			return -1;
		return 1;
	}
});

app.Characters = new CharacterList();
