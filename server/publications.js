Meteor.publish('projects',function(){
	return Projects.find();
});

Meteor.publish('revenue',function(project_id){
	return Revenue.find({
		project_id: project_id
	});
});

Meteor.publish('months',function(){
	return Months.find();
});

Meteor.publish('lineItems',function(){
	return LineItems.find();
});

Meteor.publish('changeHistory',function(project_id){
	return ChangeHistory.find({project_id: project_id});
});