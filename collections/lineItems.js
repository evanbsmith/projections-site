LineItems = new Mongo.Collection('lineItems');

if (Meteor.isServer){
	Meteor.startup(function(){
		if(LineItems.find().count() === 0){
			var lines = {};
			lines = JSON.parse(Assets.getText("lineItems.json"));
			for(line in lines){
				LineItems.insert(lines[line]);
			}
		}
	});
}