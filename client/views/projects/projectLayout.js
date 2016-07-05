Template.projectLayout.helpers({
	getNavOptions:  function(){
		return [{
			navName:'revenue',
			displayName:'Revenue',
			defaultNav: true,
			template: 'projectRevenue' 
		},{
			navName:'budget',
			displayName:'Budget',
			defaultNav: false,
			template: 'projectBudget' 
		},{
			navName:'details',
			displayName:'Details',
			defaultNav: false,
			template: 'projectDetails' 
		}];
	},
	getNavTemplate: function(){
		console.log('getNavTemplate test');
		console.log(this);
		console.log('template.instance() test');
		console.log(Template.instance());
		var currentProjectNav = Session.get('currentProjectNav');
		console.log('currentProjectNav: ' + currentProjectNav);
		if (_.has(Template, currentProjectNav)){
			console.log('template found');
			return currentProjectNav;
		}
		else {
			console.log('template not found');
			return 'projectNotFound';
		}
	},
	changes: function(){
		return ChangeHistory.find({
			project_id: this._id
		}, {sort: {timestamp: -1}});
	},
	added: function(){
		// console.log('added test');
		
		return this.action === 'added' ? true : false;
	},
	change: function(params){
		//console.log('getItem test');
		// console.log(this);
		// console.log(params);
		var item = Revenue.findOne(this.item_id);
		// console.log(item);
		return item;
	}
});

Template.projectLayout.events({
	'click a.projectNav-link' : function(e){
		e.preventDefault();
		$('ul.projectNav-options li').removeClass('active');
		$(e.currentTarget).parent().addClass('active');
		Session.set('currentProjectNav',$(e.currentTarget).parent().attr('id'));
	}
});

Template.projectLayout.rendered = function(){
	console.log('projectLayout rendered');
	console.log(this);
	var currentNav = Session.get('currentProjectNav');
	$('li#' + currentNav).addClass('active');
	
};