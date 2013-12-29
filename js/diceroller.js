var app = app || {};

app.DiceRoller = {
	rollD4: function(numDice, exploding)
	{
		return this.genericDiceRoll(4, numDice, exploding);
	},
	rollD6: function(numDice, exploding)
	{
		return this.genericDiceRoll(6, numDice, exploding);
	},
	rollD8: function(numDice, exploding)
	{
		return this.genericDiceRoll(8, numDice, exploding);
	},
	rollD10: function(numDice, exploding)
	{
		return this.genericDiceRoll(10, numDice, exploding);
	},
	rollD12: function(numDice, exploding)
	{
		return this.genericDiceRoll(12, numDice, exploding);
	},
	rollD20: function(numDice, exploding)
	{
		return this.genericDiceRoll(20, numDice, exploding);
	},
	rollD100: function(numDice, exploding)
	{
		return this.genericDiceRoll(100, numDice, exploding);
	},
	genericDiceRoll: function(diceMax, numDice, exploding)
	{
		var rollDie = function(max, resultobject, exploding)
		{
			var rand = Math.ceil(Math.random()*max);
			resultobject.totalRolled += 1;
			resultobject.rolls.push(rand);
			if(rand === max && exploding)
			{ // explosion!
				resultobject.explosions += 1;
				return rand+rollDie(max, resultobject, exploding);
				// Surely this recursive behavior will never betray me.
			}
			else
			{
				return rand;
			}
		};

		// this object tracks all the rolls and stuff.
		var resObj = {};
		resObj.totalRolled = 0;
		resObj.explosions = 0;
		resObj.result = 0;
		resObj.rolls = [];

		for(var i=0;i<numDice;i++)
		{
			resObj.result += rollDie(diceMax, resObj, exploding);
		}

		return resObj;
	}
};