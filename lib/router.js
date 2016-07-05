Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	waitOn: function() {
		return [Meteor.subscribe('projects'),Meteor.subscribe('lineItems'),Meteor.subscribe('months'), Meteor.subscribe('changeHistory')];
	}
});

Router.onBeforeAction('loading');

Router.map(function(){
	this.route('/projects/:_id',{
		name: 'project.view',
		data: function(){
			return Projects.findOne(this.params._id);
		},
		layoutTemplate: 'layout',
		template: 'projectLayout',
		yieldTemplates: {
			'projectsList': { to: 'leftNav'}
		},
		onBeforeAction: function(){
			Session.set('currentProjectNav','projectRevenue');
			this.next();
		},
		waitOn: function(){
			return [Meteor.subscribe('revenue',this.params._id),Meteor.subscribe('changeHistory',this.params._id)];
		}
	});
	this.route('projects', {
		path: '/projects',
		layoutTemplate: 'layout',
		yieldTemplates: {
			'projectsList': {to: 'leftNav'}
		},
		template: 'projectsMain'
	});
	
	this.route('summary',{
		path: '/summary'
		
	});
	this.route('profile', {
		path: '/profile',
		data: function() {
			return Meteor.user();
		}
	});
	this.route('home', {path: '/'});
});