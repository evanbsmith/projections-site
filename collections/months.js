Months = new Mongo.Collection('months');

if (Meteor.isServer){
	Meteor.startup(function(){
		if(Months.find().count() === 0){
			var months = {};
			months = JSON.parse(Assets.getText("months.json"));
			for(month in months){
				Months.insert(months[month]);
			}
		}
	});
}