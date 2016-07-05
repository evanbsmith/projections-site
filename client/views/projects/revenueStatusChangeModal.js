Template.revenueStatusChangeModal.helpers({
	invoicedRevenue: function(project){
		var revItem = Revenue.findOne({
			project_id: project._id,
			month: this.month_class
		});
		if (revItem !== undefined){
			return revItem.rev_status === 'invoiced' ? true : false;
		}
		else{
			return false;
		}
	}
});

Template.revenueStatusChangeModal.events({
	'click button.update' : function(e){
		console.log('update button clicked');
		var parameters = {
			project_id: $(e.currentTarget).data('project'),
			month: this.month_class,
			newStatus: $(e.currentTarget).parents('div.modal-content').find('select option').filter(':selected').val()
		};
		console.log(parameters);
		
		Meteor.call('updateRevenueStatus',parameters, function(error,id){
	        if (error) {
	          // display the error to the user
	      //    Errors.throw(error.reason);
		  		console.log("updateRevenueStatus error");
	        } else {
				// take action to show the data was saved
				console.log("updateRevenueStatus success");
				console.log($('#revStatusModal-'+parameters.month));
				$('#revStatusModal-'+parameters.month).modal('hide');
	        }
		});
	}
});