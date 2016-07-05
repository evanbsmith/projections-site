Template.projectsList.helpers({
	projects: function(){
		var currentYear = new Date().getFullYear();
		return Projects.find({
			end_year: {$gt: currentYear - 1}
		});
	},
	getProjectId: function(){
		return this._id;
	}
});

Template.projectsList.events({
	
});

Template.projectsList.rendered = function(){
	console.log('projectList rendered!');
	console.log(this);
};
