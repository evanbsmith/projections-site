Template.projectRevenue.helpers({
	lineItemRevenues: function(project){
		var existingRevItems = Revenue.find({
			project_id: project._id,
			line_item: this.line_item_class
		}).fetch();
		
		var months = Months.find({},{sort:{index:1}}).fetch();

		var revItemsReturn = [];
		
		for (month in months){
			var match = _.find(existingRevItems,function(item){
				return item.month === months[month].month_class;
			});
			if (match){
				revItemsReturn.push(match)
			}
			else {
				var nonMatchItem = {
					month: months[month].month_class,
					line_item: this.line_item_class,
					project_id: project._id,
					proxy: true
				}
				revItemsReturn.push(nonMatchItem);
			}
		}
		return revItemsReturn;
	},
	lineItemRevCheck: function(project){
		var item = Revenue.findOne({project_id: project._id,line_item: this.line_item_class});
		return item !== undefined ? true : false
	},
	months: function(){
		return Months.find({},{sort:{index:1}});
	},
	lineItems: function(){
		return LineItems.find({},{sort:{line_item_name:1}});
	},
	getRowTotal: function(project){
		var items = Revenue.find({
			line_item: this.line_item_class,
			project_id: project._id
		}).fetch();
		if (items.length !== 0){
			var total = _.chain(items).pluck('amount').reduce(function(a,b){return a+b}).value();
			return accounting.formatMoney(total,'$',2);
		}
		else {
			return accounting.formatMoney(0,'$',2);
		}
	},
	getColumnTotal: function(project){
		var items = Revenue.find({
			month: this.month_class,
			project_id: project._id
		}).fetch();
		if (items.length !== 0){
			var total = _.chain(items).pluck('amount').reduce(function(a,b){return a+b}).value();
			return accounting.formatMoney(total,'$',2);
		}
		else {
			return accounting.formatMoney(0,'$',2);
		}
	},
	getGrandTotal: function(){
		var items = Revenue.find({
			project_id: this._id
		}).fetch();
		if (items.length !== 0){
			var total = _.chain(items).pluck('amount').reduce(function(a,b){return a+b}).value();
			return accounting.formatMoney(total,'$',2);
		}
		else {
			return accounting.formatMoney(0,'$',2);
		}
	},
	
	getStatus: function(project){
		var revItem = Revenue.findOne({
			project_id: project._id,
			month: this.month_class
		});

		if (revItem !== undefined){
			return revItem.rev_status;
		}
		else{
			return "projected";
		}
	}
	
});

Template.projectRevenue.events({
	'click td.cell' : function(e){
		e.preventDefault();
		var $target = $(e.currentTarget),
			$cellOverlay = $('#cell-edit-overlay'),
			$cellInput = $cellOverlay.children('input'),
			targetPosition = $target.position(),
			targetHeight = $target.outerHeight(),
			targetWidth = $target.outerWidth(),
			targetValue = $target.data('amount');
		// console.log('value: ' + targetValue);
		
		var itemData = {
			_id: $target.data('id'),
			month: $target.data('month'),
			line_item: $target.data('line'),
			amount: $target.data('amount'),
			project_id: $target.data('project')
		};
		
		$cellOverlay.addClass('selected-cell').css({top: targetPosition.top, left: targetPosition.left, position:'absolute', height: targetHeight, width: targetWidth, display:'block'});
		$cellInput.css({height: targetHeight-4, width: targetWidth-4}).val(targetValue).data('itemdata',itemData).focus();

	},
	'focus input':function(e){
		$(e.currentTarget).select();
	},
	'blur input': function(e){
		e.preventDefault();
		
		var $cellOverlay = $(e.currentTarget).parent();
		$cellOverlay.css({display:'none'});
		
		var itemData = $(e.currentTarget).data('itemdata');
		var newAmount = parseFloat($(e.currentTarget).val());
		
		if (itemData.amount !== newAmount){
			itemData.amount = parseFloat($(e.currentTarget).val());
			Meteor.call('postRevenueAmount',itemData, function(error,id){
		        if (error) {
		          // display the error to the user
		      //    Errors.throw(error.reason);
			  		console.log("postRevenueItem error");
		        } else {
					// take action to show the data was saved
					console.log("postRevenueItem success");
		        }
			});
		}
	}
});

Template.projectRevenue.rendered = function(){
	console.log('rendered!');	
};