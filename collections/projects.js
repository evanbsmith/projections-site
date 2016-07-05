Projects = new Mongo.Collection('projects');

if (Meteor.isServer) {
    Meteor.startup(function () {
        if(Projects.find().count() === 0){
            var projects = {};
			projects = JSON.parse(Assets.getText("di-projects.json"));
            for (project in projects) {
				var item = projects[project];
				var end_year = new Date(item.end_date).getFullYear();
				item.end_year = end_year;
				Projects.insert(item);
            }
        }
    });
}